import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "../../types";
import "./index.css";

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
    onCancel: () => void;
    submitButtonText?: string;
}

type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

const categories = [
    "keyboard",
    "mouse",
    "monitor",
    "headset",
    "webcam",
    "speaker",
] as const;

function ProductForm({
    product,
    onSubmit,
    onCancel,
    submitButtonText = "💾 Save Changes",
}: ProductFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormData>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            brand: "",
            category: "keyboard",
            price: 100000,
            stock: 1,
            description: "",
            image: "",
            specifications: {},
        },
    });

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                brand: product.brand,
                category: product.category,
                price: product.price,
                stock: product.stock,
                description: product.description,
                image: product.image,
                specifications: product.specifications,
            });
        }
    }, [product, reset]);

    return (
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="name">Product Name *</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "This input is required",
                        })}
                    />
                    {errors.name && (
                        <em className="error-message">{errors.name.message}</em>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="brand">Brand *</label>
                    <input
                        type="text"
                        id="brand"
                        {...register("brand", {
                            required: "This input is required",
                        })}
                    />
                    {errors.brand && (
                        <em className="error-message">
                            {errors.brand.message}
                        </em>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                        id="category"
                        {...register("category", {
                            required: "This input is required",
                        })}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <em className="error-message">
                            {errors.category.message}
                        </em>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price *</label>
                    <input
                        type="number"
                        id="price"
                        {...register("price", {
                            required: "This input is required",
                            valueAsNumber: true,
                            min: {
                                value: 100000,
                                message: "Price must be positive",
                            },
                        })}
                        step="1"
                    />
                    {errors.price && (
                        <em className="error-message">
                            {errors.price.message}
                        </em>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock *</label>
                    <input
                        type="number"
                        id="stock"
                        {...register("stock", {
                            required: "This input is required",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Stock must be positive",
                            },
                        })}
                    />
                    {errors.stock && (
                        <em className="error-message">
                            {errors.stock.message}
                        </em>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL *</label>
                    <input
                        type="text"
                        id="image"
                        {...register("image", {
                            required: "This input is required",
                        })}
                    />
                    {errors.image && (
                        <em className="error-message">
                            {errors.image.message}
                        </em>
                    )}
                </div>

                <div className="form-group full-width">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        {...register("description", {
                            required: "This input is required",
                        })}
                        rows={4}
                    />
                    {errors.description && (
                        <em className="error-message">
                            {errors.description.message}
                        </em>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-save">
                    {submitButtonText}
                </button>
                <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
