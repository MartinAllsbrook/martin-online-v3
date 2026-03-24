import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface LinkInfo {
    name: string;
    href: string;
}

interface PageWrapProps {
    children: preact.ComponentChildren;
    index: LinkInfo[];
}

export default function PageWrap({ children, index }: PageWrapProps) {
    return (
        <div class="relative max-w-screen">
            <div class="mx-8 relative min-h-screen">
                {/* <div class="relative h-full"> */}
                    <Header index={index} />
                    <div class="flex flex-row relative">
                        <div class="grow flex-1">
                            
                        </div>
                        <div class="flex flex-col w-3xl">
                            {children}
                        </div>
                        <div class="grow flex-1">

                        </div>
                    </div>
                    <Footer />
                {/* </div> */}
            </div>
        </div>
        
    );
}