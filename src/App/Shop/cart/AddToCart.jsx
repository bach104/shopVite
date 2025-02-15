import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCart = ({ productId, name, price, image, size, color }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products || []);

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === productId && item.size === size && item.color === color);
    if (existingItem) {
      toast.warning("Sản phẩm đã có trong giỏ hàng!", { autoClose: 1000, position: "top-right" });
    } else {
      dispatch(addToCart({ id: productId, name, price, image, size, color }));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!", { autoClose: 1000, position: "top-right" });
    }
  };
  return (
    <button className="absolute right-3 top-3" onClick={handleAddToCart}>
      <i className="fa-solid text-xl transition text-white fa-cart-shopping bg-black opacity-60 w-10 h-10 btn__add flex justify-center"></i>
    </button>
  );
};

export default AddToCart;
