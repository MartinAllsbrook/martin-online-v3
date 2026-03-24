import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://use.typekit.net/kgy0lku.css"></link>
        <title>Martin Allsbrook</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
