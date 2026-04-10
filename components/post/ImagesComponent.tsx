import { ImageSetBlock } from "src/types/Post.ts";
import Image from "islands/Image.tsx";

interface ImagesComponentProps {
    imageSet: ImageSetBlock;
    payloadUrl: string;
}

export default function ImagesComponent({ imageSet, payloadUrl }: ImagesComponentProps) {
    return (
        <div class="flex flex-col sm:flex-row gap-4">
            {
                imageSet.images.map((img, index) => (
                    <div key={index}>
                        <div class="my-2">
                            <Image src={`${payloadUrl}${img.image.url}`} alt={img.image.alt} aspectRatio={img.image.aspectRatio?.toFixed(2) ?? undefined}/>
                        </div>

                        {img.caption && <p class="mb-2 font-light text-neutral-300">{img.caption}</p>}
                    </div>
                ))
            }
        </div>
    );
}