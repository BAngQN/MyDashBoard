import type {
    Product,
    ApiResponse,
    ProductCategory,
    PaginatedResponse,
} from "../types";
import { mockProducts } from "../data/mockProducts";

// Simulate API delay
const delay = (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const products = [...mockProducts];

export const productApi = {
    // Get all products with pagination
    async getAllProducts(
        page: number = 1,
        limit: number = 10,
    ): Promise<ApiResponse<PaginatedResponse<Product>>> {
        await delay();

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = products.slice(startIndex, endIndex);
        const total = products.length;
        const totalPages = Math.ceil(total / limit);

        return {
            data: {
                data: paginatedData,
                total,
                page,
                limit,
                totalPages,
                hasMore: page < totalPages,
            },
            success: true,
            message: "Products fetched successfully",
        };
    },

    // Get product by ID
    async getProductById(id: string): Promise<ApiResponse<Product | null>> {
        await delay();
        const product = products.find((p) => p.id === id);
        return {
            data: product || null,
            success: !!product,
            message: product ? "Product found" : "Product not found",
        };
    },

    // Get products by category
    async getProductsByCategory(
        category: ProductCategory,
    ): Promise<ApiResponse<Product[]>> {
        await delay();
        const filtered = products.filter((p) => p.category === category);
        return {
            data: filtered,
            success: true,
            message: `Found ${filtered.length} products in category ${category}`,
        };
    },

    // Search products by name or brand
    async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
        await delay();
        const lowerQuery = query.toLowerCase();
        const filtered = products.filter(
            (p) =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.brand.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery),
        );
        return {
            data: filtered,
            success: true,
            message: `Found ${filtered.length} products matching "${query}"`,
        };
    },

    // Create new product
    async createProduct(
        product: Omit<Product, "id" | "createdAt" | "updatedAt">,
    ): Promise<ApiResponse<Product>> {
        await delay();
        const newProduct: Product = {
            ...product,
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        products.push(newProduct);
        return {
            data: newProduct,
            success: true,
            message: "Product created successfully",
        };
    },

    // Update product
    async updateProduct(
        id: string,
        updates: Partial<Omit<Product, "id" | "createdAt">>,
    ): Promise<ApiResponse<Product | null>> {
        await delay();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return {
                data: null,
                success: false,
                message: "Product not found",
            };
        }
        products[index] = {
            ...products[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        return {
            data: products[index],
            success: true,
            message: "Product updated successfully",
        };
    },

    // Delete product
    async deleteProduct(id: string): Promise<ApiResponse<boolean>> {
        await delay();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return {
                data: false,
                success: false,
                message: "Product not found",
            };
        }
        products.splice(index, 1);
        return {
            data: true,
            success: true,
            message: "Product deleted successfully",
        };
    },
};
