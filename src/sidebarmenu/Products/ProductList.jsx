import React from 'react';
import { useState, useContext, useEffect, createContext, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function ProductList() {

    const [productlist, setProductList] = useState([]);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/testdata')
            .then(res => res.json())
            .then(data => console.log(data));

    }, []);

    const handleAddProductFormHideShow = () => {
        setIsProductFormOpen(!isProductFormOpen);
    }

    return (
        <div>
            <div className="flex flex-row justify-start py-2">

                <button className="btn btn-outline btn-success" onClick={handleAddProductFormHideShow}>
                    <img
                        src="/public/images/dashboard/add-product.png" className="w-8 h-8 rounded-xl" />
                    Add product</button>
            </div>
            {
                isProductFormOpen ? (
                    <div className="hero bg-base-200 min-h-80vh">
                        <div className="hero-content flex-col lg:flex-row-reverse w-3/4">
                            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
                                <form className="card-body">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Product Name</span>
                                        </label>
                                        <input type="text" name="product_name" id="product_name" className="input input-bordered input-secondary w-full max-w-xs" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Product Category</span>
                                        </label>
                                        <details className="dropdown">
                                            <summary className="btn w-full">Please Select</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li><a>Item 1</a></li>
                                                <li><a>Item 2</a></li>
                                            </ul>
                                        </details>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Product Image</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                                    </div>
                                    <div className="form-control mt-2">
                                        <button className="btn btn-primary">Add Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-slate-200 font-semibold text-green-600 text-sm">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="hover">
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td className="space-x-2">
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-error">Delete</button>
                                    </td>
                                </tr>                             
                            </tbody>
                        </table>
                    </div>
                )


            }

        </div>
    )
}
