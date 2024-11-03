import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";







const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>,
        // element: <Home/>,
    },
    {
        path: "/signup",
        element: <PublicRoute><Signup/></PublicRoute>
        // element: <Signup/>
    },
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>
        // element: <Login/>
    },
   


]);
export default function Routing(params) {
    return (
        <RouterProvider router={router} />
    )
}