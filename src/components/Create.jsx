import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { ProductContext } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Create() {
    const navigate = useNavigate();
    // Destructure the context value as an object
    const { products, setProducts } = useContext(ProductContext);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const AddProductHandler = (e) => {
        e.preventDefault();

        // Validation
        if (
            title.trim().length < 5 ||
            image.trim().length < 5 ||
            category.trim().length < 5 ||
            String(price).trim().length < 1 ||
            description.trim().length < 5
        ) {
            alert("All fields are required, and some have minimum length requirements.");
            return;
        }

        // Create new product
        const product = {
            id: nanoid(),
            title,
            image,
            category,
            price: Number(price), // Ensure price is a number
            description
        };

        // Update products state and save to localStorage
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts, product];
            localStorage.setItem("products", JSON.stringify(updatedProducts)); // Save updated products to localStorage
            return updatedProducts;
        });
        toast.success("Product Added Successfully");    
        navigate("/");

        // Reset form fields
        setTitle("");
        setImage("");
        setCategory("");
        setPrice("");
        setDescription("");

        console.log("Product added:", product);
    };

    return (
        <form className='p-[5%] w-screen h-screen flex flex-col' onSubmit={AddProductHandler}>
            <h1 className='mb-5 w-1/2 text-3xl'>Add New Product</h1>
            <input 
                type="url" 
                placeholder='image link' 
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' 
                onChange={(e) => setImage(e.target.value)} 
                value={image}
                required
            />
            <input 
                type="text" 
                placeholder='title' 
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                required
            />
            <div className='w-[1/2]'>
                <input 
                    type="text" 
                    placeholder='category' 
                    className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mr-2 mb-3' 
                    onChange={(e) => setCategory(e.target.value)} 
                    value={category}
                    required
                />
                <input 
                    type="number" 
                    placeholder='price' 
                    className='text-1xl bg-zinc-100 rounded p-3 w-[45%] mb-3' 
                    onChange={(e) => setPrice(e.target.value)} 
                    value={price}
                    required
                />
            </div>
            <textarea 
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' 
                placeholder='enter product description here' 
                required
            />
            <button type="submit" className="py-3 px-5 border border-blue-400 rounded text-blue-500">
                Add New Product
            </button>
        </form>
    );
}

export default Create;