import { Product } from "./product";

export interface CartContextType {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productID: number) => void;
    clearCart: () => void;
    totalPrice: string;
}
