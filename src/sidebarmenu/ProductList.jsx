import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
        

export default function ProductList() {

    const [productlist, setProductList] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/testdata')
        .then(res => res.json())
        .then(data => console.log(data));
  
    }, []);

    return (
        <div>
            <div className="flex flex-row">

                <button className="btn btn-outline btn-success">
                    <img
                        src="/images/logo-ecommerce.png" className="w-8 h-8 rounded-xl" />
                    Add new product</button>
            </div>
        </div>
    )
}
