import { page, PageProps } from "fresh";
import { define } from "@/utils.ts";
import PageWrap from "@/components/PageWrap.tsx";

interface LexicalTextNode {
    type: "text";
    text: string;
    format: number;
}

interface LexicalUploadNode {
    type: "upload";
    value: {
        url: string;
        alt: string;
    };
}

interface LexicalElementNode {
    type: "root" | "paragraph" | "heading" | string;
    tag?: string;
    children?: LexicalNode[];
}

type LexicalNode = LexicalTextNode | LexicalUploadNode | LexicalElementNode;

interface Data {
    post: {
        id: number;
        title: string;
        content: {
            root: LexicalElementNode;
        };
        featuredImage: {
            url: string;
            alt: string;
        };
    };
    payloadUrl: string;
}

function renderText(node: LexicalTextNode) {
    let el: preact.ComponentChildren = node.text;
    if (node.format & 1) el = <strong>{el}</strong>;
    if (node.format & 2) el = <em>{el}</em>;
    if (node.format & 8) el = <u>{el}</u>;
    if (node.format & 4) el = <s>{el}</s>;
    if (node.format & 16) el = <code>{el}</code>;
    return el;
}

function renderNode(node: LexicalNode, payloadUrl: string, key: number): preact.ComponentChildren {
    if (node.type === "text") {
        return <span key={key}>{renderText(node as LexicalTextNode)}</span>;
    }

    if (node.type === "upload") {
        const upload = node as LexicalUploadNode;
        return <img key={key} src={`${payloadUrl}${upload.value.url}`} alt={upload.value.alt} />;
    }

    const el = node as LexicalElementNode;
    const children = el.children?.map((child, i) => renderNode(child, payloadUrl, i));

    switch (el.type) {
        case "root":
            return <>{children}</>;
        case "paragraph":
            return <p key={key}>{children}</p>;
        case "heading":
            if (el.tag === "h1") return <h1 key={key}>{children}</h1>;
            if (el.tag === "h2") return <h2 key={key}>{children}</h2>;
            if (el.tag === "h3") return <h3 key={key}>{children}</h3>;
            if (el.tag === "h4") return <h4 key={key}>{children}</h4>;
            if (el.tag === "h5") return <h5 key={key}>{children}</h5>;
            if (el.tag === "h6") return <h6 key={key}>{children}</h6>;
            return <p key={key}>{children}</p>;
        default:
            return <div key={key}>{children}</div>;
    }
}

export const handler = define.handlers({
    async GET(ctx) {
        const payloadUrl = Deno.env.get("PAYLOAD_URL");
        const slug = ctx.params.slug;
        const response = await fetch(`${payloadUrl}/api/posts?where[slug][equals]=${slug}&limit=1`);
        const { docs } = await response.json();
        const post = docs[0];
        return page({ post, payloadUrl });
    }
});

export default define.page(function BlogPost({ data }: PageProps<Data>) {
    const { post, payloadUrl } = data;
    return (
        <div>
            <PageWrap index={[]}>
                <h1>{post?.title}</h1>
                <img src={`${payloadUrl}${post?.featuredImage.url}`} alt={post?.featuredImage.alt} />
                <div>
                    {post?.content?.root && renderNode(post.content.root, payloadUrl ?? "", 0)}
                </div>
            </PageWrap>
        </div>
    );
});

