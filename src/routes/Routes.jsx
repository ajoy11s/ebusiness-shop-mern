import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import AllProducts from '../components/AllProducts';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../Layout/DashboardLayout'
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
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: []
    }
]);

export default router;