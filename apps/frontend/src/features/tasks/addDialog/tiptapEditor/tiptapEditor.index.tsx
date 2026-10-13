"use client";

import { useEffect } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TiptapEditorProps } from "./tiptapEditor.type";
import { EMPTY_CONTENT } from "./tiptapEditor.data";

export default function TiptapEditorComp({ content, onChange, placeholder = "توضیحات تسک..." }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),

      Link.configure({
        protocols: ["http", "https"],
        openOnClick: false,
        autolink: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),

      Placeholder.configure({
        placeholder,
      }),
    ],

    content: content ?? EMPTY_CONTENT,

    editorProps: {
      attributes: {
        dir: "rtl",
        class: ["prose prose-sm max-w-none dark:prose-invert", "min-h-[120px] w-full rounded-md border border-border", "bg-bg px-3 py-2 text-sm focus:outline-none", "[&_h1]:my-3 [&_h1]:text-2xl [&_h1]:font-bold", "[&_h2]:my-2 [&_h2]:text-xl [&_h2]:font-semibold", "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pr-6", "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pr-6", "[&_li]:my-0.5 [&_li]:pl-0", "[&_li>p]:my-0", "[&_blockquote]:my-2 [&_blockquote]:border-r-4", "[&_blockquote]:border-primary [&_blockquote]:pr-3", "[&_blockquote]:text-muted", "[&_p]:my-1", "[&_a]:text-primary [&_a]:underline"].join(" "),
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  // Only synchronize when the external content actually differs.
  // This prevents resetting the cursor when the parent updates state
  // after every editor change.
  useEffect(() => {
    if (!editor || !content) return;

    const currentContent = editor.getJSON();

    if (JSON.stringify(currentContent) !== JSON.stringify(content)) {
      editor.commands.setContent(content, {
        emitUpdate: false,
      });
    }
  }, [content, editor]);

  const editorState = useEditorState({
    editor,
    selector: ({ editor: ed }) => ({
      isBold: ed?.isActive("bold") ?? false,
      isItalic: ed?.isActive("italic") ?? false,
      isH1: ed?.isActive("heading", { level: 1 }) ?? false,
      isH2: ed?.isActive("heading", { level: 2 }) ?? false,
      isBulletList: ed?.isActive("bulletList") ?? false,
      isOrderedList: ed?.isActive("orderedList") ?? false,
      isBlockquote: ed?.isActive("blockquote") ?? false,
      isLink: ed?.isActive("link") ?? false,
    }),
  });

  if (!editor) return null;

  const handleLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;

    const input = window.prompt("آدرس لینک (http یا https):", previousUrl ?? "");

    if (input === null) return;

    const url = input.trim();

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      window.alert("آدرس لینک معتبر نیست.");
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      window.alert("فقط لینک‌های HTTP و HTTPS مجاز هستند.");
      return;
    }

    const safeUrl = parsedUrl.href;

    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: safeUrl,
          marks: [
            {
              type: "link",
              attrs: {
                href: safeUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
        })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: safeUrl }).run();
    }
  };

  return (
    <div className="space-y-2">
      <div dir="rtl" className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-surface p-1">
        <ToolbarButton active={editorState?.isBold ?? false} onClick={() => editor.chain().focus().toggleBold().run()} label="B" className="font-bold" />
        <ToolbarButton active={editorState?.isItalic ?? false} onClick={() => editor.chain().focus().toggleItalic().run()} label="I" className="italic" />
        <ToolbarButton active={editorState?.isH1 ?? false} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="H1" />
        <ToolbarButton active={editorState?.isH2 ?? false} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="H2" />
        <ToolbarButton active={editorState?.isBulletList ?? false} onClick={() => editor.chain().focus().toggleBulletList().run()} label="• لیست" />
        <ToolbarButton active={editorState?.isOrderedList ?? false} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="۱. لیست" />
        <ToolbarButton active={editorState?.isBlockquote ?? false} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="❝" />
        <ToolbarButton active={editorState?.isLink ?? false} onClick={handleLink} label="🔗" />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({ active, onClick, label, className = "" }: { active: boolean; onClick: () => void; label: string; className?: string }) {
  return (
    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={onClick} aria-pressed={active} className={["rounded px-2 py-1 text-sm transition", active ? "bg-primary/15 text-primary" : "text-muted hover:bg-border/50", className].join(" ")}>
      {label}
    </button>
  );
}
