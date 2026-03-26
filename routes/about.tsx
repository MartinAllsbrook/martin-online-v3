import { Head } from "fresh/runtime";
import { PageProps } from "fresh";
import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";

interface MediaData {
    url: string;
    alt: string;
}

export const handler = define.handlers({
    async GET(_ctx) {
        const payloadUrl = Deno.env.get("PAYLOAD_URL");
        const response = await fetch(`${payloadUrl}/api/media/1`);
        const data = await response.json();
        console.log("data", data);
        return { data };
    }
});

export default define.page(function About({ data }: PageProps<MediaData>) {
    return (
        <div class="">
            <Head>
                <title>About - Martin Allsbrook</title>
                <meta 
                    name="description" 
                    content="Martin Allsbrook is a developer & 3d artist based in Brooklyn, NY."
                />
            </Head>
            <PageWrap index={[]}>
                <h1>About</h1>
                <img src={`http://localhost:3000${data?.url}`} alt={data?.alt} />
            </PageWrap>
        </div>
    );
});