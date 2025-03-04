import { ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetchCartQuery } from "../../redux/features/cart/cartApi";
import ShoppingBox from "../../App/Shop/cart/ShoppingBox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Shoppingcart = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const userId = user?._id; 
  const {
    data,
    error,
    refetch,
    isSuccess,
  } = useFetchCartQuery(
    { userId }, 
    { skip: !isLoggedIn } 
  );

  const [localCart, setLocalCart] = useState([]);
  useEffect(() => {
    if (!isLoggedIn) {
      const storedCart = JSON.parse(localStorage.getItem("localCart") || "[]");
      setLocalCart(storedCart);
    }
  }, [isLoggedIn]);

  if (error) {
    console.error("Lỗi API giỏ hàng:", error);
  }

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      refetch();
    }
  }, [userId, isLoggedIn, isSuccess, refetch]);

  const totalItems = isLoggedIn
    ? data?.totalItems ?? 0 
    : localCart.length; 

  const cartItems = isLoggedIn
    ? data?.cartItems ?? [] 
    : localCart; 

  return (
    <div className="relative iconShopping">
      <Link className="hover:text-gray-400" to="/cart-manager">
        <ShoppingBagIcon className="w-5 h-5 cursor-pointer" />
        <sup className="absolute left-2 text-center text-sm text-white min-w-5 inline-block bg-primary rounded-full">
          {totalItems}
        </sup>
      </Link>
      <ShoppingBox cartItems={cartItems} />
    </div>
  );
};

export default Shoppingcart;