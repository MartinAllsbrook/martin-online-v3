import type { HeadingNode } from "src/types/Post.ts";

export default function SubheadingComponent({ subheading }: { subheading: HeadingNode }) {
    const text = subheading.children.map((t) => t.text).join("");
    return <h3>{text}</h3>;
}