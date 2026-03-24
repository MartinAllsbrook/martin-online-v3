import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import PageWrap from "../components/PageWrap.tsx";

export default define.page(function Home(_ctx) {


  return (
    <div class="">
      <Head>
        <title>Martin Allsbrook</title>
        <meta 
          name="description" 
          content="Martin Allsbrook is a developer & 3d artist based in Brooklyn, NY."
        />
      </Head>
      <PageWrap index={[
        { name: "work", href: "work" },
        { name: "about", href: "about" },
        { name: "contact", href: "contact" },
        { name: "github", href: "https://github.com/martinallsbrook" },
        { name: "linkedin", href: "https://www.linkedin.com/in/martin-allsbrook/" },
        { name: "youtube", href: "https://www.youtube.com/@martinibomb" },
      ]}>
        <div class="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center text-center gap-4 bottom-0">
          <h1>Martin Allsbrook</h1>
          <h4>
            <a href="work/games">Games</a> • <a href="work/web">Web</a> • <a href="work/3d">3D</a> • <a href="work/design">Design</a>
          </h4>
        </div>
        
      </PageWrap>
    </div>
  );
});
