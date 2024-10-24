import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../provider/AuthProvider";
import { useLoginUserBackendData } from "../components/UseLoginUserDataBackend";

export default function DashboardSidebarContent() {

    const navigate = useNavigate();
    const { current_user, logOutUser } = useContext(AuthContext);
    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();

    const logOutButtonClick = () => {
        logOutUser();
        navigate("/");
      };

    return (
        <div>
            <ul className="menu bg-base-200 rounded-box w-56 sm:w-full">
                <li className="menu-title text-black font-semibold">Dashboard</li>
                {
                    current_user && currentUserDataBackend && currentUserDataBackend.isadmin && (
                        <div>
                            <li><NavLink to={"/dashboard/userlist"} className="pi pi-users" style={{ fontSize: '1rem' }}>All Users</NavLink></li>
                            <li><NavLink to={"/dashboard/categorylist"} className="pi pi-users">All Categories</NavLink></li>
                            <li><NavLink to={"/dashboard/productlist"} className="pi pi-users">All Products</NavLink></li>
                        </div>
                    )
                }
                <li><Link to={"/dashboard/profile"}>Profile</Link></li>
                <li><Link onClick={logOutButtonClick}>Logout</Link></li>
            </ul>
        </div>

    )
}
