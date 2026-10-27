/**
 * Blog authors, keyed by the `author` value in each post's frontmatter.
 * TODO: placeholder author. Replace with real people (and their real credentials).
 */
export type Author = { name: string; role: string; bio: string; linkedin?: string };

export const authors: Record<string, Author> = {
  "Daniel Brooks": {
    name: "Daniel Brooks",
    role: "Founder & Chief Estimator, Arvex Designs",
    bio: "Daniel has spent 16 years in preconstruction on commercial, structural concrete and healthcare projects, first as a GC estimator and later as a preconstruction director. He leads Arvex Designs's estimating standards.",
  },
  "Arvex Designs Team": {
    name: "Arvex Designs Team",
    role: "Estimators & detailers",
    bio: "Articles written and reviewed by the estimators and detailers at Arvex Designs in Newark, New Jersey.",
  },
};

export const getAuthor = (name: string): Author =>
  authors[name] ?? { name, role: "Arvex Designs", bio: "" };
