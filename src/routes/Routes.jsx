import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import AllProducts from '../components/AllProducts';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../Layout/DashboardLayout'
import MainLayout from "../Layout/MainLayout";
import ProductList from "../sidebarmenu/Products/ProductList";
import UserList from "../sidebarmenu/Users/UserList";
import CategoryList from "../sidebarmenu/Category/CategoryList"

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
        children: [
            {
                path: "/dashboard/categorylist",
                element: <CategoryList />,
            },
            {
                path: "/dashboard/productlist",
                element: <ProductList />,
            },
            {
                path: "/dashboard/userlist",
                element: <UserList />,
            }
        ]
    }
]);

export default router;