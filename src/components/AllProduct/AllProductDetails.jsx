import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Rating from './Rating';
import toast, { Toaster } from 'react-hot-toast';

const AllProductDetails = () => {
    const { _id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {

        fetch(`${import.meta.env.VITE_PRODUCT_DATA_SINGLE_DATA_BY_ID}${_id}`)
            .then((response) => response.json())
            .then((productsdata) => {
                setProduct(productsdata);
            });
    }, []);

    const handleClickWish = () => {
        toast.success(`Producr Added to your wishlist.`);

    }

    return (
        <div className="text-center m-1 bg-slat-100 w-full items-center">
            <div className="rounded-lg flex flex-col lg:flex-row border border-purple-200  bg-slat-100 px-5">
                <div className="w-1/3">
                    <img
                        src={product.img_url ? product.img_url : "/images/all-products/no-product-image.jpg"} className="w-44 h-40 lg:w-96 lg:h-96 rounded-xl border-rose-400" />
                </div>
                <div className="flex flex-col items-start text-left w-2/3 py-2">
                    <span className="text-xl text-green-600">Product Name:{product.product_name ? product.product_name : " no product name found!"}</span>
                    <span className="text-xl text-black-400">Product Details:{product.product_details ? product.product_details : " no product details found!"}</span>
                    <span className="text-xl text-green-400">ratings:{product.rating ? product.rating : " no rating avaiable!"}
                        <Rating rating={product.rating ? product.rating : ""} /></span>
                    <span>price:{product.product_price ? product.product_price : " no product prices set!"}</span>
                    <button onClick={handleClickWish} className="btn  text-white  bg-green-500">Buy Now</button>
                </div>

            </div>
        </div>
    )
}

export default AllProductDetails;
