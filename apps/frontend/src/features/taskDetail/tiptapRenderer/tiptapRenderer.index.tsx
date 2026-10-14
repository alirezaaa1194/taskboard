"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import type { JSONContent } from "@tiptap/core";

function TiptapRendererComp({ content }: { content: JSONContent }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2] } }),
      Link.configure({
        protocols: ["http", "https"],
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        dir: "rtl",
        class: ["prose prose-sm max-w-none dark:prose-invert", "[&_h1]:my-3 [&_h1]:text-2xl [&_h1]:font-bold", "[&_h2]:my-2 [&_h2]:text-xl [&_h2]:font-semibold", "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pr-6", "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pr-6", "[&_li]:my-0.5", "[&_blockquote]:my-2 [&_blockquote]:border-r-4", "[&_blockquote]:border-primary [&_blockquote]:pr-3", "[&_blockquote]:text-muted", "[&_p]:my-1", "[&_a]:text-primary [&_a]:underline"].join(" "),
      },
    },
  });

  if (!editor)
    return (
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-fg/5" />
        <div className="h-3 w-full rounded bg-fg/5" />
        <div className="h-3 w-4/5 rounded bg-fg/5" />
      </div>
    );
  return <EditorContent editor={editor} />;
}

export default TiptapRendererComp;
