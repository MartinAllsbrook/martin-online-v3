import { page, PageProps } from "fresh";
import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";
import { Image } from "src/types/Post.ts";
import ImageComponent from "islands/Image.tsx";

interface MediaData {
    image: Image;
    payloadUrl: string;
}

export const handler = define.handlers({
    async GET(_ctx) {
        const payloadUrl = Deno.env.get("PAYLOAD_URL");
        const response = await fetch(`${payloadUrl}/api/media?where[tags][in]=about&limit=1`);
        const data = await response.json();
        console.log("data", data);
        return page({ image: data?.docs?.[0], payloadUrl });
    }
});

export default define.page(function About({ data }: PageProps<MediaData>) {
    return (
        <div class="">
            <PageWrap head = {{ title: "About - Martin Allsbrook" }} index={[{ name: "back", href: "./" }]} route={[ { name: "about", href: "./about" } ]}>
                <h1 class="mb-4">About</h1>
                <div class="flex flex-col sm:flex-row">
                    <ImageComponent className="hidden sm:block sm:w-1/3 mr-4" src={`${data?.payloadUrl}${data?.image?.url}`} alt={data?.image?.alt} aspectRatio="1"/>
                    <p class="mb-4 sm:w-2/3">
                        I'm Martin Allsbrook, a Brooklyn-based developer and 3D artist with a passion for games, programming, and the web. My experiences span architectural and product renders to interactive web applications and games. I love the challenge of making things move and interact, and I'm always eager to learn new skills.
                    </p>
                    <ImageComponent className="sm:hidden" src={`${data?.payloadUrl}${data?.image?.url}`} alt={data?.image?.alt} aspectRatio="1"/>
                </div>
            </PageWrap>
        </div>
    );
});