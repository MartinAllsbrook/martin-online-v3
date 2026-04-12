import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";

export default define.page(function Home(_ctx) {
    
    
    return (
        <PageWrap head={{
            title: "Martin Allsbrook",
            description: "Martin Allsbrook is a web & game developer and 3d artist based in Brooklyn, NY."
        }} index={[
            { name: "work", href: "work" },
            { name: "about", href: "about" },
            { name: "contact", href: "contact" },
            { name: "github", href: "https://github.com/martinallsbrook", external: true },
            { name: "linkedin", href: "https://www.linkedin.com/in/martin-allsbrook/", external: true },
            { name: "youtube", href: "https://www.youtube.com/@martinibomb", external: true },
        ]}
        route={[]}>
            <div class="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center text-center gap-4 bottom-0">
                <h1>Martin Allsbrook</h1>
                <h4>
                    <a href="work/">Games</a> • <a href="work/">Web</a> • <a href="work/">3D</a> • <a href="work/">Design</a>
                </h4>
            </div>
        
        </PageWrap>
    );
});
