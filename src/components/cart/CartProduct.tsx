import { Product, useShoppingCart } from "../CartContext";

type Props = {
  item: Product;
};

const CartProduct = ({ item }: Props) => {
  const { removeFromCart, decreaseItem, increaseItem } = useShoppingCart();

  return (
    <div className="cart-item">
      <div className="flex w-3/4">
        <img src={item.image} className="w-20 h-24" alt="product-img" />
        <div className="p-4 text-gray-500">
          <h6 className="text-white">{item.title}</h6>
          <h5>Quantity: {item.quantity}</h5>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button
          className="font-bold text-black hover:text-white"
          onClick={() => removeFromCart(item.id)}
        > X
        </button>
        <h2 className="p-2 text-yellow-500 font-semibold">$ {item.price}</h2>
        <div>
          <button
            className="ml-2 px-2 bg-gray-900  hover:bg-gray-700"
            onClick={() => decreaseItem(item.id)}
          > -
          </button>
          <button
            className="mr-2 px-2 bg-gray-900 hover:bg-gray-700"
            onClick={() => increaseItem(item)}
          > +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
