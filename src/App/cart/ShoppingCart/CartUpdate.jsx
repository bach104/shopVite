import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateCartItemMutation } from "../../../redux/features/cart/cartApi";
import { useGetProductByIdQuery } from "../../../redux/features/shop/productsApi";

const CartUpdate = ({ onClose, product }) => {
  const [size, setSize] = useState(product.size); // Kích thước hiện tại
  const [color, setColor] = useState(product.color); // Màu sắc hiện tại
  const [quantity, setQuantity] = useState(product.quantity); // Số lượng hiện tại

  // Lấy thông tin chi tiết sản phẩm từ API
  const { data: productDetails, isLoading: isProductLoading } = useGetProductByIdQuery(product.productId);

  const [updateCartItem] = useUpdateCartItemMutation();

  const handleUpdate = async () => {
    try {
      await updateCartItem({
        cartItemId: product._id,
        size,
        color,
        quantity,
      }).unwrap();
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
  };

  // Hiển thị loading nếu đang tải dữ liệu
  if (isProductLoading) {
    return <div className="text-center py-4 text-lg text-gray-500">Đang tải thông tin sản phẩm...</div>;
  }

  // Hiển thị thông báo lỗi nếu không tìm thấy sản phẩm
  if (!productDetails) {
    return <div className="text-center py-4 text-lg text-red-500">Không tìm thấy thông tin sản phẩm</div>;
  }

  return (
    <div className="cart__container p-2">
      <div className="cart__update p-6 border relative rounded-lg shadow-md bg-white">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute transition text-2xl hover:scale-125 top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold mb-4">Cập nhật</h2>
        <div className="flex cart__wrap gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-60 h-60 block object-cover rounded-lg border"
          />
          <div className="flex flex-col flex-1 gap-3">
            <p className="text-lg font-medium">Tên sản phẩm: {product.name}</p>

            {/* Kích thước */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-medium">Kích thước:</span>
              {productDetails.size?.length > 0 ? (
                productDetails.size.map((sz) => (
                  <button
                    key={sz}
                    className={`px-3 py-1 border rounded ${
                      size === sz ? "bg-black text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setSize(sz)}
                  >
                    {sz}
                  </button>
                ))
              ) : (
                <p>Không có kích thước nào</p>
              )}
            </div>

            {/* Màu sắc */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-medium">Màu sắc:</span>
              {productDetails.color?.length > 0 ? (
                productDetails.color.map((clr) => (
                  <button
                    key={clr}
                    className={`px-3 py-1 border rounded ${
                      color === clr ? "bg-black text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setColor(clr)}
                  >
                    {clr}
                  </button>
                ))
              ) : (
                <p>Không có màu sắc nào</p>
              )}
            </div>

            {/* Số lượng */}
            <div className="flex items-center gap-2">
              <span className="font-medium">Số lượng:</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            {/* Nút cập nhật */}
            <div className="flex w-full justify-end">
              <button
                className="mt-4 px-6 transition py-2 hover:opacity-80 bg-black text-white rounded"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartUpdate;