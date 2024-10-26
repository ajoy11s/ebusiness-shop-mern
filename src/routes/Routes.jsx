import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import AllProducts from '../components/AllProduct/AllProducts';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../Layout/DashboardLayout';
import MainLayout from "../Layout/MainLayout";
import ProductList from "../sidebarmenu/Products/ProductList";
import UserList from "../sidebarmenu/Users/UserList";
import CategoryList from "../sidebarmenu/Category/CategoryList";
import Profile from "../sidebarmenu/Profile/ProfileInfo";
import AllCategory from "../components/AllCategory/AllCategory";
import AllProductDetails from "../components/AllProduct/AllProductDetails";
import BuyOurList from "../sidebarmenu/BuyList/BuyOurList"

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
                path: "/allcategory",
                element: <AllCategory />,
                // element: <PrivateRoute>
                //     <AllProducts />
                // </PrivateRoute>,
            }

        ]
    }, {

        path: "/categorywiseproduct/:_id",
        element: <AllProducts />,

    }, {

        path: "/productdetails/:_id",
        element: <AllProductDetails />,

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
            }, 
            {
                path: "/dashboard/buyourlist",
                element: <BuyOurList />,
            },
            {
                path: "/dashboard/profile",
                element: <Profile />,
            }
        ]
    }
]);

export default router;