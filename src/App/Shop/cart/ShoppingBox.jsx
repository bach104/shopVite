import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart, clearCart } from "../../../redux/features/cart/cartSlice.js";

const ShoppingBox = () => {
  const dispatch = useDispatch();
  const { products = [], totalPrice, selectedItems } = useSelector((state) => state.cart);
  const shippingFee = totalPrice * 0.05;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="shoppingBox w-80 border border-black bg-white p-2 absolute top-10 -right-5 rounded-lg shadow-lg">
      <h2 className="text-center bg-slate-200 p-4 text-lg font-bold">Giỏ hàng</h2>
      <div className="space-y-3 mt-3 max-h-60 overflow-y-auto scroll">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="bg-slate-200 flex justify-between items-center p-1 shadow">
              <div className="flex items-center">
                <img 
                  src={item.image || "https://via.placeholder.com/50"} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover"
                  loading="lazy"
                />
                <div className="ml-2">
                  <p className="font-semibold max-w-24 truncate">{item.name}</p>
                  <p className="text-sm">{Number(item.price).toLocaleString("vi-VN")}đ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-gray-300" onClick={() => dispatch(updateQuantity({ id: item.id, type: "decrement" }))}>-</button>
                <span className="w-5 text-center">{item.quantity}</span>
                <button className="px-2 py-1 rounded bg-gray-300" onClick={() => dispatch(updateQuantity({ id: item.id, type: "increment" }))}>+</button>
                <button className="hover:text-red-600 px-2" onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Giỏ hàng trống</p>
        )}
      </div>
      {products.length > 0 && (
        <div>
          <div className="grid grid-cols-3 mt-3 gap-1">
            <div className="bg-black opacity-80 text-white col-span-2 p-3 text-sm">
              <p>Số sản phẩm: {selectedItems}</p>
              <p>Phí ship: {shippingFee.toLocaleString("vi-VN")}đ</p>
              <p className="font-bold">Thành tiền: {finalTotal.toLocaleString("vi-VN")}đ</p>
            </div>
            <button className="text-sm bg-black hover__btn opacity-80 text-white p-3" onClick={() => dispatch(clearCart())}>Xóa tất cả đơn</button>
          </div>
          <button className="w-full bg-black hover__btn opacity-80 text-white py-2 mt-3 rounded">Thanh toán</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingBox;
