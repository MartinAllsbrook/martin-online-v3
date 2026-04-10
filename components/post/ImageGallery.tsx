import { ImageGalleryItem } from "src/types/Post.ts";
import Image from "islands/Image.tsx";

interface ImageGalleryProps {
    images: ImageGalleryItem[];
    aspectRatio: number;

    payloadUrl: string;
}

export default function ImageGallery({ images, aspectRatio, payloadUrl }: ImageGalleryProps) {
    return (
        <div class="grid grid-cols-1 gap-4 my-8">
            {
                images.map((img, index) => (
                    <div key={index}>
                        <div class="my-2">
                            <Image 
                                src={`${payloadUrl}${img.image.url}`} 
                                alt={img.image.alt} 
                                aspectRatio={aspectRatio == 0 ? img.image.aspectRatio?.toFixed(2) : aspectRatio.toFixed(2)}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}