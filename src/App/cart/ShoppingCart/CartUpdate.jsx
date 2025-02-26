import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../../assets/img/category1.png";

const CartUpdate = ({ onClose }) => {
    return (
        <div className="cart__container p-2">
            <div className="cart__update p-6 border relative rounded-lg shadow-md bg-white">
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className="absolute transition text-2xl hover:scale-125 top-4 right-4 cursor-pointer"
                    onClick={onClose}
                />
                <h2 className="text-xl font-semibold mb-4">Cập nhật</h2>
                <div className="flex cart__wrap gap-6">
                    <img src={image} alt="Áo mùa đông" className="w-60 h-60 block object-cover rounded-lg border" />
                    <div className="flex flex-col flex-1 gap-3">
                        <p className="text-lg font-medium">Tên sản phẩm: Áo mùa đông</p>
                        <div className="flex items-center flex-wrap gap-2">
                            <span className="font-medium">Kích thước:</span>
                            <button className="px-3 py-1 border rounded bg-black text-white">X</button>
                            <button className="px-3 py-1 border rounded bg-gray-200">XL</button>
                            <button className="px-3 py-1 border rounded bg-gray-200">2XL</button>
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                            <span className="font-medium">Màu sắc:</span>
                            <button className="px-3 py-1 border rounded bg-black text-white">Xanh</button>
                            <button className="px-3 py-1 border rounded bg-gray-200">Vàng</button>
                            <button className="px-3 py-1 border rounded bg-gray-200">Trắng</button>
                            <button className="px-3 py-1 border rounded bg-gray-200">Đen</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Số lượng:</span>
                            <button className="px-2 py-1 border rounded">−</button>
                            <span>1</span>
                            <button className="px-2 py-1 border rounded">+</button>
                        </div>
                        <div className="flex w-full justify-end">
                            <button className="mt-4 px-6 transition py-2 hover:opacity-80 bg-black text-white rounded">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartUpdate;
