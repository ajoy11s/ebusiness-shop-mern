import React from 'react';
import { useState, useContext, useEffect, createContext, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { rating } from '@material-tailwind/react';
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function ProductList() {

    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData(); 
    console.log(currentUserDataBackend);

    const [productlist, setProductList] = useState([]);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const formRef = useRef();

    const handleAddProductFormHideShow = () => {
        setIsProductFormOpen(!isProductFormOpen);
    }

    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    const handleChange = (event) => {
        setSelectedId(event.target.value);
    };

    useEffect(() => {
        fetch(import.meta.env.VITE_CATEGORY_DATA_GET)
            .then(res => res.json())
            .then(data => setOptions(data));

    }, []);

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

        const uploadUrl = import.meta.env.VITE_IMAGE_BB_URL_UPLOAD_API_KEY;

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
                const formData = new FormData(formRef.current);
                const productname = formData.get("product_name");
                const productdetails = formData.get("product_details");
                const productprice = formData.get("product_price");
                const productlist = {
                    product_name: productname,
                    product_details: productdetails,
                    product_price: productprice,
                    rating: null,
                    category_id: selectedId,
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
                                <form className="card-body" ref={formRef}>
                                    <div>
                                        <span className="label-text">Product Name</span>
                                        <input type="text" name="product_name" id="product_name" className="input input-bordered input-secondary w-full max-w-xs" required />
                                    </div>
                                    <div>
                                        <span className="label-text">Product Details</span>
                                        <input type="text" name="product_details" id="product_details" className="input input-bordered input-secondary w-full max-w-xs" required />
                                    </div>
                                    <div>
                                        <span className="label-text">Price</span>
                                        <input type="text" name="product_price" id="product_price" className="input input-bordered input-secondary w-full max-w-xs" required />
                                    </div>
                                    <div className="form-control">
                                        <span className="label-text">Product Category</span>
                                        <select value={selectedId} onChange={handleChange} className="btn w-full">
                                            <option value="" disabled className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">Select an option</option>
                                            {options.map((option) => (
                                                <option key={option._id} value={option._id}>
                                                    {option.category_name}
                                                </option>

                                            ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <span className="label-text">Upload Image</span>
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
