import { Link } from "react-router";
import introduce1 from "../../assets/img/introduce1.jpg"
import introduce2 from "../../assets/img/introduce2.jpg"
import introduce3 from "../../assets/img/introduce3.jpg"
const Introduce = () => {
  return (
    <section className="grid bg-primary-gray introduce__grid rounded-md md:grid-cols-3 grid-cols-3">
      <div className="col-span-2 gap-6 pt-8 pl-8 pr-4 pb-4">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <img src={introduce1} alt="" className="h-60 col-span-2" />
          <img src={introduce2} alt="" className="h-60"/>
        </div>
        <p className="mt-6 indent-10  text-justify font__text">
          Shoponline không chỉ mang đến trang phục mà còn là cách thể hiện cá tính, phong cách và xu hướng của giới trẻ hiện đại. Với sự sáng tạo không ngừng, thời trang dành cho giới trẻ luôn thay đổi theo từng mùa, từ những thiết kế năng động, cá tính đến phong cách thanh lịch, tối giản. Các thương hiệu thời trang ngày càng chú trọng đến chất liệu, kiểu dáng và màu sắc để đáp ứng nhu cầu đa dạng của giới trẻ. Bên cạnh đó, xu hướng thời trang bền vững cũng ngày càng được quan tâm, giúp các bạn trẻ không chỉ đẹp mà còn góp phần bảo vệ môi trường.
        </p>
      </div>
      <div className="flex flex-col bg-white gap-6 pt-8 pl-8 pr-4 pb-4 ">
        <h4 className="text-5xl w-48 text-gray-900  mb-4">Giới thiệu <br />về shop</h4>
        <Link to="/introduce" className="bg-black hover:opacity-90 w-40 transition text-center btn__seemore text-white px-4 py-2 text-sm">Giới thiệu thêm</Link>
        <img src={introduce3} alt="" className="h-60 mt-6 -mb-4"/>
      </div>
    </section>
  );
};

export default Introduce;
