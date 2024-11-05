import React from 'react';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react";
import AllCategoryCardMarquee from "../HomeMarquee/AllCategoryCardMarquee";

const MarqueeProduct = () => {

  const [categoris, setCategoris] = useState([]);
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
        <title>Product Category List</title>
      </Helmet>
      <div className="text-center py-4">
        <h3 className="text-center text-2xl text-green-400 font-bold py-2"> Poduct Category List </h3>
        <div className="flex flex-row bg-slat-100 space-x-4 py-2">
          {
            categoris.map(ecategoris => <AllCategoryCardMarquee key={ecategoris._id} ecategoridataprop={ecategoris}></AllCategoryCardMarquee>)
          }
        </div>
      </div>
    </>
  );
};

export default MarqueeProduct;