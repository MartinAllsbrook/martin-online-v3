import { Paragraph } from "src/types/Post.ts";

export default function ParagraphComponent({ paragraph }: { paragraph: Paragraph }) {
    const text = paragraph.text.root.children[0].children[0].text;
    return <p>{text}</p>;
}