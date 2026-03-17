import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLauout";

import Home from "./Pages/user/home/home";
import LoginForm from "./Pages/loign/login";
import SignupForm from "./Pages/signup/signup";
import AdminDashboard from "./Pages/admin/adminDashboard";
import AddProduct from "./Pages/admin/addProduct/addProduct";
import UpdateProduct from "./Pages/admin/updateProduct/updateProduct";
import Profile from "./Pages/user/profile/profile";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderManagement from "./Pages/admin/OrderManagement/OrderManagement";
import OrderHistory from "./Pages/user/orderHistory/OrderHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <>404 page not found</>,
    children: [
     
    ],
  },

  // ❌ Layout ke bahar
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignupForm /> },
   { index: true, element: <Home /> },
      { path: "AdminDashboard", element: <AdminDashboard /> },
      { path: "UpdateProduct/:id", element: <UpdateProduct /> },
      { path: "AddProduct", element: <AddProduct /> },
      { path: "Profile", element: <Profile/> },
      { path: "/checkOut", element: <CheckoutPage/> },
      { path: "/OrderManagement", element: <OrderManagement/> },
      { path: "/OrderHistory", element: <OrderHistory/> }
]);

export default router;