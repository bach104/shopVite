import { Search, User} from "lucide-react";

import { Link } from "react-router";
import Shoppingcart from "./Shoppingcart";

const Navbar = () => {
  return (
      <header className="header z-10 bg-white">
          <nav className=" 
          max-w-screen-2xl
          mx-auto
          px-4
          flex
          items-center
          justify-between
          ">
              <nav className="nav__logo">
                <Link className="transition" to="/">Shoponline</Link>
              </nav>
              <ul className="nav__links">
                <li>
                    <Link className=" hover:text-gray-400  transition" to="/">
                    Trang chủ
                    </Link>
                </li>
                <li>
                    <Link className=" hover:text-gray-400  transition " to="/store">
                    Cửa hàng
                    </Link>
                </li>
                <li>
                    <Link className=" hover:text-gray-400  transition " to="/products">
                    Sản phẩm
                    </Link>
                </li>
                <li>
                    <Link className=" hover:text-gray-400  transition " to="/introduce">
                    Giới thiệu
                    </Link>
                </li>
              </ul>
              <div className="flex space-x-4">
                  <span>
                    <Link className="hover:text-gray-400  transition" to="/products">
                        <Search className="w-5 h-5 cursor-pointer" />
                    </Link>
                  </span>
                  <span className="relative">
                      <Shoppingcart/>
                  </span>
                  <span>
                    <Link className="hover:text-gray-400  transition" to="/Login">
                        <User className="w-5 h-5 cursor-pointer" />
                    </Link>
                  </span>
            </div>
        </nav>
    </header>
  );
};

export default Navbar;
