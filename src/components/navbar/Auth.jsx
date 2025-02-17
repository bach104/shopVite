import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import avatarImg from "../../assets/img/avatar.png";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  
  const handleDropdownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const adminDropDownMenus = [
    { label: "Bảng điều khiển", path: "/dashboard/admin" },
    { label: "Quản lý mục", path: "/dashboard/manage-products" },
    { label: "Tất cả đơn hàng", path: "/dashboard/manage-orders" },
    { label: "Thêm bài đăng mới", path: "/dashboard/add-new-post" },
  ];
  
  const userDropDownMenus = [
    { label: "Bảng điều khiển", path: "/dashboard/dashboard" },
    { label: "Hồ sơ", path: "/dashboard/profile" },
    { label: "Thanh toán", path: "/dashboard/payments" },
    { label: "Đơn hàng", path: "/dashboard/orders" },
  ];
  
  const dropDownMenus = user?.isAdmin ? adminDropDownMenus : userDropDownMenus;

  return (
    <>
      {user ? (
        <>
         <img
            onClick={handleDropdownToggle}
            className="size-7 rounded-full cursor-pointer"
            src={user?.avatar && user.avatar !== "" ? user.avatar : avatarImg}
            onError={(e) => (e.target.src = avatarImg)} 
            alt="Avatar"
          />
          {isDropDownOpen && (
            <div className="absolute w-48 top-10 right-0 bg-white p-4 mt-3 border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="font-medium space-y-4 p-2">
                {dropDownMenus.map((menu, index) => (
                  <li key={index}>
                    <Link
                      onClick={() => setIsDropDownOpen(false)}
                      className="dropdown-items"
                      to={menu.path}
                    >
                      {menu.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    className="dropdown-items w-full text-left"
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
