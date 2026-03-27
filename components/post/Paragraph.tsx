import type { ParagraphNode } from "src/types/Post.ts";

export default function ParagraphComponent({ paragraph }: { paragraph: ParagraphNode }) {
    const text = paragraph.children.map((t) => t.text).join("");
    return <p>{text}</p>;
}