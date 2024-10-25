import React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const AllCategory = () => {

    const [categoris, setCategoris] = useState([]);
    const [selectedID, setSelectedID] = useState('');
    const { current_user } = useContext(AuthContext);

    useEffect(() => {
        fetch(import.meta.env.VITE_CATEGORY_DATA_GET)
            .then(res => res.json())
            .then(data => setCategoris(data));
    }, []);

    const handleViewProductBtnClick = async (categoryid) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_GET_ALL_PRODUCT_DATA_BY_CATEGORI_ID}${categoryid}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            console.log("finally");
        }
    }


    return (
        <div className="text-center my-2 bg-slat-100">
            <h1 className="text-2xl text-green-900 font-semibold underline py-3">Product Category</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 px-4">
                {
                    categoris.map((categorisall) =>
                        <div className="card bg-base-200 w-72 shadow-sm" key={categorisall._id}>
                            <figure className="px-2 pt-2">
                                <img
                                    src={categorisall.image_url}
                                    alt="Shoes"
                                    className="rounded-xl w-32 h-32" />
                            </figure>
                            <div className="card flex flex-row justify-center items-center w-full p-2 space-x-4">
                                <h2 className="card-title">{categorisall.category_name}</h2>
                                <button className="btn btn-outline btn-success" onClick={() => handleViewProductBtnClick(categorisall._id)}>
                                    <img
                                        src={categorisall.image_url}
                                        alt="Shoes"
                                        className="rounded-xl w-6 h-6" />
                                    View {categorisall.category_name}</button>
                            </div>
                        </div>
                    )

                }
            </div>
        </div>
    );
};

export default AllCategory;