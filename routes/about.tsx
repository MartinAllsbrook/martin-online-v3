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
            <PageWrap head = {{ title: "About - Martin Allsbrook" }} index={[{ name: "back", href: "./" }]} route={[ { name: "about", href: "./about" } ]}>
                <h1>About</h1>
                <img src={`http://localhost:3000${data?.url}`} alt={data?.alt} />
            </PageWrap>
        </div>
    );
});