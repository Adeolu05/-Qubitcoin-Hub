export const glossaryTermSchema = {
  name: "glossaryTerm",
  title: "Glossary Term",
  type: "document",
  fields: [
    { name: "term", title: "Term", type: "string" },
    { name: "slug", title: "Slug", type: "slug" },
    { name: "simple", title: "Simple definition", type: "text" },
    { name: "deeper", title: "Deeper explanation", type: "text" },
    { name: "related", title: "Related terms", type: "array", of: [{ type: "string" }] },
  ],
};
