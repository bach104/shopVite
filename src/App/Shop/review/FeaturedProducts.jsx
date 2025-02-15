import ProductCards from "./ProductCards";
import products from "../../../data/products.json";
import { Link } from "react-router";
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const FeaturedProducts = () => {
  const topRatedProducts = shuffleArray(
    products
      .filter((product) => (product.starRatings?.averageRating || 0) >= 4)
      .sort((a, b) => (b.starRatings?.averageRating || 0) - (a.starRatings?.averageRating || 0))
  ).slice(0, 10);
  return (
    <section className="section__container bg-primary-gray product__container">
      <h2 className="section__header pt-10">Sản phẩm nổi bật</h2>
      <div className="products__wrapper">
        <ProductCards products={topRatedProducts} />
      </div>
      <div className="mt-5 pb-10">
        <Link to="/store" className="btn__seemore hover:opacity-90 m-auto text-center block w-56 transition  text-white">Xem thêm sản phẩm</Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;