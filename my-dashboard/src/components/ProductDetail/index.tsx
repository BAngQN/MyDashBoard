import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../../utils/mockApi";
import type { Product } from "../../types";
import "./index.css";
import ProductForm from "../ProductForm";

function ProductDetail({ onUpdate }: { onUpdate: (product: Product) => void }) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError("No product ID provided");
                setLoading(false);
                return;
            }

            try {
                const response = await productApi.getProductById(id);
                if (response.success && response.data) {
                    setProduct(response.data);
                } else {
                    setError(response.message || "Product not found");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const onSubmitForm = async (
        data: Omit<Product, "id" | "createdAt" | "updatedAt">,
    ) => {
        try {
            const updatedProduct = {
                ...data,
                id: product!.id,
                createdAt: product!.createdAt,
                updatedAt: new Date().toISOString(),
            };
            const response = await productApi.updateProduct(
                id!,
                updatedProduct,
            );
            if (response.success && response.data) {
                setProduct(response.data);
                setIsEditing(false);
                onUpdate(response.data);
                alert("Product updated successfully!");
            } else {
                alert("Failed to update product");
            }
        } catch {
            alert("Error updating product");
        }
    };

    if (loading) {
        return (
            <div className="product-detail">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail">
                <div className="error">{error || "Product not found"}</div>
                <button className="btn btn-back" onClick={() => navigate("/")}>
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <div className="product-detail__header">
                <button className="btn btn-back" onClick={() => navigate("/")}>
                    ← Back to Products
                </button>
                {!isEditing && (
                    <button className="btn btn-edit" onClick={handleEdit}>
                        ✏️ Edit Product
                    </button>
                )}
            </div>

            {isEditing ? (
                <ProductForm
                    product={product}
                    onSubmit={onSubmitForm}
                    onCancel={handleCancel}
                />
            ) : (
                <div className="product-detail__content">
                    <div className="product-detail__image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-detail__info">
                        <h1 className="product-detail__name">{product.name}</h1>
                        <p className="product-detail__brand">
                            by {product.brand}
                        </p>

                        <div className="product-detail__meta">
                            <div className="meta-item">
                                <span className="meta-label">Category:</span>
                                <span className="meta-value">
                                    {product.category}
                                </span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Price:</span>
                                <span className="meta-value price">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Stock:</span>
                                <span
                                    className={`meta-value stock ${product.stock < 10 ? "low" : ""}`}
                                >
                                    {product.stock} units
                                </span>
                            </div>
                        </div>

                        <div className="product-detail__description">
                            <h2>Description</h2>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-detail__specs">
                            <h2>Specifications</h2>
                            <ul>
                                {Object.entries(product.specifications).map(
                                    ([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>

                        <div className="product-detail__dates">
                            <p>
                                <small>
                                    Created:{" "}
                                    {new Date(
                                        product.createdAt,
                                    ).toLocaleDateString()}
                                </small>
                            </p>
                            <p>
                                <small>
                                    Last updated:{" "}
                                    {new Date(
                                        product.updatedAt,
                                    ).toLocaleDateString()}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
