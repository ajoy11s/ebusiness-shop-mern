import React from 'react';
import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function CategoryList() {
    const formRef = useRef();
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
    const { current_user } = useContext(AuthContext);
    const [categoryIdValue, setCategoryIdValue] = useState('');
    const [categoryNameValue, setCategoryNameValue] = useState('');


    const handleAddCategoryFormHideShow = () => {
        setIsCategoryFormOpen(!isCategoryFormOpen);
    }

    // Image upload code start
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false); // Define loading state
    const [resizedImage, setResizedImage] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageUploadAndSaveData = async (event) => {
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
                96, // new width
                96, // new height
                'JPEG', // format
                100, // quality
                0, // rotation
                (uri) => {
                    setResizedImage(uri);
                },
                'base64'
            );
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
                const category_name = formData.get("category_name");

                const categorylist = {
                    category_name: category_name,
                    image_url: data.data.display_url,
                    isactive: true,
                    isdelete: false
                }
                const response = await fetch(import.meta.env.VITE_CATEGORY_ADD_IMAGE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categorylist),
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

    useEffect(() => {
        fetch(import.meta.env.VITE_CATEGORY_DATA_GET)
            .then(res => res.json())
            .then(data => setCategoryList(data));

    }, []);

    const fetchAfterDataEditDeleteItems = async () => {
        fetch(import.meta.env.VITE_CATEGORY_DATA_GET)
        .then(res => res.json())
        .then(data => setCategoryList(data));
    };

    //Start edit Category code
    const handleEditCategoryLinkClick = (id) => {
        setCategoryIdValue(id);
        document.getElementById('my_modal_3').showModal();
    };

    const handleCategoryNameChange = (event) => {
        setCategoryNameValue(event.target.value);
    };
   
    const handleUpdateDataButtonClick = async (e) => {
        console.log(categoryIdValue);
        e.preventDefault();

        if (categoryNameValue.trim() === '') {
            alert('Category name field cannot be empty!');
            return;
        }
        
        const categoryupdatelist = {
            category_name: categoryNameValue
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_UPDATE_SINGLE_CATEGORY_NAME_BY_ID}${categoryIdValue}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryupdatelist),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            document.getElementById('my_modal_3').style.display = 'none';
            fetchAfterDataEditDeleteItems();
            return data;
        } catch (error) {
            console.error('Error updating user:', error);

        }
    };
    //End edit Category code

    //Start delete category code
    const handleDeleteCategoryLinkClick = async (_id) => {
        try {
            const url = `${import.meta.env.VITE_DELETE_SINGLE_CATEGORY_NAME_BY_ID}${_id}`;
            const response = await fetch(url, {
                method: "DELETE",
            });
    
            if (response.ok) {
                // Optionally, handle the response here if needed
                fetchAfterDataEditDeleteItems();
            } else {
                const errorMessage = await response.json(); // Get error details if needed
                console.error('Failed to delete item:', errorMessage);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    
    //End delete category code


    return (
        <div>
            <div className="flex flex-row justify-start py-2">

                <button className="btn btn-outline btn-success" onClick={handleAddCategoryFormHideShow}>
                    <img
                        src="/public/images/dashboard/add-product.png" className="w-8 h-8 rounded-xl" />
                    Add Category</button>
            </div>
            {
                isCategoryFormOpen ? (
                    <div className="hero bg-base-200 min-h-80vh">
                        <div className="hero-content flex-col lg:flex-row-reverse w-3/4">
                            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
                                <form className="card-body" ref={formRef} onSubmit={handleImageUploadAndSaveData}>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Category Name</span>
                                        </label>
                                        <input type="text" name="category_name" id="category_name" className="input input-bordered input-secondary w-full max-w-xs" required />
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
                                        <button className="btn btn-primary" onClick={handleImageUploadAndSaveData} disabled={loading}>Add Category</button>
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
                                        <th>Category Image</th>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {categoryList.map((categories) => (
                                        <tr key={categories._id}>
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
                                                                src={categories.image_url}
                                                                alt="Image Component" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                {categories.category_name}
                                            </td>

                                            <th className="space-x-2">
                                                <Link onClick={() => handleEditCategoryLinkClick(categories._id)}> <i className="pi pi-pen-to-square" style={{ fontSize: '1.5rem' }}></i></Link>
                                                <Link onClick={() => handleDeleteCategoryLinkClick(categories._id)}> <i className="pi pi-trash" style={{ fontSize: '1.5rem' }}></i></Link>
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
                        <input type="text" onChange={handleCategoryNameChange} value={categoryNameValue} name="name" id="name" placeholder="Please enter your name" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-2 flex justify-center items-center w-full">
                        <button className="btn btn-warning w-1/2" onClick={handleUpdateDataButtonClick}>Update</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
