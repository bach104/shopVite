import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../App/Home/Home";
import StoreName from "../App/store/Season";
import Store from "../App/store/Store";
import Products from "../App/Shop/search/Products";
import InformationShop from "../App/informationShop/information";
import InformationAuth  from "../App/auth/Information"
import ShowProducts from "../App/Shop/view/showProducts";
import Login from "../components/Login";
import Register from "../components/Register";
import CartManager from "../components/CartNavbar";
import ShoppingCart from "../App/cart/ShoppingCart/ShoppingCart";
import Confirmation from "../App/cart/confirmation/Confirmation";
import Delivery from "../App/cart/delivery/Delivery";
import Delivered from "../App/cart/delivered/Delivered";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element:<Home/>
        },
        {
            path: "/store/:seasonName",
            element: <StoreName />,
        },
        {
            path: "/store",
            element: <Store />,
        },
        {
            path: "/store",
            element: <Store />,
        },
        {
            path: "/products",
            element: <Products />,
        },
        {
            path: "/products/:id",
            element: <ShowProducts/>,
        },
        {
            path: "/introduce",
            element: <InformationShop />,
        },
        {
            path: "/informations",
            element: <InformationAuth />,
        },
       
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
    path: "/cart-manager",
    element: <CartManager />, 
    children: [
      { path: "", element: <ShoppingCart /> }, 
      { path: "confirmation", element: <Confirmation /> },
      { path: "delivery", element: <Delivery /> },
      { path: "delivered", element: <Delivered /> },
    ],
  },
]);
export default router;