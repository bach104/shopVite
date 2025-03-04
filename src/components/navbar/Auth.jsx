import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/features/auth/authSlice";
import { resetCart } from "../../redux/features/cart/cartSlice";
import avatarImg from "../../assets/img/avatar.png";
import { getBaseUrl } from "../../utils/baseURL";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(resetCart());
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }, [dispatch, navigate]);

  const checkTokenExpiration = useCallback(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expirationTime, 10)) {
        handleLogout();
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedExpirationTime = localStorage.getItem("expirationTime");

      if (storedUser && storedToken && storedExpirationTime) {
        try {
          dispatch(setUser({ user: JSON.parse(storedUser) }));
        } catch (error) {
          console.error("Error parsing user from localStorage", error);
        }
      }
    }
  }, [user, dispatch]);

  const handleDropdownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const avatarUrl = user?.avatar
    ? `${getBaseUrl()}/${user.avatar.replace(/\\/g, "/")}`
    : avatarImg;

  const adminDropDownMenus = [
    { label: "Quản lý mục", path: "/dashboard/manage-products" },
    { label: "Tất cả đơn hàng", path: "/dashboard/manage-orders" },
    { label: "Thông tin cá nhân", path: "/informations" },
  ];
  const userDropDownMenus = [
    { label: "Thông tin cá nhân", path: "/informations" },
    { label: "Giỏ hàng của bạn", path: "/cart-manager" },
  ];
  const dropDownMenus = user?.role === "admin" ? adminDropDownMenus : userDropDownMenus;

  return (
    <>
      {user ? (
        <>
          <img
            onClick={handleDropdownToggle}
            className="size-7 rounded-full cursor-pointer"
            src={avatarUrl}
            onError={(e) => (e.target.src = avatarImg)}
            alt="Avatar"
          />
          {isDropDownOpen && (
            <div className="absolute w-48 border-black border-y border-x top-10 right-0 bg-white p-2 rounded-lg shadow-lg z-50">
              <ul className="font-medium">
                {dropDownMenus.map((menu, index) => (
                  <li key={index} className="border-b-2">
                    <Link
                      onClick={() => setIsDropDownOpen(false)}
                      className="dropdown-items px-2 hover:bg-gray-200 py-3 block"
                      to={menu.path}
                    >
                      {menu.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    className="dropdown-items px-2 hover:bg-gray-200 py-3 w-full text-left"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link to="/login">
          <User className="w-5 h-5 cursor-pointer" />
        </Link>
      )}
    </>
  );
};

export default Auth;