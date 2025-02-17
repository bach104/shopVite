
const updateInformation = () => {
  return (
      <>
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
      </>
  )
}

export default updateInformation