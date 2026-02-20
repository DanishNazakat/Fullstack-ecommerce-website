import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layout/MainLauout"
import LoginForm from "./containers/loign/login"
import SignupForm from "./containers/signup/signup"
import Home from "./containers/home/home"



const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout />,
        errorElement:<>404 page not found</>,
        children:[
            {index:true, element: <Home />},
            {path:"login", element: <LoginForm />},
            {path:"signup", element:<SignupForm />}
        ],
    },
])


export default router;