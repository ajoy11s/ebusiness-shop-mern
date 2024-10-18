import App from "../App";
import Login from '../components/Login'
import AllProducts from '../components/AllProducts'
import PrivateRoute from './PrivateRoute'

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        //errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/allproducts",
                element: <PrivateRoute>
                    <AllProducts />
                </PrivateRoute>,
            }
        ]
    },
]);

export default router;