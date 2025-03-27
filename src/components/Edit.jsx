import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';

function Edit() {
    const { products, setProducts } = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category: ""
    });

    // Set the product state when the component mounts
    useEffect(() => {
        const existingProduct = products.find((p) => p.id == id);
        if (existingProduct) {
            setProduct(existingProduct);
        }
    }, [id, products]);

    const ChangeHandler = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const UpdateProductHandler = (e) => {
        e.preventDefault();
    
        // Convert price to a string before trimming
        if (
            product.title.trim().length < 5 ||
            product.image.trim().length < 5 ||
            product.category.trim().length < 5 ||
            String(product.price).trim().length < 1 ||  // Convert price to string
            product.description.trim().length < 5
        ) {
            alert("All fields are required, and some have minimum length requirements.");
            return;
        }
    
        // Update the product in the products array
        const updatedProducts = products.map((p) => (p.id == id ? product : p));
        setProducts(updatedProducts);
    
        // Save the updated products array to localStorage
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    
        // Navigate back to the home page
        navigate("/");
    
        console.log("Product updated:", product);
    };
    

    return (
        <form className='p-[5%] w-screen h-screen flex flex-col' onSubmit={UpdateProductHandler}>
            <h1 className='mb-5 w-1/2 text-3xl'>Edit Product</h1>
            <input
                type="url"
                placeholder='image link'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                name='image'
                onChange={ChangeHandler}
                value={product.image}
                required
            />
            <input
                type="text"
                placeholder='title'
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                name='title'
                onChange={ChangeHandler}
                value={product.title}
                required
            />
            <div className='w-[1/2]'>
                <input
                    type="text"
                    placeholder='category'
                    className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mr-2 mb-3'
                    name='category'
                    onChange={ChangeHandler}
                    value={product.category}
                    required
                />
                <input
                    type="number"
                    placeholder='price'
                    className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3'
                    name='price'
                    onChange={ChangeHandler}
                    value={product.price}
                    required
                />
            </div>
            <textarea
                name='description'
                onChange={ChangeHandler}
                value={product.description}
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
                placeholder='enter product description here'
                required
            />
            <button type="submit" className="py-3 px-5 border border-blue-400 rounded text-blue-500">
                Update Product
            </button>
        </form>
    );
}

export default Edit;