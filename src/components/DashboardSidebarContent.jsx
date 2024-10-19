import React from 'react'

export default function DashboardSidebarContent() {
    return (
        <div>
            <ul className="menu bg-base-200 rounded-box w-56 sm:w-full">
                <li className="menu-title text-black font-semibold">Dashboard</li>
                <li><a>All Users</a></li>
                <li><a>All Categories</a></li>
                <li><a>All Products</a></li>
                <li><a>Profile</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>

    )
}
