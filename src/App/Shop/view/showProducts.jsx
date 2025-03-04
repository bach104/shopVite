import ViewProducts from "./viewProducts";

const ShowProducts = () => {
  return (
    <div className="grid max-width">
      <h2 className="text-2xl text-center w-full font-bold bg-slate-200 p-4">
        Thông tin sản phẩm
      </h2>
      <ViewProducts />
    </div>
  );
};
export default ShowProducts;
