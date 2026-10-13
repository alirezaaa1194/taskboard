import type { JSONContent } from "@tiptap/core";

export type TiptapEditorProps = {
  content?: JSONContent | null;
  onChange?: (json: JSONContent) => void;
  placeholder?: string;
};
