import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useContext,createContext } from "react";
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import DashboardSidebarContent from '../components/DashboardSidebarContent'
import { AuthContext } from "../provider/AuthProvider";
import AllProducts from "../components/AllProducts";

const DashboardLayout = () => {
    const { current_user } = useContext(AuthContext);

    return (
        <>
            <div>
                <div className="shadow-md bg-slate-100">
                    <Header />
                    <Banner />
                </div>
                <div className="block lg:flex">
                    <div className="min-w-64 shadow-md bg-slate-100">
                        <DashboardSidebarContent />
                    </div>
                    <div className="w-full lg:w-3/4 min-h-screen p-2">
                        <Outlet />
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
};
export default DashboardLayout;