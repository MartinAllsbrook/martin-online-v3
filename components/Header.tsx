import LinkInfo from "src/types/LinkInfo.ts";

export default function Header({ index, route }: { index: LinkInfo[], route: LinkInfo[] }) {
    return (
        <header class="mb-4 px-8 border-white border-b sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-sm" style="padding-top: env(safe-area-inset-top)">
            <div class="py-4">
                <h5 class="font-semibold">
                    <a href="https://martinallsbrook.com">martinallsbrook.com</a>
                    {route.map((link) => (
                        <>
                            /
                            <a href={link.href}>
                                {link.name}
                            </a>
                        </>
                    ))}
                </h5>
            </div>
            {/* Index Links */}
            <div class="absolute pt-4 hidden xl:block">
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