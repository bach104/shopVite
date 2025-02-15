import { useEffect, useState } from "react";
import { useParams } from "react-router";
import products from "../../data/products.json";
import ProductCards from "../Shop/review/ProductCards";
import StoreBanner from "../../components/StoreBanner";
import Btn from "../../components/Btn";

const StoreName = () => {
  const { seasonName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.season.toLowerCase() === seasonName.toLowerCase()
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [seasonName]);

  if (filteredProducts.length === 0) {
    return <div>Không có sản phẩm nào cho mùa này.</div>;
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const selectedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <section className="store__container relative">
        <StoreBanner />
        <div className="absolute p-3 store__title top-10 left-10 z-40 rounded-md">
          <h4 className="text-5xl text-white">
            Thời trang mùa <span>{seasonName}</span>
          </h4>
          <p className="text-white mt-3">Hãy lựa chọn theo phong cách của bạn</p>
        </div>
      </section>

      <div className="section__container">
        <ProductCards products={selectedProducts} />
        <div className="mt-5 pb-10">
          <Btn totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
};

export default StoreName;
