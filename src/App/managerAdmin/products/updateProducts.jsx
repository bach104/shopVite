import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useUpdateProductMutation } from "../../../redux/features/shop/productsApi";
import { getBaseUrl } from "../../../utils/baseURL";

const UpdateProducts = ({ product, onClose }) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    name: product.name,
    importPrice: product.importPrice,
    oldPrice: product.oldPrice || "",
    price: product.price,
    description: product.description,
    material: product.material,
    category: product.category,
    quantity: product.quantity,
    size: product.size.join(", "),
    color: product.color.join(", "),
    season: product.season,
    images: product.images,
    video: product.video || "",
  });
  const [newImages, setNewImages] = useState([]);
  const [newVideo, setNewVideo] = useState(null);
  const [error, setError] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customMaterial, setCustomMaterial] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "category" && value !== "Khác...") {
      setCustomCategory("");
    } else if (name === "material" && value !== "Khác...") {
      setCustomMaterial("");
    }
  };

 
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = formData.images.length + newImages.length + files.length;

   
    if (totalImages > 8) {
      setError("Bạn chỉ có thể tải lên tối đa 8 hình ảnh.");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    setError("");
  };

 
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setNewVideo(file);
  };

 
  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      const updatedNewImages = newImages.filter((_, i) => i !== index);
      setNewImages(updatedNewImages);
    } else {
      const updatedImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: updatedImages });
    }
  };

 
  const handleRemoveVideo = () => {
    setNewVideo(null);
    setFormData({ ...formData, video: "" });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        size: formData.size.split(",").map((s) => s.trim()),
        color: formData.color.split(",").map((c) => c.trim()),
      };

     
      if (formData.category === "Khác..." && customCategory) {
        updatedData.category = customCategory;
      }
      if (formData.material === "Khác..." && customMaterial) {
        updatedData.material = customMaterial;
      }

      const formDataToSend = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

     
      formDataToSend.append("existingImages", JSON.stringify(formData.images));
     
      newImages.forEach((file) => {
        formDataToSend.append("images", file);
      });

     
      if (newVideo) {
        formDataToSend.append("video", newVideo);
      } else if (formData.video === "") {
        formDataToSend.append("video", "");
      } else {
        formDataToSend.append("video", formData.video);
      }

      await updateProduct({ id: product._id, productData: formDataToSend });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

 
  const displayImages = [
    ...formData.images.map((img, index) => ({
      url: `${getBaseUrl()}/${img.replace(/\\/g, "/")}`,
      isNew: false,
      index,
    })),
    ...newImages.map((file, index) => ({
      url: URL.createObjectURL(file),
      isNew: true,
      index,
    })),
  ];

 
  const hasExistingVideo = formData.video && typeof formData.video === "string" && formData.video.trim() !== "";

 
  const displayVideo = newVideo
    ? URL.createObjectURL(newVideo)
    : hasExistingVideo
    ? `${getBaseUrl()}/${formData.video.replace(/\\/g, "/")}`
    : null;

 
  const isMaxImagesReached = displayImages.length >= 8;

  return (
    <div className="bg-gray-200 p-6 relative rounded-lg w-full max-w-4xl mx-auto">
      {/* Nút đóng form */}
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute text-2xl transition hover:opacity-60 top-4 right-4 cursor-pointer"
        onClick={onClose}
      />

      {/* Form cập nhật sản phẩm */}
      <form onSubmit={handleSubmit}>
        {/* Tên sản phẩm */}
        <label className="block font-semibold">Tên sản phẩm:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded mt-1"
          placeholder="Nhập tên cần thay đổi"
        />

        {/* Loại, chất liệu, mùa */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label className="font-semibold">Loại:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 rounded w-full"
            >
              <option value="Quần bò">Quần bò</option>
              <option value="Váy">Váy</option>
              <option value="Áo">Áo</option>
              <option value="Quần">Quần</option>
              <option value="Khác...">Khác...</option>
            </select>
            {formData.category === "Khác..." && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full p-2 rounded mt-2"
                placeholder="Nhập loại sản phẩm"
              />
            )}
          </div>

          <div className="flex-1">
            <label className="font-semibold">Chất Liệu:</label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="p-2 rounded w-full"
            >
              <option value="Vải">Vải</option>
              <option value="Kaki">Kaki</option>
              <option value="Cotton">Cotton</option>
              <option value="Khác...">Khác...</option>
            </select>
            {formData.material === "Khác..." && (
              <input
                type="text"
                value={customMaterial}
                onChange={(e) => setCustomMaterial(e.target.value)}
                className="w-full p-2 rounded mt-2"
                placeholder="Nhập chất liệu"
              />
            )}
          </div>

          <div className="flex-1">
            <label className="font-semibold">Mùa:</label>
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="p-2 rounded w-full"
            >
              <option value="Đông">Đông</option>
              <option value="Thu">Thu</option>
              <option value="Hạ">Hạ</option>
              <option value="Xuân">Xuân</option>
            </select>
          </div>
        </div>

        {/* Giá nhập, giá cũ, giá hiện tại, số lượng */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            name="importPrice"
            value={formData.importPrice}
            onChange={handleChange}
            className="p-2 rounded"
            placeholder="Giá nhập hàng"
          />
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="p-2 rounded"
            placeholder="Giá cũ"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 rounded"
            placeholder="Giá hiện tại"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="p-2 rounded"
            placeholder="Số lượng"
          />
        </div>

        {/* Mô tả sản phẩm */}
        <div className="mt-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded"
            placeholder="Mô tả sản phẩm"
          />
        </div>

        {/* Màu sắc */}
        <div className="mt-4">
          <label className="block font-semibold">Màu sắc:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 rounded"
            placeholder="Nhập màu sắc cách nhau bằng dấu phẩy"
          />
        </div>

        {/* Kích thước */}
        <div className="mt-4">
          <label className="block font-semibold">Kích thước:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 rounded"
            placeholder="Nhập size cách nhau bằng dấu phẩy"
          />
        </div>

        {/* Hiển thị hình ảnh */}
        <div className="mt-4">
          <label className="block font-semibold">Ảnh:</label>
          <div className="flex gap-4 flex-wrap">
            {displayImages.map((img, index) => (
              <div key={index} className="relative w-20 h-20 bg-gray-300 flex items-center justify-center rounded">
                <img
                  src={img.url}
                  alt={`Ảnh ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={() => handleRemoveImage(index, img.isNew)}
                >
                  &times;
                </button>
              </div>
            ))}
            {!isMaxImagesReached && (
              <label className="w-20 h-20 bg-gray-500 flex items-center justify-center rounded cursor-pointer">
                <span className="text-white text-2xl">+</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="mt-4">
          <label className="block font-semibold">Video:</label>
          <div className="">
            <div className="w-40 h-32 bg-gray-300 flex items-center justify-center rounded">
              {displayVideo ? (
                <video
                  src={displayVideo}
                  controls
                  className="h-full w-full object-cover rounded"
                />
              ) : (
                <p>Chưa có video</p>
              )}
            </div>
            <label className="bg-black text-white px-4 py-2 transition hover:opacity-60 opacity-80 rounded">
              {hasExistingVideo || newVideo ? "Thay đổi video" : "Thêm video"}
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </label>
            {(hasExistingVideo || newVideo) && (
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                onClick={handleRemoveVideo}
              >
                Xóa video
              </button>
            )}
          </div>
        </div>

        {/* Nút cập nhật */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 transition hover:opacity-60 opacity-80 mt-6 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProducts;