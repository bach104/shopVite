import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import UpdateProducts from "./updateProducts";

const InformationProducts = ({ onClose }) => {
  const [product] = useState({
    name: "Áo màu đông",
    images: ["", "", "", "", ""],
    video: "",
    category: "Váy thun",
    season: "Đông",
    material: "Vải",
    importPrice: "340.000đ",
    oldPrice: "415.000đ",
    price: "400.000đ",
    description:
      "Là một chuyên gia ASO, bạn sẽ muốn sử dụng các mô tả ngắn để thúc đẩy các từ khóa quan trọng của mình nhằm cải thiện thứ hạng và tăng tỷ lệ chuyển đổi. Kết hợp với ảnh chụp màn hình, bạn sẽ có rất nhiều cơ hội để đạt được những mục tiêu đó.",
    quantity: 1000,
    colors: ["Xanh", "Đỏ", "Tím", "Vàng"],
    sizes: ["X", "XL", "2XL"],
  });

  const [showUpdateProducts, setShowUpdateProducts] = useState(false); // State để hiển thị UpdateProducts

  const handleEdit = () => {
    setShowUpdateProducts(true);
  };

  const handleSave = (updatedProduct) => {
    console.log("Thông tin sản phẩm đã cập nhật:", updatedProduct);
    setShowUpdateProducts(false); 
  };

  return (
    <>
      <div className="max-w-3xl mx-auto relative bg-gray-100 p-6 rounded-lg shadow-md">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-4 right-4 cursor-pointer text-2xl hover:opacity-50 transition"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold">Tên sản phẩm: {product.name}</h2>
        <div className="mt-4">
          <p className="font-semibold">Ảnh</p>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <div key={index} className="w-32 h-32 bg-gray-300 flex items-center justify-center">+</div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Video:</p>
          <div className="w-40 h-32 bg-gray-300 flex items-center justify-center">+</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <p><strong>Loại:</strong> {product.category}</p>
          <p><strong>Mùa:</strong> {product.season}</p>
          <p><strong>Chất liệu:</strong> {product.material}</p>
        </div>
        <div className="mt-4">
          <p><strong>Giá nhập:</strong> {product.importPrice} <strong className="ml-2">Giá cũ:</strong> {product.oldPrice} <strong className="ml-2">Giá:</strong> {product.price}</p>
        </div>
        <div className="mt-4">
          <p><strong>Mô tả:</strong> {product.description}</p>
        </div>
        <div className="mt-4">
          <p><strong>Số lượng:</strong> {product.quantity}</p>
        </div>
        <div className="mt-4">
          <p><strong>Màu sắc:</strong> {product.colors.join(", ")}</p>
        </div>
        <div className="mt-4">
          <p><strong>Kích thước:</strong> {product.sizes.join(", ")}</p>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-6 px-4 py-2 bg-black text-white rounded"
            onClick={handleEdit} 
          >
            Sửa thông tin
          </button>
        </div>
      </div>

      {showUpdateProducts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <UpdateProducts
            product={product} 
            onClose={() => setShowUpdateProducts(false)} 
            onSave={handleSave} 
          />
        </div>
      )}
    </>
  );
};

export default InformationProducts;