
const Information = () => {
  return (
    <div className="mt-20 informationAuth">
      <div className="bg-gray-200 boxContainer p-4 text-center font-bold">
        <h2>Thông tin cá nhân</h2>
      </div>
          <div className="mt-5">
            <div className="mt-4 boxContainer grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center bg-slate-200 col-span-1">
                    <div className="w-40 mt-4 h-40 bg-gray-400 flex items-center justify-center rounded-full">
                        <span className="text-4xl">+</span>
                    </div>
                    <p className="mt-2">Avatar</p>
                </div>
                <div className="col-span-2">
                    <p><strong>Tên cá nhân:</strong> Hà Hưng</p>
                    <p><strong>Địa chỉ:</strong> Nhà 53, Bãi Kình, Phú Lương, Thái Nguyên</p>
                    <p><strong>Số điện thoại:</strong> 0334.990.877</p>
                    <p><strong>Email:</strong> havanhung12a2@gmail.com</p>
                </div>
            </div>
        </div>
        <div className=" pt-5 boxContainer text-center font-bold">
            <h2 className="bg-gray-200 p-4">
                Cập nhật,sửa thông tin
            </h2>
        </div>
      <div className="boxContainer pb-10">
        <form className="space-y-4 p-5 bg-gray-200 mt-4">
          <div className="flex items-center">
            <label className="w-1/6">Avatar:</label>
            <input type="file" className="w-2/6 bg-gray-100 p-2" />
          </div>
          <div className="flex items-center">
            <label className="w-1/6">Tên cá nhân:</label>
            <input type="text" className="w-2/6 bg-gray-100 p-2" />
          </div>
          <div className="flex items-center">
            <label className="w-1/6">Địa chỉ:</label>
            <input type="text" className="w-2/6 bg-gray-100 p-2" />
          </div>
          <div className="flex items-center">
            <label className="w-1/6">Số điện thoại:</label>
            <input type="text" className="w-2/6 bg-gray-100 p-2" />
          </div>
          <div className="flex items-center">
            <label className="w-1/6">Email:</label>
            <input type="email" className="w-2/6 bg-gray-100 p-2" />
          </div>
          <div className="w-full flex justify-end">
             <button className="btn__seemore transition text-white px-4 py-2 mt-3">Cập nhật thông tin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;