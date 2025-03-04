import { useState, useEffect } from "react";
import Search from "../../../components/SearchsearchBar";
import { useGetProductsQuery, useLazyGetProductsBySearchQuery } from "../../../redux/features/shop/productsApi";
import ProductCards from "../review/ProductCards";
import Btn from "../../../components/Btn";

const Products = () => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchSearchResults, { data: searchData, isLoading: searchLoading, error: searchError }] =
    useLazyGetProductsBySearchQuery();
  
  const { data, error, isLoading, refetch } = useGetProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
  }, { skip: searchQuery.length > 0 });

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults({ keyword: searchQuery, page: currentPage, limit: itemsPerPage });
    } else {
      refetch();
    }
  }, [searchQuery, currentPage, fetchSearchResults, refetch]); 

  const handleSearchResults = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const productsData = searchQuery ? searchData : data;
  const loadingState = searchQuery ? searchLoading : isLoading;
  const errorState = searchQuery ? searchError : error;

  return (
    <>
      <Search onResults={handleSearchResults} />
      <div className="section__container flex-col justify-between">
        <div>
          <h2 className="text-4xl text-center w-full rounded-ss-md rounded-se-md bg__header p-4 mb-3 font-bold">
            {searchQuery ? "Sản phẩm đã lọc" : "Tất cả sản phẩm"}
          </h2>
          {loadingState ? (
            <p className="text-center py-5">Đang tải sản phẩm...</p>
          ) : errorState ? (
            <p className="text-center py-5 text-red-500">Lỗi: {errorState.message || "Không thể tải dữ liệu."}</p>
          ) : (
            <>
              {searchQuery && (
                <button
                  onClick={() => handleSearchResults("")}
                  className="bg-gray-300 px-4 py-2 rounded mb-3"
                >
                  Quay lại danh sách
                </button>
              )}
              <div className="product-list min-h-[500px]">
                {productsData?.products?.length > 0 ? (
                  <ProductCards products={productsData.products} />
                ) : (
                  <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="pb-5 mx-auto">
          <Btn totalPages={productsData?.totalPages || 1} currentPage={currentPage} setCurrentPage={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default Products;
