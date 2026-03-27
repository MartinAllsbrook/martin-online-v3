import type { HeadingNode } from "src/types/Post.ts";

export default function HeadingComponent({ heading }: { heading: HeadingNode }) {
    const Tag = heading.tag;
    const text = heading.children.map((t) => t.text).join("");
    return <Tag>{text}</Tag>;
}