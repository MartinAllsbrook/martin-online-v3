import { PageProps } from "fresh";
import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";

interface ExpectedData {
    docs: {
        id: number;
        title: string;
        slug: string;
        featuredImage: {
            url: string;
            alt: string;
        };
    }[];
}

export const handler = define.handlers({
    async GET(_ctx) {
        const payloadUrl = Deno.env.get("PAYLOAD_URL");
        const response = await fetch(`${payloadUrl}/api/posts`);
        const data = await response.json();
        return { data };
    }
});

export default define.page(function Work({ data }: PageProps<ExpectedData>) {
    return (
        <div>
            <PageWrap index={[]}>
                <h1>Work</h1>
                {data?.docs.map((post) => (
                    <div key={post.id}>
                        <a href={`/work/${post.slug}`}>
                            <h2>{post.title}</h2>
                            <img src={`http://localhost:3000${post.featuredImage.url}`} alt={post.featuredImage.alt} />
                        </a>
                    </div>
                ))}
            </PageWrap>
            
        </div>
    );
});