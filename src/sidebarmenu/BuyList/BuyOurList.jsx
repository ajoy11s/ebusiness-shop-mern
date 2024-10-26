import React, { useEffect, useState, useContext } from "react";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function BuyOurList() {
  const [buylist, setBuyList] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const { current_user } = useContext(AuthContext);
  const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();

  console.log(current_user);
  console.log(currentUserDataBackend);
  const nn = "jay@gmail.com";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_GET_ALL_PRODUCT_BUY_CUSTOMER}${nn}`)
      .then(res => res.json())
      .then(data => setBuyList(data));

  }, []);


  return (
    <div>
       <div className="flex flex-row justify-center py-2">
                <h2 className="text-green-600 font-semibold text-xl underline">Buy Product List</h2>
            </div>
      {
        current_user && currentUserDataBackend && (
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
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product rating</th>
                  <th>Buyer comments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buylist.map((buylists) => (
                  <tr key={buylists._id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td className="font-semibold">
                      {buylists.product_name}
                    </td>
                    <td>
                      {buylists.product_price}
                    </td>
                    <td>
                      {buylists.rating}
                    </td>
                    <td>
                      {buylists.buyer_comments}
                    </td>
                    <th className="space-x-2">
                      <Link> <i className="pi pi-info-circle" style={{ fontSize: '1.5rem' }}></i></Link>
                    </th>

                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        )}
    </div>

  )
}
