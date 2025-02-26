import { ShoppingBagIcon } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useFetchCartQuery } from "../../redux/features/cart/cartApi";
import ShoppingBox from "../../App/Shop/cart/ShoppingBox";
import { useSelector } from "react-redux";

const Shoppingcart = () => {
  const { data, isLoading, error } = useFetchCartQuery({ page: 1 });
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user; 

  if (error) {
    console.error("Lỗi API giỏ hàng:", error);
  }

  const totalItems = isLoggedIn && !error ? data?.totalItems ?? 0 : 0;
  const cartItems = isLoggedIn && !error && Array.isArray(data?.cartItems) ? data.cartItems : [];

  return (
    <div className="relative iconShopping">
      <Link className="hover:text-gray-400" to="/cart-manager">
        <ShoppingBagIcon className="w-5 h-5 cursor-pointer" />
        <sup className="absolute left-2 text-center text-sm text-white min-w-5 inline-block bg-primary rounded-full">
          {isLoading ? "..." : totalItems}
        </sup>
      </Link>
      <ShoppingBox cartItems={cartItems} />
    </div>
  );
};

export default Shoppingcart;
