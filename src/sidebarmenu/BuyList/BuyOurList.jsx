import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet';
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function BuyOurList() {
  const [buylist, setBuyList] = useState([]);
  const { current_user } = useContext(AuthContext);
  const { currentUserDataBackend } = useLoginUserBackendData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productIdValue, setProductIdValue] = useState('');
  const [productRatingValue, setProductRatingValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!current_user && !currentUserDataBackend) return;

      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_GET_ALL_PRODUCT_BUY_CUSTOMER}${current_user.email}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setBuyList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [current_user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleEditProductRatingLinkClick = (id) => {
    setProductIdValue(id);
    document.getElementById('my_modal_3').showModal();
  };

  const handleProductRatingChange = (event) => {
    setProductRatingValue(event.target.value);
  };

  const handleRatingNowButtonClick = async (e) => {
    e.preventDefault();
    if (productRatingValue.trim() === '') {
      alert('Rating field cannot be empty!');
      return;
    }

    const productupdatelist = {
      rating: productRatingValue
    };

    if (!productupdatelist.rating) {
      console.error('Product rating are required');
      return;
    }

    try {
      const url = `${import.meta.env.VITE_RATING_SINGLE_PRODUCT_COUSTOMER_ID}${productIdValue}`;

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
      fetchAfterDataEditItems();
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
    }

  }

  const fetchAfterDataEditItems = async () => {
    if (!current_user) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_GET_ALL_PRODUCT_BUY_CUSTOMER}${current_user.email}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setBuyList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <Helmet>
        <title>Buyer List</title>
      </Helmet>
      <div className="flex flex-row justify-center py-2">
        <h2 className="text-green-600 font-semibold text-xl underline">My Wishlist List</h2>
      </div>
      {current_user && currentUserDataBackend && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <div>
                <span className="label-text">Email: {currentUserDataBackend.email}</span>
              </div>
              <tr className="bg-slate-200 font-semibold text-green-600 text-sm">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Rating</th>
                <th>Buyer Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buylist.map(buylists => (
                <tr key={buylists._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td className="font-semibold">{buylists.product_name}</td>
                  <td>{buylists.product_price}</td>
                  <td>{buylists.rating}</td>
                  <td>{buylists.buyer_comments}</td>
                  <th className="space-x-2">
                    <Link onClick={() => handleEditProductRatingLinkClick(buylists._id)}>
                      <i className="pi pi-info-circle" style={{ fontSize: '1.5rem' }}></i>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className="my-4 w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <span className="font-bold py-4">Rating your products:</span>
          <div className="form-control py-2 w-1/2 border flex justify-items-center">
            <select id="numberSelect" value={productRatingValue} onChange={handleProductRatingChange}>
              {/* Create options from 1 to 5 */}
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>

          </div>
          <div className="form-control mt-2 flex justify-left items-left w-full">
            <button className="btn btn-warning w-1/2" onClick={handleRatingNowButtonClick}>Rating Now</button>
          </div>
        </div>
      </dialog>

    </div>
  );
}
