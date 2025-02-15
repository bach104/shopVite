import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../App/Home/Home";
import StoreName from "../App/store/StoreName1";
import Store from "../App/store/Store";
import Products from "../App/Shop/search/Products";
import InformationShop from "../App/informationShop/information";
import InformationAuth  from "../App/auth/Information"
import ShowProducts from "../App/Shop/view/showProducts";
import Login from "../components/Login";
import Register from "../components/Register";
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
            path: "/products/:idProducts",
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
    }
]);
export default router;