import img3 from "../../assets/img/information1.jpg";

const ContactInformation = () => {
    return (
      <div className="section__container">
        <div className="section__body">
            <h2 className="w-full p-4 section__header bg-gray-400">Thông tin liên hệ</h2>
            <div className="grid p-4 rounded-md gap-5 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <div className="order-2 lg:order-none">
                <h2 className="w-full font-bold text-xl mt-4 md:mt-0">Liên hệ với chúng tôi</h2>
                <p className="text-justify mt-3">
                    Nếu bạn có bất kỳ câu hỏi hay cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua các phương thức dưới đây. 
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
                </p>
                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                    <h3 className="text-blue-600 font-bold text-lg">📞 Điện thoại</h3>
                    <p className="text-sm mt-2">
                    <a href="tel:0334990877" className="text-blue-500 underline">0334.990.877</a>
                    </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                    <h3 className="text-green-600 font-bold text-lg">📍 Địa chỉ</h3>
                    <p className="text-sm mt-2">
                    <a href="https://maps.google.com/?q=97+Đình+Thôn,+Mỹ+Đình+1,+Hà+Nội" 
                        target="_blank" 
                        className="text-green-500 underline">
                        97 Đình Thôn, Mỹ Đình 1, Hà Nội
                    </a>
                    </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                    <h3 className="text-red-500 font-bold text-lg">✉️ Email</h3>
                    <p className="text-sm mt-2">
                    <a href="mailto:havanhung10a2@gmail.com" className="text-red-500 underline">
                        havanhung10a2@gmail.com
                    </a>
                    </p>
                </div>
                <div className="mt-5">
                    <h3 className="text-purple-600 font-bold text-lg">🌐 Kết nối mạng xã hội</h3>
                    <ul className="mt-2 space-y-2">
                    <li>📘 Facebook: <a href="https://shoponline.fb.com" className="text-blue-500 underline">Shoponline.fb.com</a></li>
                    <li>📸 Instagram: <a href="https://shoponline.ig.com" className="text-pink-500 underline">Shoponline.ig.com</a></li>
                    <li>🎵 TikTok: <a href="https://shoponline.tiktok.com.vn" className="text-black underline">Shoponline.tiktok.com.vn</a></li>
                    </ul>
                </div>
                </div>
                <div className="w-full h-90 order-1 lg:order-none">
                <img src={img3} alt="Thông tin liên hệ" className="object-cover h-full w-full rounded-md" />
                </div>
                
            </div>
        </div>
      </div>
  );
};

export default ContactInformation;
