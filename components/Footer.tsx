export default function Footer() {
    return (
        <footer class="absolute w-full bottom-0 p-4 z-10 text-center">
            <p class="text-neutral-500 text-sm font-extralight">© {new Date().getFullYear()} Martin Allsbrook. All rights reserved.</p>
        </footer>
    );
}