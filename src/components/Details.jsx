import axios from '../utils/Axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ProductContext } from '../utils/Context';

function Details() {
  const { products, setProducts } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Redirect after deletion

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id == id); // Ensure loose comparison to match string/number
    setProduct(selectedProduct || null);
  }, [id, products]);

  const ProductDeleteHandler = () => {
    if (!product) return;

    const filteredProducts = products.filter((p) => p.id !== product.id);
    
    setProducts(filteredProducts); // ✅ Update state with new list
    localStorage.setItem("products", JSON.stringify(filteredProducts)); // ✅ Update local storage

    navigate('/'); // ✅ Redirect to home after deletion
  };

  return product ? (
    <div className="w-[70%] flex h-full justify-between items-center m-auto p-[10%]">
      <img className="h-[80%] w-[40%] object-contain" src={product.image} alt={product.title} />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">${product.price}</h2>
        <p className="mb-6">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="py-3 px-5 mr-5 border border-blue-400 rounded text-blue-500">
          Edit
        </Link>
        <button onClick={ProductDeleteHandler} className="py-3 px-5 border border-red-400 rounded text-red-500">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
