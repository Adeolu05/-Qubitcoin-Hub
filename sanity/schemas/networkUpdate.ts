export const networkUpdateSchema = {
  name: "networkUpdate",
  title: "Network Update",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "date", title: "Date", type: "string" },
    { name: "summary", title: "Summary", type: "text" },
    { name: "severity", title: "Severity", type: "string" },
    { name: "action", title: "Action", type: "text" },
  ],
};
