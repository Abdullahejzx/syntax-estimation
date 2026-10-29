/**
 * Blog authors, keyed by the `author` value in each post's frontmatter.
 * TODO: placeholder author. Replace with real people (and their real credentials).
 */
export type Author = { name: string; role: string; bio: string; linkedin?: string };

export const authors: Record<string, Author> = {
  "Daniel Brooks": {
    name: "Daniel Brooks",
    role: "Founder & Chief Estimator, Bidnora Engineering",
    bio: "Daniel has spent 16 years in preconstruction on commercial, structural concrete and healthcare projects, first as a GC estimator and later as a preconstruction director. He leads Bidnora Engineering's estimating standards.",
  },
  "Bidnora Engineering Team": {
    name: "Bidnora Engineering Team",
    role: "Estimators & detailers",
    bio: "Articles written and reviewed by the estimators and detailers at Bidnora Engineering in Las Vegas, Nevada.",
  },
};

export const getAuthor = (name: string): Author =>
  authors[name] ?? { name, role: "Bidnora Engineering", bio: "" };
