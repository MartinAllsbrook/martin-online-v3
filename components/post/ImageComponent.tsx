import { Image } from "src/types/Post.ts";

interface ImageComponentProps {
    image: Image;
    payloadUrl: string;
}

export default function ImageComponent({ image, payloadUrl }: ImageComponentProps) {
    return (
        <div>
            <img src={`${payloadUrl}${image.image.url}`} alt={image.image.alt} />
            {image.caption && <p>{image.caption}</p>}
        </div>
    );
}