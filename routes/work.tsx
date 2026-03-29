import { PageProps } from "fresh";
import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";
import getEnvVar from "../src/GetEnv.ts";

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
        const payloadUrl = await getEnvVar("PAYLOAD_URL");
        console.log("Fetching posts from:", `${payloadUrl}/api/posts`);
        const response = await fetch(`${payloadUrl}/api/posts`);
        const data = await response.json();
        return { data };
    }
});

export default define.page(function Work({ data }: PageProps<ExpectedData>) {
    return (
        <PageWrap head={{
            title: "Work - Martin Allsbrook",
            description: "A selection of projects I've worked on, including games, web development, 3d art, and design."
        }} index={[]}>
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
    );
});