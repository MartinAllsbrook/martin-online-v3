import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

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
      <div class="">
        <h1>Welcome to Martin Allsbrook's Portfolio</h1>
        <h2>This is an h2</h2>
        <p>This is a paragraph.</p>
      </div>
    </div>
  );
});
