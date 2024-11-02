import React from 'react';
import { Helmet } from 'react-helmet';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AllCategoryCard from "../AllCategory/AllCategoryCard";

const AllCategory = () => {

  const [categoris, setCategoris] = useState([]);
  const { current_user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_CATEGORY_DATA_GET)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setCategoris(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Helmet>
        <title>Product Category</title>
      </Helmet>
      <div className="text-center w-full py-4">
        <h3 className="text-center text-2xl text-green-400 font-bold"> All Product Category </h3>
        <div className="py-3 grid grid-cols-1 md:grid-cols-4 gap-1  bg-slat-100">
          {
            categoris.map(ecategoris => <AllCategoryCard key={ecategoris._id} ecategoridataprop={ecategoris}></AllCategoryCard>)
          }
        </div>
      </div>
    </>
  );
};

export default AllCategory;