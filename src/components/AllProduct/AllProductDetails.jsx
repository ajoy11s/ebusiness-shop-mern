import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import Rating from './Rating';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";


const AllProductDetails = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [product, setProduct] = useState({});
    const { current_user, logOutUser } = useContext(AuthContext);
    const { currentUserDataBackend } = useLoginUserBackendData();
    const [current_user_mongo, setCurrentUserMongo] = useState([]);
    const [commentsValue, setCommentsValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch(`${import.meta.env.VITE_PRODUCT_DATA_SINGLE_DATA_BY_ID}${_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productsdata = await response.json();
                setProduct(productsdata);
            } catch (error) {
                console.error('Error fetching product data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const handleClickBuyProduct = () => {
        if (current_user) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_GET_SINGLE_LOGIN_USER}${current_user.email}`);
                    const data = await response.json();
                    setCurrentUserMongo(data);
                    if (current_user_mongo) {
                        document.getElementById('my_modal_3').showModal();
                    }
                } catch (error) {
                    console.error("Error:", error.message);
                } finally {
                    //console.log("finally");
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

    const paymentData = async (productname, email, price) => {

        // const max = 100000;
        // const min = 1;
        // const tran_id = Math.floor(Math.random() * (max - min + 1)) + min;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let tran_id = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 12; i++) {
            tran_id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const paymentData = {
            totalAmount: price,
            tran_id: tran_id,
            successUrl: `${import.meta.env.VITE_ONLINE_PAYMENT_SUCCESS}${tran_id}`,
            failUrl: import.meta.env.VITE_ONLINE_PAYMENT_FAILURE,
            cancelUrl: import.meta.env.VITE_ONLINE_PAYMENT_CANCEL,
            cusName: currentUserDataBackend.name,
            cusEmail: email,
            cusPhone: currentUserDataBackend.tel,
            cusAddress: currentUserDataBackend.address,
            cusCity: currentUserDataBackend.address,
            cusState: currentUserDataBackend.address,
            cusPostcode: '1212',
            cusCountry: 'Bangladesh',
            product_name: productname,
            product_category: 'OnlineProduct',
            shipping_method: 'Courier'
        };

        const response = await fetch(import.meta.env.VITE_ONLINE_PAYMENT_LINK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responsePayment = await response.json();
        const paymentLink = responsePayment.url;
        window.location.href = paymentLink;
    }


    const handleConfirmBuyNowButtonClick = async (e) => {
        e.preventDefault();

        if (commentsValue.trim() === '') {
            alert('Comments field cannot be empty!');
            return;
        }


        const pproductbuylist = {
            category_id: product.category_id,
            product_id: _id,
            email: current_user.email,
            img_url: product.img_url,
            product_name: product.product_name,
            product_details: product.product_details,
            product_price: product.product_price,
            buyer_comments: commentsValue,
            rating: null,
            buy_date: new Date(),
            isactive: true,
            isdelete: false
        };

        try {
            const response = await fetch(import.meta.env.VITE_ADD_CUSTOMERS_BUY_PRODUCT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pproductbuylist),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            alert('Product order successfully, Please payment now...');
            paymentData(product.product_name, current_user.email, product.product_price);
           
            setCommentsValue("");
            document.getElementById('my_modal_3').style.display = 'none';
            return data;
        } catch (error) {
            console.error('Error data save:', error);

        }
    }

    return (
        <>
            {product && (

                <div className="text-center m-1 bg-slat-100 w-full items-center">
                    <div className="rounded-lg flex flex-col lg:flex-row border border-purple-200  bg-slat-100 px-5">
                        <div className="w-1/3">
                            <img
                                src={product.image_url ? product.image_url : "/images/all-products/no-product-image.jpg"} className="w-44 h-40 lg:w-96 lg:h-96 rounded-xl border-rose-400" />
                        </div>
                        <div className="flex flex-col items-start text-left w-2/3 py-2">
                            <span className="text-xl text-green-600">Product Name:{product.product_name ? product.product_name : " no product name found!"}</span>
                            <span className="text-xl text-black-400">Product Details:{product.product_details ? product.product_details : " no product details found!"}</span>
                            <span>Price:{product.product_price ? product.product_price : " no product prices set!"}</span>
                            <button onClick={handleClickBuyProduct} className="btn  text-white  bg-green-500">Buy Now</button>
                        </div>
                        <div>

                        </div>
                    </div>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
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
        </>
    )
}

export default AllProductDetails;
