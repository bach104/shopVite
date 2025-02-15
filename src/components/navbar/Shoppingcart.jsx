import { ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingBox from "../../App/Shop/cart/ShoppingBox";

const Shoppingcart = () => {
  const cartItems = useSelector((state) => state.cart.products || []);
  const cartCount = cartItems.length;
  return (
    <div className="relative iconShopping">
      <Link className="hover:text-gray-400" to="/Shopping-cart">
        <ShoppingBagIcon className="w-5 h-5 cursor-pointer" />
        <sup className="absolute left-2 text-center text-sm text-white min-w-5 inline-block bg-primary rounded-full">
          {cartCount}
        </sup>
      </Link>
      <ShoppingBox />
    </div>
  );
};

export default Shoppingcart;
