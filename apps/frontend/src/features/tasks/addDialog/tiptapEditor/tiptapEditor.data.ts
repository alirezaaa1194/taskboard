import type { JSONContent } from "@tiptap/core";

export const EMPTY_CONTENT: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};
