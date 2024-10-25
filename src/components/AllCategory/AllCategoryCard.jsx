import React from 'react'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AllCategoryCard = ({ecategoridataprop}) => {

    const {_id,image_url,category_name} = ecategoridataprop;
    const { current_user } = useContext(AuthContext);


    const handleClick = () => {
        const data = { _id };
        const dataString = encodeURIComponent(JSON.stringify(data));
        const newTabUrl = `/categorywiseproduct/${dataString}`;
    
        window.open(newTabUrl, '_blank');
      };


    // const handleViewProductBtnClick = async (categoryid) => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_GET_ALL_PRODUCT_DATA_BY_CATEGORI_ID}${categoryid}`);
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.error("Error:", error.message);
    //     } finally {
    //         console.log("finally");
    //     }
    // }


    return (
        <div className="text-center my-2 bg-base-200">
            <div className="grid grid-cols-1 md:grid-cols-4 px-4">
                
                        <div className="card bg-base-200 w-72 shadow-sm">
                            <figure className="px-2 pt-2">
                                <img
                                    src={image_url}
                                    alt="Shoes"
                                    className="rounded-xl w-32 h-32" />
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
            </div>
        </div>
    );
};

export default AllCategoryCard;