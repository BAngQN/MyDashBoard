import "./index.css";
import type { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import { productApi } from "@/utils/mockApi";

interface ProductListProps {
    products: Product[];
    onDelete: (productId: string) => void;
}

function ProductList({ products, onDelete }: ProductListProps) {
    const navigate = useNavigate();
    const onProductDetailClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const handleDeleteItem = async (productId: string) => {
        const response = await productApi.deleteProduct(productId);
        if (!response.success) {
            console.error("Failed to delete product:", response.message);
            return;
        }
        onDelete(productId);
    };

    const onCreateNewClick = () => {
        navigate(`/product/new`);
    };
    return (
        <div className="container products">
            <div className="product-header">
                <button onClick={onCreateNewClick}>
                    <i className="fa-solid fa-plus"></i>
                    Create New
                </button>
            </div>
            <div className="product-body">
                {/* Header Row */}
                <div className="product__header-row">
                    <div className="product__header">Order</div>
                    <div className="product__header">Name</div>
                    <div className="product__header">Stock</div>
                    <div className="product__header">Created</div>
                    <div className="product__header">Last Updated</div>
                    <div className="product__header">Action</div>
                </div>

                {/* Product Rows */}
                {products.map((product, index) => {
                    const darkCellClass =
                        index % 2 === 0 ? "product__row--dark" : "";
                    return (
                        <div
                            key={product.id}
                            className={`product__row ${darkCellClass}`}
                            onClick={() => onProductDetailClick(product.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="product__cell">{product.id}</div>
                            <div className="product__cell">{product.name}</div>
                            <div className="product__cell">{product.stock}</div>
                            <div className="product__cell">
                                {product.createdAt}
                            </div>
                            <div className="product__cell">
                                {product.updatedAt}
                            </div>
                            <div className="product__cell product__actions">
                                <button
                                    className="product__action-btn product__delete-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteItem(product.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductList;
