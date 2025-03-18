import { useState } from "react";
import { useGetProductsQuery } from "../../../redux/features/shop/productsApi";
import { Outlet, useNavigate } from "react-router-dom";
import AddProducts from "./addProducts";
import { getBaseUrl } from "../../../utils/baseURL";

const ManagerProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsQuery({
    page: currentPage,
    limit: 20,
  });

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="Manager__display--Title flex justify-between">
        <h2 className="text-xl p-4">Quản lý sản phẩm</h2>
        <input
          type="text"
          id="search"
          className="w-1/3 p-2 mx-4 my-2 text-black rounded-md"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>
      <div className="Manager__display--Box gap-6 p-4">
        {data?.products.map((product, index) => {
          const imageUrl = product.images[0]
            ? `${getBaseUrl()}/${product.images[0].replace(/\\/g, "/")}`
            : "https://via.placeholder.com/112";

          return (
            <nav key={index} className="Manager__display--product h-36 justify-between p-2">
              <div className="flex gap-2">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-32 w-32 object-cover border border-black rounded-s"
                />
                <div className="flex justify-between flex-col">
                  <p><b>Tên sản phẩm:</b>{product.name}</p>
                  <div>
                    <p>
                      <span>
                        <b>Giá bán:</b> {product.price}đ
                      </span>
                      <s className="ml-3">{product.oldPrice}đ</s>
                    </p>
                    <p>
                      <span><b>Số lượng:</b>{product.quantity}</span>
                      <span className="ml-3"><b>Đã bán:</b>{product.sold}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-end h-full">
                <button
                  className="flex bg-black bg-opacity-70 hover:bg-opacity-90 transition h-12 items-center w-40 text-white px-4 py-2 rounded-sm"
                  onClick={() => navigate(`/admin-manager/products/${product._id}`)} // Sửa đường dẫn điều hướng
                >
                  Chi tiết sản phẩm
                </button>
              </div>
            </nav>
          );
        })}
      </div>
      <div className="flex bg-black opacity-70 justify-between p-2 gap-2">
        <button
          className="text-white px-4 py-2 rounded-sm"
          onClick={() => setShowAddProduct(true)}
        >
          Thêm sản phẩm
        </button>
        <div className="flex gap-2">
          {currentPage > 1 && (
            <button
              className="bg-white font-bold shadow-md px-4 py-2 rounded-md hover:opacity-90 transition text-black"
              onClick={handlePreviousPage}
            >
              Quay lại trang trước
            </button>
          )}
          {currentPage < totalPages && (
            <button
              className="bg-white font-bold shadow-md px-4 py-2 rounded-md hover:opacity-90 transition text-black"
              onClick={handleNextPage}
            >
              Trang kế tiếp
            </button>
          )}
        </div>
      </div>
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddProducts onClose={handleCloseAddProduct} />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default ManagerProducts;