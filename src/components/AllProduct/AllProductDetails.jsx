import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Rating from './Rating';

const AllProductDetails =()=> {
    const { _id } = useParams();
    const [product, setProduct] = useState({});
    
    useEffect(() => {

        fetch(`${import.meta.env.VITE_PRODUCT_DATA_SINGLE_DATA_BY_ID}${_id}`)
            .then((response) => response.json())
            .then((productsdata) => {
                setProduct(productsdata);  
            });
    }, []);

  return (
    <div className="text-center m-1 bg-slat-100 w-full items-center">
    <div className="rounded-lg flex flex-col lg:flex-row border border-purple-200  bg-slat-100 px-5">
        <div className="w-1/3">
            <img
                src={product.img_url ? product.img_url : "/images/all-products/no-product-image.jpg"} className="w-44 h-40 lg:w-96 lg:h-96 rounded-xl" />
        </div>
        <div className="flex flex-col items-start text-left w-2/3 py-2 space-x-4">
            <span className="text-xl text-green-600">Product Name:{product.product_details ? product.product_details :  " no product details found!"}</span>
            <span className="text-xl text-green-400">Ratings:{product.rating ? product.rating : " no rating avaiable!"}  
                <Rating rating={product.rating ? product.rating : ""} /></span>
            <span>Price:{product.product_price ? product.product_price : " no product prices set!"}</span>
        </div>
    </div>
</div>
  )
}

export default AllProductDetails;
