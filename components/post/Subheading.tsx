import { SubHeading } from "src/types/Post.ts";

export default function SubheadingComponent({ subheading }: { subheading: SubHeading }) {
    return <h3>{subheading.text}</h3>;
}