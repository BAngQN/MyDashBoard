import "./index.css";
import type { Product } from "../../types";

interface ProductListProps {
    products: Product[];
}

function ProductList({ products }: ProductListProps) {
    return (
        <div className="container">
            <div className="products">
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
                                <button className="product__action-btn product__delete-btn">
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
