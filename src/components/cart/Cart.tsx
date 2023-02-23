import cart_icon from "../../assets/cart-icon.png";
import { useEffect, useState } from "react";
import { Product, useShoppingCart } from "../CartContext";
import CartProduct from "./CartProduct";


export const Cart = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const { cartItems, emptyCart } = useShoppingCart();

  const calculateTotal = (items: Product[]) => {
    if (isOrdered) return 0;
    else
      return items.reduce(
        (ack: number, item) => ack + item.quantity * item.price, 0);
  };

  const getTotalItems = (items: Product[]) => {
    if (isOrdered) return 0;
    else return items.reduce((ack: number, item) => ack + item.quantity, 0);
  };

  useEffect(() => {
    isOrdered && emptyCart(cartItems);
    setTimeout(() => {
      setIsOrdered(false);
    }, 3000);
  }, [cartItems, emptyCart, isOrdered]);

  const handleClick = () => {
    setIsExpand(!isExpand);
  };

  return (
    <>
      {!isExpand ? (
        <button
          className="cart-hidden-icon"
          onClick={handleClick}
        >
          <img src={cart_icon} alt="cart" />
          <span className="items-count">
            {getTotalItems(cartItems)}
          </span>
        </button>
      ) : (
        <div className="cart-view">
          <button
            className="cross-to-hide"
            onClick={handleClick}
          >X
          </button>
          <div className="flex justify-center p-8">
            <img src={cart_icon} alt="cart" className="w-10 h-12" />
            <h2 className="font-bold text-xl p-2 pl-4">Cart Items</h2>
          </div>
          <div className="overflow-auto w-scrollbar  h-2/5">
            {cartItems.length < 1 ? (
              <h4 className="p-10 text-lg">Add some products in the cart!</h4>
            ) : (
              cartItems.map((item) => (
                <CartProduct
                  key={item.id}
                  item={item}
                />
              ))
            )}
          </div>

          <div className="checkout-section">
            <div className="flex justify-between px-2 py-4 text-lg my-4">
              <h3 className="text-zinc-300">SUBTOTAL</h3>
              <h1 className="text-2xl text-yellow-500 font-semibold">
                $ <>{calculateTotal(cartItems).toFixed(2)}</>
              </h1>
            </div>
            <button
              className="checkout-button"
              onClick={() => setIsOrdered(true)}
            >
              {isOrdered ? "Order Placed Successfully!" : "CHECKOUT"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
