const CartSummary = ({ totalQuantity, totalPrice, onClearSelection }) => {
    const price = Number(totalPrice) || 0;
    const shippingFee = price * 0.05;
    const finalAmount = price + shippingFee;

    return (
        <div className="mx-auto cart__Pay  p-2 mt-4 bg-black opacity-80 text-white rounded-lg">
            <div className="flex justify-between p-mobile flex-wrap items-center p-4 border-b border-gray-600">
                <div className="cart__techmoney mb-1">
                    <p>Số sản phẩm: <strong>{totalQuantity || 0}</strong></p>
                    <p>Phí ship: <strong>{isNaN(shippingFee) ? "0" : shippingFee.toLocaleString("vi-VN")} đ</strong></p>
                    <p>Thành tiền: <strong>{isNaN(finalAmount) ? "0" : finalAmount.toLocaleString("vi-VN")} đ</strong></p>
                </div>
                <button 
                    className="bg-white btn__mobile font-semibold text-black px-4 py-2 rounded-lg hover:opacity-80 transition"
                    onClick={onClearSelection} 
                >
                    Xóa tất cả đơn
                </button>
            </div>
            <div className="flex justify-between p-mobile items-center p-4">
                <p className="text-lg">Thanh toán</p>
                <button className="bg-white shadow-sm hover:opacity-80 px-4 text-2xl pb-2 rounded-lg">
                    💳
                </button>
                
            </div>
        </div>
    );
};

export default CartSummary;
