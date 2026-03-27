export interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    tags: string[];
    
    publishedAt: string;
    updatedAt: string;
    createdAt: string;
    
    featuredImage: {
        url: string;
        alt: string;
    };
    
    sections: Section[];
}

export interface Section {
    id: number;
    content: {
        root: {
            children: [],
            type: "root",
        }
    }
}
