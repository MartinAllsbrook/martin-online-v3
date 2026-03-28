import type {
    Post,
    Collaborator,
    Image,
    SEO,
    BlockLevelNode,
    TextNode,
    ImageSetItem,
    Content,
} from "./types/Post.ts";

// deno-lint-ignore no-explicit-any
type Raw = any;

function parseImage(raw: Raw): Image {
    return {
        id: raw.id,
        alt: raw.alt,
        tags: raw.tags ?? [],
        url: raw.url,
        thumbnailURL: raw.thumbnailURL ?? null,
        filename: raw.filename,
        mimeType: raw.mimeType,
        filesize: raw.filesize,
        width: raw.width,
        height: raw.height,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
    };
}

function parseCollaborator(raw: Raw): Collaborator {
    return {
        id: raw.id,
        name: raw.name,
        role: raw.role,
        link: raw.link,
    };
}

function parseSEO(raw: Raw): SEO {
    return {
        metaTitle: raw?.metaTitle ?? null,
        metaDescription: raw?.metaDescription ?? null,
        ogImage: raw?.ogImage ?? null,
    };
}

function parseTextNode(raw: Raw): TextNode {
    return {
        type: "text",
        text: raw.text,
        detail: raw.detail,
        format: raw.format,
        mode: raw.mode,
        style: raw.style,
        version: raw.version,
    };
}

function parseImageSetItem(raw: Raw): ImageSetItem {
    return {
        id: raw.id,
        image: parseImage(raw.image),
        caption: raw.caption ?? "",
    };
}

function parseBlockLevelNode(raw: Raw): BlockLevelNode {
    switch (raw.type) {
        case "paragraph":
            return {
                type: "paragraph",
                children: (raw.children as Raw[]).map(parseTextNode),
                direction: raw.direction ?? null,
                format: raw.format,
                indent: raw.indent,
                version: raw.version,
                textFormat: raw.textFormat,
                textStyle: raw.textStyle,
            };
        case "heading":
            return {
                type: "heading",
                tag: raw.tag,
                children: (raw.children as Raw[]).map(parseTextNode),
                direction: raw.direction ?? null,
                format: raw.format,
                indent: raw.indent,
                version: raw.version,
            };
        case "block":
            return {
                type: "block",
                format: raw.format,
                version: raw.version,
                fields: {
                    id: raw.fields.id,
                    blockType: raw.fields.blockType,
                    blockName: raw.fields.blockName ?? "",
                    images: (raw.fields.images as Raw[]).map(parseImageSetItem),
                },
            };
        default:
            throw new Error(`Unknown block-level node type: "${raw.type}"`);
    }
}

function parseContent(raw: Raw): Content {
    return {
        root: {
            type: "root",
            children: (raw.content.root.children as Raw[]).map(parseBlockLevelNode),
            direction: raw.content.root.direction ?? null,
            format: raw.content.root.format,
            indent: raw.content.root.indent,
            version: raw.content.root.version,
        },
    };
}

/** Parses a single post document from the CMS into a typed `Post`. */
export function parsePost(raw: Raw): Post {
    return {
        id: raw.id,
        title: raw.title,
        slug: raw.slug,
        date: raw.date,
        status: raw.status,
        tags: raw.tags ?? [],
        collaborators: (raw.collaborators as Raw[] ?? []).map(parseCollaborator),
        publishedAt: raw.publishedAt,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
        featuredImage: parseImage(raw.featuredImage),
        content: parseContent(raw),
        seo: parseSEO(raw.seo),
    };
}

/** Parses the full paginated CMS response into a `Post` array. */
export function parsePostsResponse(json: Raw): Post[] {
    return (json.docs as Raw[]).map(parsePost);
}
