import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateProducts = ({ onClose }) => { 
  return (
    <div className="bg-gray-200 p-6 relative rounded-lg w-full max-w-4xl mx-auto">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute text-2xl transition hover:opacity-60 top-4 right-4 cursor-pointer"
        onClick={onClose} 
      />
      <label className="block font-semibold">Tên sản phẩm:</label>
      <input type="text" className="w-full p-2 rounded mt-1" placeholder="Nhập tên cần thay đổi" />
      
      <div className="flex gap-4 mt-4">
        <div className="">
          <label className="font-semibold">Loại:</label>
          <select className="p-2 rounded w-full">
            <option>Lựa chọn</option>
            <option>Quần bò</option>
            <option>Váy</option>
            <option>Áo</option>
            <option>Quần</option>
            <option>Khác...</option>
          </select>
        </div>
        <div className="">
          <label className="font-semibold">Chất Liệu:</label>
          <select className="p-2 rounded w-full">
            <option>Lựa chọn</option>
            <option>Vải</option>
            <option>Kaki</option>
            <option>Cotton</option>
            <option>Khác...</option>
          </select>
        </div>
        <div className="">
          <label className="font-semibold">Mùa:</label>
          <select className="p-2 rounded w-full">
            <option>Lựa chọn</option>
            <option>Đông</option>
            <option>Thu</option>
            <option>Hạ</option>
            <option>Xuân</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input type="text" className="p-2 rounded" placeholder="Giá nhập hàng" />
        <input type="text" className="p-2 rounded" placeholder="Giá cũ" />
        <input type="text" className="p-2 rounded" placeholder="Giá hiện tại" />
        <input type="text" className="p-2 rounded" placeholder="Số lượng" />
      </div>
      
      <div className="mt-4">
        <textarea className="w-full p-2 rounded" placeholder="Mô tả sản phẩm"></textarea>
      </div>
      
      <div className="mt-4">
        <label className="block font-semibold">Màu sắc:</label>
        <input type="text" className="w-full p-2 rounded" placeholder="Nhập màu sắc cách nhau bằng dấu phẩy" />
      </div>
      
      <div className="mt-4">
        <label className="block font-semibold">Kích thước:</label>
        <input type="text" className="w-full p-2 rounded" placeholder="Nhập size cách nhau bằng dấu phẩy" />
      </div>
      
      <div className="mt-4">
        <label className="block font-semibold">Ảnh:</label>
        <div className="flex gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-20 h-20 bg-gray-500 flex items-center justify-center rounded">
              <span className="text-white text-2xl">+</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block font-semibold">Video:</label>
        <div className="w-32 h-20 bg-gray-500 flex items-center justify-center rounded">
          <span className="text-white">Video</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-black text-white px-4 py-2 transition hover:opacity-60 opacity-80 mt-6 rounded">
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default UpdateProducts;