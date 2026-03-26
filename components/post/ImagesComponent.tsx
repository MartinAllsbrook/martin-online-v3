import { Images } from "src/types/Post.ts";

interface ImagesComponentProps {
    imageSet: Images;
    payloadUrl: string;
}

export default function ImagesComponent({ imageSet, payloadUrl }: ImagesComponentProps) {
    return (
        <div class="flex flex-col sm:flex-row gap-4">
            {
                imageSet.images.map((img, index) => (
                    <div key={index}>
                        <img src={`${payloadUrl}${img.image.url}`} alt={img.image.alt} />
                        {img.caption && <p>{img.caption}</p>}
                    </div>
                ))
            }
        </div>
    );
}