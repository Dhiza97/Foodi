import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import ProfileUpdate from "../pages/dashboard/ProfileUpdate";
import CartPage from "../pages/shop/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <PrivateRouter><Menu /></PrivateRouter>,
      },
      {
        path: "/cart-page",
        element: <CartPage/>,
      },
      {
        path: "/update-profile",
        element: <ProfileUpdate/>
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup/>,
  }
]);

export default router;
