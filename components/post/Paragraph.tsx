import type { ParagraphNode } from "src/types/Post.ts";
import InlineLink from "components/post/InlineLink.tsx";

export default function ParagraphComponent({ paragraph }: { paragraph: ParagraphNode }) {
    return (
        <p class="mb-4">
            {paragraph.children.map((node, i) => {
                if (node.type === "link") {
                    return <InlineLink key={i} link={node} />;
                }
                return node.text;
            })}
        </p>
    );
}