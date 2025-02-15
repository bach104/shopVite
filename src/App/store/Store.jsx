import { useState } from "react";
import StoreBanner from "../../components/StoreBanner";
import ProductCards from "../Shop/review/ProductCards";
import products from "../../data/products.json";
import Btn from "../../components/Btn";
import Filter from "../../components/Filter";

const Store = () => {
  const [filters, setFilters] = useState({
    material: new Set(),
    category: new Set(),
    season: new Set(),
    priceRange: { min: "", max: "" },
  });

  const applyFilters = (product) => {
    const materialMatch = filters.material.size === 0 || filters.material.has(product.material?.trim().toLowerCase());
    const categoryMatch =
      filters.category.size === 0 ||
      Array.from(filters.category).some((category) => product.category?.toLowerCase().includes(category.toLowerCase()));
    const seasonMatch = filters.season.size === 0 || filters.season.has(product.season?.trim().toLowerCase());
    const priceMatch =
      (filters.priceRange.min === "" || product.price >= parseFloat(filters.priceRange.min)) &&
      (filters.priceRange.max === "" || product.price <= parseFloat(filters.priceRange.max));

    return materialMatch && categoryMatch && seasonMatch && priceMatch;
  };

  const filteredProducts = products.filter(applyFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <>
      <section className="store__container relative">
        <StoreBanner />
        <div className="absolute p-3 store__title top-10 left-10 z-40 rounded-md">
          <h4 className="text-5xl text-white">Cửa hàng</h4>
          <p className="text-white mt-3">Hãy lựa chọn theo phong cách của bạn</p>
        </div>
      </section>
      <div className="flex gap-4 p-4 section__container rounded-md">
        <Filter filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <div className="bg__header p-4">
            <h4>Danh sách sản phẩm</h4>
          </div>
          <div className="store__list">
            <ProductCards products={paginatedProducts} gridCols="grid grid-cols-1 pt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" />
          </div>
          <Btn totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
};

export default Store;