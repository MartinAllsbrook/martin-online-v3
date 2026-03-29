import { page, PageProps } from "fresh";
import { define } from "@/utils.ts";
import PageWrap from "components/PageWrap.tsx";
import HeadingComponent from "components/post/Heading.tsx";
import ParagraphComponent from "components/post/Paragraph.tsx";
import ImagesComponent from "components/post/ImagesComponent.tsx";
import { parsePostsResponse } from "src/ParsePost.ts";
import type { Post, BlockLevelNode } from "src/types/Post.ts";
import getEnvVar, { getPayloadBinding } from "src/GetEnv.ts";

interface Data {
    post: Post;
    payloadUrl: string;
}

export const handler = define.handlers({
    async GET(ctx) {
        const payloadUrl = await getEnvVar("PAYLOAD_URL") ?? "";
        const binding = await getPayloadBinding();
        console.log("Payload URL:", payloadUrl);
        const slug = ctx.params.slug;
        const response = await (binding ?? globalThis).fetch(`${payloadUrl}/api/posts?where[slug][equals]=${slug}&limit=1`);
        if (!response.ok) {
            throw new Error(`CMS responded ${response.status}: ${await response.text()}`);
        }
        const json = await response.json();
        const [post] = parsePostsResponse(json);
        return page({ post, payloadUrl });
    }
});

function renderNode(node: BlockLevelNode, index: number, payloadUrl: string) {
    switch (node.type) {
        case "heading":
            return <HeadingComponent key={index} heading={node} />;
        case "paragraph":
            return <ParagraphComponent key={index} paragraph={node} />;
        case "block":
            return <ImagesComponent key={index} imageSet={node.fields} payloadUrl={payloadUrl} />;
        default:
            return null;
    }
}

export default define.page(function BlogPost({ data }: PageProps<Data>) {
    const { post, payloadUrl } = data;
    return (
        <div>
            <PageWrap index={[
                { name: "back", href: "./" },
            ]}>
                <h1 class="mb-4">{post?.title}</h1>
                <img class="mb-4" src={`${payloadUrl}${post?.featuredImage.url}`} alt={post?.featuredImage.alt} />
                {post?.content.root.children.map((node, index) =>
                    renderNode(node, index, payloadUrl)
                )}
            </PageWrap>
        </div>
    );
});

