import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layout/MainLauout"
import AdminDashboard from "./Pages/admin/adminDashboard"
import Home from "./Pages/user/home/home"
import LoginForm from "./Pages/loign/login"
import SignupForm from "./Pages/signup/signup"
import AddProduct from "./Pages/admin/addProduct/addProduct"
import UpdateProduct from "./Pages/admin/updateProduct/updateProduct"


const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout />,
        errorElement:<>404 page not found</>,
        children:[
            {index:true, element: <Home />},
            {path:"login", element: <LoginForm/>},
            {path:"signup", element:<SignupForm />},
            {path:"AdminDashboard", element:<AdminDashboard />},
            
            {path:"UpdateProduct/:id", element:<UpdateProduct />},
            {path:"AddProduct", element:<AddProduct />}
        ],
    },
])


export default router;



// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "./layout/MainLauout";
// import LoginForm from "./containers/loign/login";
// import SignupForm from "./containers/signup/signup";
// import Home from "./containers/home/home";

// import ProtectedRoute from "./components/ProtectedRoute";
// import RoleRoute from "./components/RoleRoute";

// import Dashboard from "./containers/dashboard/Dashboard";
// import AddProduct from "./containers/product/AddProduct";
// import ManageProduct from "./containers/product/ManageProduct";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <>404 page not found</>,
//     children: [
//       { index: true, element: <Home /> },

//       { path: "login", element: <LoginForm /> },
//       { path: "signup", element: <SignupForm /> },

//       // 🔒 Protected Route (sirf login user)
//       {
//         path: "dashboard",
//         element: (
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         ),
//       },

//       // 🔥 Admin Only
//       {
//         path: "addProduct",
//         element: (
//           <RoleRoute allowedRoles={["admin"]}>
//             <AddProduct />
//           </RoleRoute>
//         ),
//       },

//       // 🔥 Admin + Manager
//       {
//         path: "manageProduct",
//         element: (
//           <RoleRoute allowedRoles={["admin", "manager"]}>
//             <ManageProduct />
//           </RoleRoute>
//         ),
//       },
//     ],
//   },
// ]);

// export default router;