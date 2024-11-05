import React from 'react'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AllCategoryCardMarquee = ({ ecategoridataprop }) => {

    const { _id, image_url, category_name } = ecategoridataprop;
    const { current_user } = useContext(AuthContext);


    const handleClick = () => {
        const data = { _id };
        const dataString = encodeURIComponent(JSON.stringify(data));
        const newTabUrl = `/categorywiseproduct/${dataString}`;

        window.open(newTabUrl, '_blank');
    };

    return (
        <>
            <div className="card bg-base-200 w-72 shadow-sm">
                <figure className="px-2 pt-2">
                    <img
                        src={image_url ? image_url : "/images/all-products/no-product-image.jpg"}
                        alt="No Image"
                        className="rounded-xl w-48 h-32" />
                </figure>
                <div className="card flex flex-row justify-center items-center w-full p-2 space-x-4">
                    <h2 className="card-title">{category_name}</h2>
                    <button className="btn btn-outline btn-success" onClick={handleClick}>
                        <img
                            src={image_url}
                            alt="Shoes"
                            className="rounded-xl w-6 h-6" />
                        View All {category_name}</button>
                </div>
            </div>

        </>
    );
};

export default AllCategoryCardMarquee;