import axios from './Axios';
import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext(); // Create context

function ContextProvider({ children }) {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products"))||[]); // Default to empty array

    // const getProducts = async () => {
    //     try {
    //         const { data } = await axios.get('products');
    //         setProducts(data);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     }
    // };
    // console.log(products);
    // useEffect(() => {
    //     getProducts();
    // }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>  {/* Providing as an object */}
            {children}
        </ProductContext.Provider>
    );
}

// Export both Context and Provider
export { ProductContext, ContextProvider };
