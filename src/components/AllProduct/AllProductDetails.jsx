import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import Rating from './Rating';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../../provider/AuthProvider";


const AllProductDetails = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [product, setProduct] = useState({});
    const { current_user, logOutUser } = useContext(AuthContext);
    const [current_user_mongo, setCurrentUserMongo] = useState([]);
    const [commentsValue, setCommentsValue] = useState('');

    useEffect(() => {

        fetch(`${import.meta.env.VITE_PRODUCT_DATA_SINGLE_DATA_BY_ID}${_id}`)
            .then((response) => response.json())
            .then((productsdata) => {
                setProduct(productsdata);
            });
    }, []);

    const handleClickBuyProduct = () => {
        if (current_user) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_GET_SINGLE_LOGIN_USER}${current_user.email}`);
                    const data = await response.json();
                    console.log(data);
                    setCurrentUserMongo(data);
                    document.getElementById('my_modal_3').showModal();
                } catch (error) {
                    console.error("Error:", error.message);
                } finally {
                    console.log("finally");
                }
            };

            fetchUserData();
        } else {
            navigate("/login");
        }

    }

    const handleCommentsChange = (event) => {
        setCommentsValue(event.target.value);
    };


    const handleConfirmBuyNowButtonClick = async (e) => {
        e.preventDefault();

        if (commentsValue.trim() === '') {
            alert('Comments field cannot be empty!');
            return;
        }
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
                    <span className="text-xl text-green-400">Ratings:{product.rating ? product.rating : " no rating avaiable!"}
                        {
                            product.rating ? (
                                <Rating rating={product.rating} />
                            ) : (
                                ""
                            )

                        }
                    </span>
                    <span>Price:{product.product_price ? product.product_price : " no product prices set!"}</span>
                    <button onClick={handleClickBuyProduct} className="btn  text-white  bg-green-500">Buy Now</button>
                </div>

            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box" style={{ width: '35%' }}>
                    <form method="dialog" className="my-4 w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="form-control py-2 w-full">
                        <textarea
                            placeholder="Comments here" onChange={handleCommentsChange} value={commentsValue}
                            className="textarea textarea-bordered textarea-md w-full max-w-xs"></textarea>
                    </div>
                    <div className="form-control mt-2 flex justify-center items-center w-full">
                        <button className="btn btn-warning w-1/2" onClick={handleConfirmBuyNowButtonClick}>Confirm Buy Now</button>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default AllProductDetails;
