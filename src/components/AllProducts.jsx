import React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const { current_user } = useContext(AuthContext);

    useEffect(() => {
        fetch(import.meta.env.VITE_PRODUCT_DATA_GET)
            .then(res => res.json())
            .then(data => setProducts(data));

    }, []);


    return (
        <div className="text-center my-3 bg-slat-100">
            <h1 className="text-2xl text-green-900 font-semibold underline">Product Summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 px-4 space-y-3">
                {
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
                                <button className="btn btn-primary">View Details</button>
                            </div>
                        </div>
                    )

                }
            </div>
        </div>
    );
};

export default AllProducts;