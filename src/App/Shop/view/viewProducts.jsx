import { toast } from 'react-toastify'; 
import { useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { addToCart } from '../../../redux/features/cart/cartSlice'; 

const ReviewProducts = () => {
  const location = useLocation();
  const product = location.state?.product;
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart.products);
  useEffect(() => {
    if (scrollRef.current) {
      setShowButtons(product?.images?.length > 4);
    }
  }, [product?.images]);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const addToCartHandler = () => {
    if (!selectedSize || !selectedColor) {
      toast.warning("Vui lòng chọn size và màu sắc trước khi thêm vào giỏ hàng!");
      return;
    }

    const existingItem = cartProducts.find(
      item => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingItem) {
      toast.info("Sản phẩm với size và màu sắc này đã có trong giỏ hàng!");
    } else {
      const newCartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
        quantity: quantity,
      };

      dispatch(addToCart(newCartItem)); 
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    }
  };

  if (!product) {
    return <div className="p-4">Không tìm thấy sản phẩm</div>;
  }

  const hasVideo = product.video && typeof product.video === "string" && product.video.trim() !== "";

  return (
    <div className="p-4 grid grid-cols-4 gap-6">
      <div className="flex col-span-2 flex-col">
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-xl font-mono">
          {hasVideo ? (
            <video controls className="h-full w-full object-cover">
              <source src={product.video} />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          ) : product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div>Không có hình ảnh</div>
          )}
        </div>

        <div className="relative w-full mt-2">
          {showButtons && (
            <button onClick={scrollLeft} className="absolute hover:opacity-60 opacity-80 left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md z-10">
              <i className="fa-solid fa-angle-left"></i>
            </button>
          )}
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto max-w-full whitespace-nowrap scroll-smooth no-scrollbar">
            {hasVideo && (
              <div className="h-28 w-36 flex-shrink-0">
                <video controls className="h-full w-full object-cover">
                  <source src={product.video} type="video/mp4" />
                </video>
              </div>
            )}
            {product.images.map((img, index) => (
              <div key={index} className="h-28 w-36 flex-shrink-0">
                <img src={img} alt={`Ảnh ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {showButtons && (
            <button onClick={scrollRight} className="absolute hover:opacity-60 opacity-80 right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md z-10">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          )}
        </div>

        <div className="flex items-end gap-4 mt-4">
          <span className="flex gap-1">
            {Array.from({ length: Math.round(product.starRatings.averageRating) }, (_, index) => (
              <i key={index} className="fa-solid fa-star text-3xl text-yellow-500"></i>
            ))}
          </span>
          <span className="px-2 py-1 text-sm rounded">
            Lượt đánh giá: {product.starRatings.totalReviews} đánh giá
          </span>
        </div>
        <button className="mt-4 bg-black max-w-32 text-center text-white px-4 py-2 rounded">
          Đánh giá
        </button>
      </div>

      <div className="col-span-2">
        <h2 className="text-3xl font-bold inline-block">{product.name}</h2>
        <p className="mt-2 text-lg font-bold">
          {product.price.toLocaleString("vi-VN")}đ{" "}
          <span className="text-gray-600 line-through text-sm">
            {product.oldPrice?.toLocaleString("vi-VN")}đ
          </span>
        </p>
        <div className="p-4">
          <h4 className="font-bold">Mô tả sản phẩm</h4>
          <div className="min-h-[140px] mx-2 mt-2 rounded">
            <p>{product.description}</p>
          </div>
          <div className="mt-4 flex items-end gap-4">
            <p className="text-sm font-semibold">Size:</p>
            <div className="flex gap-2 mt-1">
              {product.size.map((size) => (
                <button
                  key={size}
                  className={`border border-black px-2 py-0.5 rounded ${selectedSize === size ? 'bg-black text-white opacity-80' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-end gap-4">
            <p className="text-sm font-semibold">Màu sắc:</p>
            <div className="flex gap-2 mt-1">
              {product.color.map((color) => (
                <button
                  key={color}
                  className={`border border-black px-2 py-0.5 rounded ${selectedColor === color ? 'bg-black text-white opacity-80' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-center">
            <p className="text-sm font-semibold mr-2">Số lượng:</p>
            <div>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-black opacity-80 text-white w-6 rounded">-</button>
              <span className="mx-2">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="bg-black opacity-80 text-white w-6 rounded">+</button>
            </div>
          </div>
          <button className="mt-4 bg-black btn__add transition opacity-80 text-white px-6 py-2 rounded" onClick={addToCartHandler}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewProducts;
