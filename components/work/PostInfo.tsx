export default function PostInfo({ category, date }: { category: string | null; date: string | null }) {
    return (
        (category || date) ? (
            <h4 class="text-neutral-400">
                {[category, date].filter(Boolean).join(" | ")}
            </h4>
        ) : null
    );
}