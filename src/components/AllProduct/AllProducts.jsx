import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import DashboardSidebarContent from '../../components/DashboardSidebarContent';

const AllProducts = () => {
    const { _id } = useParams();
    const [products, setProducts] = useState([]);
    const { current_user } = useContext(AuthContext);


    useEffect(() => {
        const currentUrl = window.location.href;
        const urlParams = currentUrl.split('/').pop();
        const decodedDataString = decodeURIComponent(urlParams);
        const data = JSON.parse(decodedDataString);
        const id = data._id

        fetch(`${import.meta.env.VITE_GET_ALL_PRODUCT_DATA_BY_CATEGORI_ID}${id}`)
            .then(res => res.json())
            .then(data => setProducts(data));

    }, []);


    return (
        <>
            <div className="shadow-md bg-slate-100">
                <Header />
            </div>
            <div className="block lg:flex">
                <div className="w-full lg:w-3/4 min-h-screen p-2">
                    <div className="text-center my-3 bg-slat-100">
                       
                        <h1 className="text-2xl text-green-900 font-semibold underline">Product Summary</h1>
                        <div className="grid grid-cols-1 md:grid-cols-4 px-4 space-y-3">
                            {
                                products.length > 0 ? (
                                    products.map((productsall) =>
                                        <div className="card bg-base-200 w-72 shadow-sm" key={productsall._id}>
                                            <figure className="px-2 pt-2">
                                                <img
                                                    src={productsall.image_url}
                                                    alt="Shoes"
                                                    className="rounded-xl w-32 h-32" />
                                            </figure>
                                            <div className="card justify-start items-start w-full p-2">
                                                <h2 className="card-title">{productsall.product_name}</h2>
                                                <h3>Prices: {productsall.product_price ? productsall.product_price : "No prices set"}</h3>
                                                <h3>Rating: {productsall.rating ? productsall.rating : "No rating given!"}</h3>
                                            </div>
                                            <div className="card-actions justify-end py-2 px-2">
                                                <Link to={`/productdetails/${productsall._id}`}>
                                                    <button className="btn btn-primary">View Details</button>
                                                </Link>

                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <h1 className="text-xl text-red-900 font-semibold">Data not found!</h1>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;