import { Post } from "src/types/Post.ts";
import PostInfo from "./PostInfo.tsx";
import Image from "islands/Image.tsx";

export default function PostPreview({ post, payloadUrl }: { post: Post; payloadUrl: string }) {
    return (
        <div key={post.id} class="my-8">
            <a href={`/work/${post.slug}`} class="group no-underline">
                <div class="my-2">
                    <Image src={`${payloadUrl}${post.featuredImage.url}`} alt={post.featuredImage.alt} />
                </div>
                <h2 class="group-hover:underline decoration-1 underline-offset-3">{post.title}</h2>

                <PostInfo category={post.category} date={post.date} />
            </a>
        </div>
    );

}