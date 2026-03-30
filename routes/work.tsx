import { page, PageProps } from "fresh";
import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";
import getEnvVar, { getPayloadBinding } from "../src/GetEnv.ts";
import { Post } from "src/types/Post.ts";
import { parsePostsResponse } from "src/ParsePost.ts";

interface ExpectedResponse {
    posts: Post[];
}

interface Data {
    posts: Post[];
    payloadUrl: string;
}


// https://fresh.deno.dev/docs/concepts/data-fetching
export const handler = define.handlers({
    async GET(_ctx) {

        const payloadUrl = await getEnvVar("PAYLOAD_URL");
        const binding = await getPayloadBinding();
        
        console.log("Fetching posts from:", `${payloadUrl}/api/posts`);
        
        const response = await (binding ?? globalThis).fetch(`${payloadUrl}/api/posts`);
        
        if (!response.ok) {
            throw new Error(`CMS responded ${response.status}: ${await response.text()}`);
        }
        
        const json = await response.json();
        const posts: Post[] = parsePostsResponse(json);
        return page({ posts, payloadUrl });
    }
});

export default define.page(function Work({ data }: PageProps<Data>) {
    return (
        <PageWrap head={{
            title: "Work - Martin Allsbrook",
            description: "A selection of projects I've worked on, including games, web development, 3d art, and design."
        }} index={[]}>
            <h1>Work</h1>
            {data?.posts.map((post) => (
                <div key={post.id}>
                    <a href={`/work/${post.slug}`}>
                        <h2>{post.title}</h2>
                        <img src={`${data.payloadUrl}${post.featuredImage.url}`} alt={post.featuredImage.alt} />
                    </a>
                </div>
            ))}
        </PageWrap>
    );
});