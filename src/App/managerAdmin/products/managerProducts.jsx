import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../../redux/features/shop/productsApi";
import { Outlet, useNavigate } from "react-router-dom";
import AddProducts from "./addProducts";
import { getBaseUrl } from "../../../utils/baseURL";

const ManagerProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useGetProductsQuery({
    page: currentPage,
    limit: 20,
  });

  useEffect(() => {
    if (data?.products) {
      if (searchTerm.trim() === "") {
        setFilteredProducts(data.products);
        setIsSearching(false);
      } else {
        const filtered = data.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
        setIsSearching(true);
      }
    }
  }, [data, searchTerm]);

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setSearchTerm("");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setSearchTerm(""); 
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const totalPages = data?.totalPages || 1;
  const displayProducts = isSearching ? filteredProducts : data.products;

  return (
    <>
      <div className="Manager__display--Title flex justify-between">
        <h2 className="text-xl p-4">Quản lý sản phẩm</h2>
        <input
          type="text"
          id="search"
          className="w-1/3 p-2 mx-4 my-2 text-black rounded-md"
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="Manager__display--Box gap-6 p-4">
        {displayProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg">Không tìm thấy sản phẩm nào phù hợp</p>
          </div>
        ) : (
          displayProducts.map((product, index) => {
            const imageUrl = product.images[0]
              ? `${getBaseUrl()}/${product.images[0].replace(/\\/g, "/")}`
              : "https://via.placeholder.com/112";

            return (
              <nav key={index} className="Manager__display--product h-36 justify-between p-2">
                <div className="flex w-2/3 gap-2">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-32 w-32 object-cover border border-black rounded-s"
                  />
                  <div className="flex justify-between flex-col">
                    <p><b>Tên sản phẩm:</b> {product.name}</p>
                    <div>
                      <p>
                        <span>
                          <b>Giá bán:</b> {product.price.toLocaleString()}đ
                        </span>
                        {product.oldPrice && (
                          <s className="ml-3">{product.oldPrice.toLocaleString()}đ</s>
                        )}
                      </p>
                      <p>
                        <span><b>Số lượng:</b> {product.quantity}</span>
                        <span className="ml-3"><b>Đã bán:</b> {product.sold}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end h-full">
                  <button
                    className="flex bg-black bg-opacity-70 hover:bg-opacity-90 transition items-center text-white px-4 py-2 rounded-sm"
                    onClick={() => navigate(`products/${product._id}`)} 
                  >
                    Chi tiết sản phẩm
                  </button>
                </div>
              </nav>
            );
          })
        )}
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
          {currentPage < totalPages && !isSearching && (
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