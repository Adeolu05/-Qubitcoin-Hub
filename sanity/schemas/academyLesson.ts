/** Sanity schema definition for Academy lessons (deploy to project 32dlbkdi) */
export const academyLessonSchema = {
  name: "academyLesson",
  title: "Academy Lesson",
  type: "document",
  fields: [
    { name: "slug", title: "Slug", type: "slug" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "category", title: "Category", type: "string" },
    { name: "xp", title: "XP", type: "number" },
    { name: "content", title: "Content paragraphs", type: "array", of: [{ type: "string" }] },
    {
      name: "quiz",
      title: "Quiz",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "options", type: "array", of: [{ type: "string" }] },
            { name: "correctIndex", type: "number" },
            { name: "explanation", type: "text" },
          ],
        },
      ],
    },
  ],
};
