import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import type { PostMeta } from "./blog-shared";

export * from "./blog-shared";

/**
 * Blog posts are Markdown/MDX files in content/blog. The file name (without .mdx) is the URL slug.
 * Required frontmatter: title, description, date (YYYY-MM-DD), category, author, image, readTime.
 * Optional: imageAlt, tags (list), featured (true/false), updated (YYYY-MM-DD), faqs (list of { question, answer }).
 */
const POSTS_DIR = path.join(process.cwd(), "content", "blog");
export const POSTS_PER_PAGE = 9;


export type Post = PostMeta & { content: string; wordCount: number };

export const slugify = (value: string) => new GithubSlugger().slug(value);

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
  const required = ["title", "description", "date", "category", "author", "image", "readTime"];
  const missing = required.filter((key) => !data[key]);
  if (missing.length) {
    throw new Error(`content/blog/${file} is missing frontmatter: ${missing.join(", ")}`);
  }
  // gray-matter turns unquoted YYYY-MM-DD values into Date objects
  const toDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: toDate(data.date),
    updated: data.updated ? toDate(data.updated) : undefined,
    category: String(data.category),
    categorySlug: slugify(String(data.category)),
    author: String(data.author),
    image: String(data.image),
    imageAlt: data.imageAlt ? String(data.imageAlt) : `Cover illustration for ${String(data.title)}`,
    readTime: String(data.readTime),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: data.featured === true,
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    content,
    wordCount: content.split(/\s+/).filter(Boolean).length,
  };
}

let cache: Post[] | null = null;

/** Every post, newest first. */
export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => /\.mdx?$/.test(f))
      .map(readPost)
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

/** Strips the body so lists and client components only receive what they display. */
export const toMeta = ({ content: _content, wordCount: _wordCount, ...meta }: Post): PostMeta => meta;

/** Categories that have at least one post, in order of first appearance. */
export function getCategories() {
  const seen = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of getAllPosts()) {
    const entry = seen.get(p.categorySlug);
    if (entry) entry.count++;
    else seen.set(p.categorySlug, { name: p.category, slug: p.categorySlug, count: 1 });
  }
  return [...seen.values()];
}

/** The featured post: the newest one marked `featured: true`, otherwise the newest post. */
export function getFeaturedPost() {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

export function paginate<T>(items: T[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  return { items: items.slice(start, start + POSTS_PER_PAGE), totalPages };
}

/** Up to `count` other posts, same category first, then newest. */
export function getRelatedPosts(post: Post, count = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.categorySlug === post.categorySlug);
  const rest = others.filter((p) => p.categorySlug !== post.categorySlug);
  return [...same, ...rest].slice(0, count);
}

/**
 * H2 headings for the table of contents. Ids are generated in document order with the same
 * slugger rehype-slug uses, so they match the ids on the rendered headings.
 */
export function getHeadings(content: string) {
  const slugger = new GithubSlugger();
  const headings: { id: string; text: string }[] = [];
  let inCode = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode) continue;
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1");
    const id = slugger.slug(text);
    if (match[1].length === 2) headings.push({ id, text });
  }
  return headings;
}


