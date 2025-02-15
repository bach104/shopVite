import { useState, useEffect, useMemo } from "react";
import ProductCards from "../review/ProductCards";
import Btn from "../../../components/Btn";
import Search from "../../../components/search";
import products from "../../../data/products.json";

const Products = () => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSearching, setIsSearching] = useState(false); 

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleSearchResults = (results) => {
    setFilteredProducts(results);
    setIsSearching(results.length !== products.length); 
  };

  const handleReset = () => {
    setFilteredProducts(products);
    setCurrentPage(1);
    setIsSearching(false); 
  };

  return (
    <>
      <Search onResults={handleSearchResults} />
      <div className="section__container rounded-md">
        <h2 className="text-4xl text-center w-full rounded-ss-md rounded-se-md  bg__header p-4 mb-3 font-bold">
          Tất cả sản phẩm
        </h2>

        {isSearching && (
          <button
            onClick={handleReset}
            className="bg-gray-300 px-4 py-2 rounded mb-3"
          >
            Quay lại
          </button>
        )}

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">Không tìm thấy sản phẩm nào.</p>
        ) : (
          <div className="">
              <ProductCards products={displayedProducts} />
              <div className="pb-5"> 
                <Btn totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </div>
          </div>
                
        )}
      </div>
    </>
  );
};

export default Products;
