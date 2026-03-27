export interface Post {
    id: number;
    title: string;
    slug: string;
    date: string;
    status: string;
    tags: string[];
    collaborators: Collaborator[];

    publishedAt: string;
    updatedAt: string;
    createdAt: string;

    featuredImage: Image;
    sections: Section[];
    seo: SEO;
}

export interface Collaborator {
    id: string;
    name: string;
    role: string;
    link: string;
}

export interface Image {
    id: number;
    alt: string;
    tags: string[];
    url: string;
    thumbnailURL: string | null;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    updatedAt: string;
    createdAt: string;
}

export interface SEO {
    metaTitle: string | null;
    metaDescription: string | null;
    ogImage: string | null;
}

// --- Sections & Rich Text (Lexical editor format) ---

export interface Section {
    id: string;
    content: {
        root: RootNode;
    };
}

export interface RootNode {
    type: "root";
    children: BlockLevelNode[];
    direction: string | null;
    format: string;
    indent: number;
    version: number;
}

export type BlockLevelNode = ParagraphNode | HeadingNode | BlockNode;

export interface ParagraphNode {
    type: "paragraph";
    children: TextNode[];
    direction: string | null;
    format: string;
    indent: number;
    version: number;
    textFormat: number;
    textStyle: string;
}

export interface HeadingNode {
    type: "heading";
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children: TextNode[];
    direction: string | null;
    format: string;
    indent: number;
    version: number;
}

export interface TextNode {
    type: "text";
    text: string;
    detail: number;
    format: number;
    mode: string;
    style: string;
    version: number;
}

// --- Custom Blocks ---

export interface BlockNode {
    type: "block";
    format: string;
    version: number;
    fields: ImageSetBlock; // extend as a union when more block types are added i.e. ImageSetBlock | VideoBlock | etc.
}

export interface ImageSetBlock {
    id: string;
    blockType: "image-set";
    blockName: string;
    images: ImageSetItem[];
}

export interface ImageSetItem {
    id: string;
    image: Image;
    caption: string;
}
