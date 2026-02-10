import { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { productApi } from "./utils/mockApi";
import type { Product } from "./types";
import dashboardIcon from "./assets/icon/ic_dashboard.png";
import ProductForm from "./components/ProductForm";
import ProductCreate from "./components/ProductCreate";

// Action type constants
const ProductActionType = {
    SET: "SET",
    ADD: "ADD",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
} as const;

// Action types for the reducer
type ProductAction =
    | { type: typeof ProductActionType.SET; payload: Product[] }
    | { type: typeof ProductActionType.ADD; payload: Product }
    | {
          type: typeof ProductActionType.UPDATE;
          payload: Partial<Product> & { id: string };
      }
    | { type: typeof ProductActionType.DELETE; payload: { id: string } };

function App() {
    return (
        <BrowserRouter>
            <AppComponentWrapper />
        </BrowserRouter>
    );
}

function AppComponentWrapper() {
    const [products, dispatch] = useReducer(productReducer, []);
    useEffect(() => {
        //fetch products from API
        const fetchProducts = async () => {
            const response = await productApi.getAllProducts(1, 10);
            if (response.success) {
                dispatch({
                    type: ProductActionType.SET,
                    payload: response.data.data,
                });
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        };
        fetchProducts();
    }, []);

    const updateProduct = (
        updatedProduct: Partial<Product> & { id: string },
    ) => {
        console.log("Updating product in App.tsx:", updatedProduct);
        dispatch({
            type: ProductActionType.UPDATE,
            payload: updatedProduct,
        });
    };

    const deleteProduct = (productId: string) => {
        dispatch({
            type: ProductActionType.DELETE,
            payload: { id: productId },
        });
    };
    return (
        <div className="app">
            <figure className="app__dashboard-img">
                <img
                    className="app__dashboard-icon"
                    src={dashboardIcon}
                    alt=""
                />
            </figure>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProductList
                            products={products}
                            onDelete={deleteProduct}
                        />
                    }
                />
                <Route
                    path="/product/:id"
                    element={<ProductDetail onUpdate={updateProduct} />}
                />

                <Route
                    path="/product/new"
                    element={
                        <ProductCreate
                            onHandleSubmit={(product: Product) => {
                                console.log(
                                    "Adding product in App.tsx:",
                                    product,
                                );
                                dispatch({
                                    type: ProductActionType.ADD,
                                    payload: product,
                                });
                            }}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

function productReducer(products: Product[], action: ProductAction) {
    switch (action.type) {
        case ProductActionType.SET:
            return action.payload;
        case ProductActionType.ADD:
            return [...products, action.payload];
        case ProductActionType.UPDATE: {
            const updateDate = new Date().toISOString().split("T")[0];
            return products.map((product) =>
                product.id === action.payload.id
                    ? {
                          ...product,
                          ...action.payload,
                          updatedAt: updateDate,
                      }
                    : product,
            );
        }
        case ProductActionType.DELETE: {
            console.log(
                "Deleting product in reducer:",
                products,
                action.payload.id,
            );
            return products.filter(
                (product) => product.id !== action.payload.id,
            );
        }
        default:
            return products;
    }
}

export default App;
