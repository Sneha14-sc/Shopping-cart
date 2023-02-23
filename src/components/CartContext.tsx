import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Cart } from "./cart/Cart";
import { SingleProduct } from "./Product/SingleProduct";

type CartProviderProps = {
    children: ReactNode
}

export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContext = {
    cartItems: Product[];
    addToCart: (clickedItem: Product) => void;
    removeFromCart: (id: number) => void;
    decreaseItem: (id: number) => void;
    increaseItem: (clickedItem: Product) => void;
    emptyCart: (clickedItem: Product[]) => void;
}

const ShoppingCartContext = createContext({} as CartContext)
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState([] as Product[]);
    const [products, setProducts] = useState([]);

    // adding items to the cart 
    const addToCart = (clickedItem: Product) => {
        setCartItems(prev => {
            // 1. Is the item already added in the cart?
            const isItemInCart = prev.find(item => item.id === clickedItem.id);
            if (isItemInCart) {
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // First time the item is added
            return [...prev, { ...clickedItem, quantity: 1 }];
        });
    };

    // to remove items from the cart
    const removeFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.quantity === 1) return ack;
                    return ack;
                } else {
                    return [...ack, item];
                }
            }, [] as Product[])
        );
    };

    //to increase the quantity of particular product
    const increaseItem = (clickedItem: Product) => {
        setCartItems(prev => {
            return prev.map(item =>
                item.id === clickedItem.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        })
    }

    //to decrease the quantity of particular product
    const decreaseItem = (id: number) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.quantity > 1 && item.id === id) {
                    return [...ack, { ...item, quantity: item.quantity - 1 }];
                }
                else {
                    return [...ack, item];
                }
            }, [] as Product[]));
    }
    //empty the cart once checkout
    function emptyCart(allProducts: Product[]) {
        setCartItems([])
    }

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=20')
            .then((res) => res.json())
            .then((json) => {
                setProducts(json);
            });
    }, []);

    return (
        <ShoppingCartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, decreaseItem, increaseItem, emptyCart }}
        >
            {children}
            <Cart />
            <h1 className='site-header'>Shopping Cart</h1>
            <div className='flex justify-center'>
                <div className=' w-[90%] flex justify-center flex-wrap h-full my-32 gap-16'>
                    {products.length === 0 && (
                        <h1 className='text-2xl text-black'>Loading...</h1>
                    )}
                    {products.map((product: Product) => (
                        <SingleProduct
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            id={product.id}
                            key={product.id}
                        />
                    ))}
                </div>
            </div>
        </ShoppingCartContext.Provider>
    )
}