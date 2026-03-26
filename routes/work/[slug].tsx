import { page, PageProps } from "fresh";
import { define } from "@/utils.ts";
import PageWrap from "components/PageWrap.tsx";
import Post, { Heading, Image, Paragraph, SubHeading } from "src/types/Post.ts";
import HeadingComponent from "components/post/Heading.tsx";
import SubheadingComponent from "components/post/Subheading.tsx";
import ParagraphComponent from "components/post/Paragraph.tsx";
import ImageComponent from "components/post/ImageComponent.tsx";

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
                                return <HeadingComponent key={index} heading={block as Heading} />;
                            case "subheading":
                                return <SubheadingComponent key={index} subheading={block as SubHeading} />;
                            case "paragraph":
                                return <ParagraphComponent key={index} paragraph={block as Paragraph} />
                            case "image":
                                return <ImageComponent key={index} image={block as Image} payloadUrl={payloadUrl} />;
                            default:
                                return null;
                        }
                    })}
                </div>
            </PageWrap>
        </div>
    );
});

