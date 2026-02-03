import { useEffect, useReducer } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import { productApi } from "./utils/mockApi";
import type { Product } from "./types";
import dashboardIcon from "./assets/icon/ic_dashboard.png";

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
    return (
        <div className="app">
            <figure className="app__dashboard-img">
                <img
                    className="app__dashboard-icon"
                    src={dashboardIcon}
                    alt=""
                />
            </figure>
            <ProductList products={products} />
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
            return products.map((product) =>
                product.id === action.payload.id
                    ? {
                          ...product,
                          ...action.payload,
                          lastedAt: new Date().toISOString(),
                      }
                    : product,
            );
        }
        case ProductActionType.DELETE: {
            return products.filter(
                (product) => product.id !== action.payload.id,
            );
        }
        default:
            return products;
    }
}

export default App;
