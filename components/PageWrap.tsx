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
    route: LinkInfo[];
}

export default function PageWrap({ children, index, route, head }: PageWrapProps) {
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
                <div class="flex flex-col min-h-screen">
                    {/* Header */}
                    <Header index={index} route={route} />

                    {/* Main Content */}
                    <div class="mx-8 flex flex-row relative flex-1">
                        <div class="grow flex-1">
                            {/* Left spacer */}
                        </div>
                        <main class="flex flex-col w-3xl">
                            {/* Main Content */}
                            {children}
                        </main>
                        <div class="grow flex-1">
                            {/* Right spacer */}
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
        
    );
}