import { useNavigate } from "react-router-dom";
import { productApi } from "../../utils/mockApi";
import type { Product } from "../../types";
import ProductForm from "../ProductForm";
import "./index.css";

interface ProductCreateProps {
    onHandleSubmit: (data: Product) => void;
}

function ProductCreate({ onHandleSubmit }: ProductCreateProps) {
    const navigate = useNavigate();

    const handleSubmit = async (
        data: Omit<Product, "id" | "createdAt" | "updatedAt">,
    ) => {
        try {
            const response = await productApi.createProduct(data);
            if (response.success && response.data) {
                alert("Product created successfully!");
                onHandleSubmit(response.data);
                navigate("/");
            } else {
                alert("Failed to create product");
            }
        } catch {
            alert("Error creating product");
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="product-create">
            <div className="product-create__header">
                <button className="btn btn-back" onClick={() => navigate("/")}>
                    ← Back to Products
                </button>
            </div>

            <div className="product-create__content">
                <h1>Create New Product</h1>
                <ProductForm
                    product={null}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    submitButtonText="➕ Create Product"
                />
            </div>
        </div>
    );
}

export default ProductCreate;
