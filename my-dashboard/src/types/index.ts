export interface Product {
    id: string;
    name: string;
    category:
        | "keyboard"
        | "mouse"
        | "monitor"
        | "headset"
        | "webcam"
        | "speaker";
    brand: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    specifications: Record<string, string>;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
}

export type ProductCategory = Product["category"];
