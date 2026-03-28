import LinkInfo from "src/types/LinkInfo.ts";

export default function Header({ index }: { index: LinkInfo[] }) {
    return (
        <header class="mb-4 border-white border-b sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-sm">
            <div class="py-4">
                <h5 class="font-semibold">
                    <a href="https://martinallsbrook.com">martinallsbrook.com</a>
                </h5>
            </div>
            <div class="absolute pt-4">
                {index.map((link) => (
                    <h5 key={link.href}>
                        <a href={link.href} target={link.external ? "_blank" : "_self"} rel={link.external ? "noopener noreferrer" : undefined}>
                            {link.name}
                        </a>
                    </h5>
                ))}
            </div>
        </header>
    );
}