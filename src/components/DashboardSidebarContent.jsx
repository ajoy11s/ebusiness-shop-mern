import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function DashboardSidebarContent() {
    return (
        <div>
            <ul className="menu bg-base-200 rounded-box w-56 sm:w-full">
                <li className="menu-title text-black font-semibold">Dashboard</li>
                <li><NavLink to={"/dashboard/userlist"} className="pi pi-users" style={{ fontSize: '1rem' }}>All Users</NavLink></li>
                <li><NavLink to={"/dashboard/categorylist"} className="pi pi-users">All Categories</NavLink></li>
                <li><NavLink to={"/dashboard/productlist"} className="pi pi-users">All Products</NavLink></li>
                <li><a>Profile</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>

    )
}
