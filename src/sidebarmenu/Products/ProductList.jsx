import React from 'react';
import { useState, useContext, useEffect, createContext, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";

export default function ProductList() {

    const [productlist, setProductList] = useState([]);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);

    /*useEffect(() => {
        fetch('http://localhost:3000/testdata')
            .then(res => res.json())
            .then(data => console.log(data));

    }, []);*/

    const handleAddProductFormHideShow = () => {
        setIsProductFormOpen(!isProductFormOpen);
    }

    // Image upload code start
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false); // Define loading state
    const [resizedImage, setResizedImage] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();

        if (!selectedImage) {
            console.error("No image selected");
            return;
        }

        //Image resize start
        if (selectedImage) {
            // Resize the image
            Resizer.imageFileResizer(
                selectedImage,
                32, // new width
                32, // new height
                'JPEG', // format
                100, // quality
                0, // rotation
                (uri) => {
                    setResizedImage(uri);
                },
                'base64' // output type
            );
            //setImage(URL.createObjectURL(selectedImage));
        }
        //Image resize end


        const formData = new FormData();
        formData.append('image', selectedImage);

        const apikey = import.meta.env.VITE_IMAGE_BB_IMAGE_UPLOAD_API_KEY;  // Replace with your actual API key
        console.log(apikey);
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${apikey}`;

        try {
            setLoading(true); // Set loading state before fetch
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const data = await response.json();
            setImageUrl(data.data.display_url); // Get the image URL from the response
            if (data.data.display_url) {
               
            //Save data on mongoDB Start
                const productlist = {
                    product_name: "Ajoy Paul",
                    category_id: "New Test MongoDB",
                    image_url: data.data.display_url,
                    isactive: true,
                    isdelete: false
                }
                const response = await fetch(import.meta.env.VITE_PRODUCT_ADD_IMAGE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productlist),
                });
                const resultdata = await response.json();
            //Save data on mongoDB End

            }
        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    // Image upload code end

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
                                            <span className="label-text">Upload Image</span>
                                        </label>
                                        <input
                                            type="file" onChange={handleImageChange}
                                            className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                                    </div>
                                    <div className="form-control mt-2">
                                        <button className="btn btn-primary" onClick={handleImageUpload} disabled={loading}>Add Product</button>
                                        <span>{loading ? 'Uploading and Data Save...' : ''}</span>
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
