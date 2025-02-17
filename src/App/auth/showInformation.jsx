
const showInformation = () => {
  return (
      <>
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
      </>
  )
}

export default showInformation