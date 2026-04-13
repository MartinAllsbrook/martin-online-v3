import type { LinkNode } from "src/types/Post.ts";

export default function InlineLink({ link }: { link: LinkNode }) {
    const text = link.children.map((t) => t.text).join("");
    return (
        <a
            href={link.fields.url}
            target={link.fields.newTab ? "_blank" : undefined}
            rel={link.fields.newTab ? "noopener noreferrer" : undefined}
        >
            {text}
        </a>
    );
}
