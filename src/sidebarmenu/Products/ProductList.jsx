import React from 'react';
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function ProductList() {

    const { current_user } = useContext(AuthContext);
    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();
    const [productIdValue, setProductIdValue] = useState('');
    const [productNameValue, setProductNameValue] = useState('');
    const [productDetailsValue, setProductDetailsValue] = useState('');
    const [productPriceValue, setProductPriceValue] = useState('');

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
                fetchAfterDataEditDeleteItems();

            }
        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    // Image upload code end

    useEffect(() => {
        fetch(import.meta.env.VITE_PRODUCT_DATA_GET)
            .then(res => res.json())
            .then(data => setProductList(data));

    }, []);

    const fetchAfterDataEditDeleteItems = async () => {
        fetch(import.meta.env.VITE_PRODUCT_DATA_GET)
            .then(res => res.json())
            .then(data => setProductList(data));
    };


    //Start edit Category code
    const handleEditProductLinkClick = (id) => {
        setProductIdValue(id);
        document.getElementById('my_modal_3').showModal();
    };

    const handleProductNameChange = (event) => {
        setProductNameValue(event.target.value);
    };
    const handleProductDetailsChange = (event) => {
        setProductDetailsValue(event.target.value);
    };
    const handleProductPriceChange = (event) => {
        setProductPriceValue(event.target.value);
    };

    const handleUpdateDataButtonClick = async (e) => {
        e.preventDefault();
        console.log(productIdValue);

        if (productNameValue.trim() === '') {
            alert('Product name field cannot be empty!');
            return;
        }
        if (productDetailsValue.trim() === '') {
            alert('Product details field cannot be empty!');
            return;
        }
        if (productPriceValue.trim() === '') {
            alert('Product price field cannot be empty!');
            return;
        }

        const productupdatelist = {
            product_name: productNameValue,
            product_details: productDetailsValue,
            product_price: productPriceValue
        };

        if (!productupdatelist.product_name || !productupdatelist.product_price || !productupdatelist.product_details) {
            console.error('Product name,details and price are required');
            return;
        }

        try {
            const url = `${import.meta.env.VITE_UPDATE_SINGLE_PRODUCT_BY_ID}${productIdValue}`;
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productupdatelist),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            document.getElementById('my_modal_3').style.display = 'none';
            fetchAfterDataEditDeleteItems();
            return data;
        } catch (error) {
            console.error('Error updating product:', error);
        }

    };
    //End edit Category code



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
                    current_user && currentUserDataBackend && currentUserDataBackend.isadmin && (
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="bg-slate-200 font-semibold text-green-600 text-sm">
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Product Price</th>
                                        <th>Product Rating</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {productlist.map((products) => (
                                        <tr key={products._id}>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={products.image_url}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                {products.product_name}
                                            </td>
                                            <td>
                                                {products.product_price}
                                            </td>
                                            <td>
                                                {products.rating}
                                            </td>
                                            <th className="space-x-2">
                                                <Link onClick={() => handleEditProductLinkClick(products._id)}> <i className="pi pi-pen-to-square" style={{ fontSize: '1.5rem' }}></i></Link>
                                                <Link> <i className="pi pi-trash" style={{ fontSize: '1.5rem' }}></i></Link>
                                                <Link> <i className="pi pi-info-circle" style={{ fontSize: '1.5rem' }}></i></Link>
                                            </th>

                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )

                )
            }

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box" style={{ width: '35%' }}>
                    <form method="dialog" className="my-4 w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="form-control py-2 w-full">
                        <input type="text" onChange={handleProductNameChange} value={productNameValue} name="productname" id="productname" placeholder="Please enter product name" className="input input-bordered" required />
                    </div>
                    <div className="form-control py-2 w-full">
                        <input type="text" onChange={handleProductDetailsChange} value={productDetailsValue} name="productdetails" id="productdetails" placeholder="Please enter product details" className="input input-bordered" required />
                    </div>
                    <div className="form-control py-2 w-full">
                        <input type="tel" onChange={handleProductPriceChange} value={productPriceValue} name="productprice" id="productprice" placeholder="Please enter product price" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-2 flex justify-center items-center w-full">
                        <button className="btn btn-warning w-1/2" onClick={handleUpdateDataButtonClick}>Update</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
