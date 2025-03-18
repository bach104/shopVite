import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../redux/features/shop/productsApi";
import UpdateProducts from "./updateProducts";

const InformationProducts = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const [showUpdateProducts, setShowUpdateProducts] = useState(false);

  const handleEdit = () => {
    setShowUpdateProducts(true);
  };

  const handleSave = (updatedProduct) => {
    console.log("Thông tin sản phẩm đã cập nhật:", updatedProduct);
    setShowUpdateProducts(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  const images = product.images || [];
  const colors = product.color || [];
  const sizes = product.size || [];
  const video = product.video?.[0] || null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="relative w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute top-4 right-4 cursor-pointer text-2xl hover:opacity-50 transition"
            onClick={() => window.history.back()}
          />
          <h2 className="text-xl font-semibold">Tên sản phẩm: {product.name}</h2>

          <div className="mt-4">
            <p className="font-semibold">Ảnh</p>
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, index) => (
                <div key={index} className="w-32 h-32 bg-gray-300 flex items-center justify-center">
                  {img ? (
                    <img
                      src={img}
                      alt={`Ảnh ${index}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "+"
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Video:</p>
            <div className="w-40 h-32 bg-gray-300 flex items-center justify-center">
              {video ? (
                <video controls className="w-full h-full object-cover">
                  <source src={video} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              ) : (
                "+"
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <p><strong>Loại:</strong> {product.category}</p>
            <p><strong>Mùa:</strong> {product.season}</p>
            <p><strong>Chất liệu:</strong> {product.material}</p>
          </div>
          <div className="mt-4">
            <p><strong>Giá nhập:</strong> {product.importPrice}đ</p>
            <p><strong>Giá cũ:</strong> {product.oldPrice ? `${product.oldPrice}đ` : "Không có"}</p>
            <p><strong>Giá:</strong> {product.price}đ</p>
          </div>

          <div className="mt-4">
            <p><strong>Mô tả:</strong> {product.description}</p>
          </div>

          <div className="mt-4">
            <p><strong>Số lượng:</strong> {product.quantity}</p>
            <p><strong>Đã bán:</strong> {product.sold}</p>
          </div>

          <div className="mt-4">
            <p><strong>Màu sắc:</strong> {colors.join(", ")}</p>
          </div>

          <div className="mt-4">
            <p><strong>Kích thước:</strong> {sizes.join(", ")}</p>
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