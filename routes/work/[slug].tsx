import { page, PageProps } from "fresh";
import { define } from "@/utils.ts";
import PageWrap from "@/components/PageWrap.tsx";
import Post, { Heading, Image, Paragraph, SubHeading } from "../../src/types/Post.ts";

interface Data {
    post: Post;
    payloadUrl: string;
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
                    {post?.content.map((block, index) => {
                        switch (block.blockType) {
                            case "heading":
                                return <h2 key={index}>{(block as Heading).text}</h2>;
                            case "subheading":
                                return <h3 key={index}>{(block as SubHeading).text}</h3>;
                            case "paragraph":
                                return (
                                    <p key={index}>
                                        {(block as Paragraph).text.root.children[0].children[0].text}
                                    </p>
                                );
                            case "image":
                                {
                                    const imageBlock = block as Image;
                                    return (<div key={index}>
                                        <img src={`${payloadUrl}${imageBlock.url}`} alt={imageBlock.alt} />
                                        {imageBlock.caption && <p>{imageBlock.caption}</p>}
                                    </div>);
                                }
                            default:
                                return null;
                        }
                    })}
                </div>
            </PageWrap>
        </div>
    );
});

