import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Head } from "fresh/runtime";
import LinkInfo from "src/types/LinkInfo.ts";

interface PageWrapProps {
    children: preact.ComponentChildren;
    head?: {
        title?: string;
        description?: string;
    };
    index: LinkInfo[];
}

export default function PageWrap({ children, index, head }: PageWrapProps) {
    return (
        <>
            {/* Head */}
            <Head>
                <title>{head?.title ?? "Martin Allsbrook"}</title>

                {/* Only add description if provided */}
                {head?.description && (
                    <meta 
                        name="description" 
                        content={head.description} 
                    />
                )}
            </Head>

            {/* Page Content */}
            <div class="relative max-w-screen">
                <div class="mx-8 relative min-h-screen">
                    <Header index={index} />
                    <div class="flex flex-row relative">
                        <div class="grow flex-1">
                            {/* Left spacer */}
                        </div>
                        <div class="flex flex-col w-3xl">
                            {/* Main Content */}
                            {children}
                        </div>
                        <div class="grow flex-1">
                            {/* Right spacer */}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
        
    );
}