import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string;
    placeholder?: string;
    fallbackSrc?: string; // Fallback image if main src fails to load

    // Optional callbacks
    onError?: () => void;
    onLoad?: () => void;
    onClick?: () => void;
}


export default function Image({
    src,
    alt,
    className = "",
    aspectRatio = "1/1",
    placeholder = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20400'%3e%3crect%20width='100%25'%20height='100%25'%20fill='%23262626'/%3e%3c/svg%3e",
    fallbackSrc,
    onError,
    onLoad,
    onClick,
 }: ImageProps) {
    /** Image element reference */
    const imageRef = useRef<HTMLImageElement>(null);

    // Signals
    const isLoaded = useSignal(false);
    const isInView = useSignal(false);
    const hasError = useSignal(false);
    const currentSrc = useSignal(src); // Do we need this?

    // Setup intersection observer (Load image when it comes into view)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isInView.value = true;
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "50px" },
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        console.log(`Image loaded: ${currentSrc.value}`);
        isLoaded.value = true;
        hasError.value = false;
        onLoad?.();
    };

    const handleError = () => {
        console.error(`Failed to load image: ${currentSrc.value}`);
        hasError.value = true;

        // Try fallback if available and not already tried
        if (fallbackSrc && currentSrc.value !== fallbackSrc) {
            console.log(`Trying fallback image: ${fallbackSrc}`);
            currentSrc.value = fallbackSrc;
            isLoaded.value = false;
            return;
        }

        onError?.();
    };

    const handleClick = () => {
        console.log(`Image clicked: ${currentSrc.value}`);
        onClick?.();
    };

    console.log(`Rendering image: ${imageRef.current}, inView: ${isInView.value}`);

    return (
        <div
        className={`relative overflow-hidden bg-neutral-800 ${className}`}
        style={{ aspectRatio }}
        >
            <img
                ref={imageRef}
                src={isInView.value ? currentSrc.value : placeholder}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                onClick={handleClick}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isLoaded.value && !hasError.value ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                decoding="async"
            />

            {/* Loading spinner */}
            {!isLoaded.value && isInView.value && !hasError.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin">
                    </div>
                </div>
            )}

            {/* Error state */}
            {hasError.value && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                    <div className="text-center text-neutral-400">
                        <svg
                            className="w-12 h-12 mx-auto mb-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                        <p className="text-sm">Failed to load image</p>
                    </div>
                </div>
            )}
        </div>
    );
}