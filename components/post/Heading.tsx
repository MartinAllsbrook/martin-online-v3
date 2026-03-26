import { Heading } from "src/types/Post.ts";

export default function HeadingComponent({ heading }: { heading: Heading }) {
    return <h2>{heading.text}</h2>;
}