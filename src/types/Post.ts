export default interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    publishedAt: string;
    updatedAt: string;
    createdAt: string;
    author: number;
    tags: string[];
    featuredImage: {
        url: string;
        alt: string;
    };
    content: (Heading | SubHeading | Paragraph | Images)[];
}

export interface Block {
    blockType: "heading" | "subheading" | "paragraph" | "images";
}

export interface Heading extends Block {
    text: string;
}

export interface SubHeading extends Block {
    text: string;
}

export interface Paragraph extends Block {
    text: {
        root: {
            type: "root";
            children: [
                {
                    type: "paragraph";
                    children: {
                        type: "text";
                        text: string;
                        format: number;
                    }[];
                }
            ]
        };
    }
}

export interface Images extends Block {
    images: {
        image: {
            alt: string;
            url: string;
        };
        caption?: string;
    }[];
}