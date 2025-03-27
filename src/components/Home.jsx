import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';
import axios from '../utils/Axios';
import Nav from './Nav';

function Home() {
  const { products } = useContext(ProductContext);
  const { search } = useLocation();

  // Extract category correctly
  const category = new URLSearchParams(search).get('category') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (category) {
          // Fetch products of the selected category from the API
          const { data } = await axios.get(`/products/category/${category}`);
          
          // Combine API data with local products from the context
          const localProductsInCategory = products.filter((p) => p.category === category);
          const combinedProducts = [...data, ...localProductsInCategory];

          // Remove duplicates (if any)
          const uniqueProducts = Array.from(new Set(combinedProducts.map((p) => p.id))).map((id) =>
            combinedProducts.find((p) => p.id === id)
          );

          setFilteredProducts(uniqueProducts);
        } else {
          // If no category is selected, show all products from the context
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, products]); // Runs when category or products change

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="flex h-screen">
    <Nav />
    <div className="w-[85%] min-h-screen p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/details/${product.id}`}
            className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[35vh] flex flex-col justify-center items-center hover:shadow-lg transition-all"
          >
            <img
              src={product.image}
              alt={product.title}
              className="hover:scale-110 mb-3 w-full h-[80%] object-contain transition-transform"
            />
            <h1 className="hover:text-blue-100 text-center text-sm font-semibold">
              {product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title}
            </h1>
          </Link>
        ))
      ) : (
        <p className="text-center w-full text-gray-500">No products found.</p>
      )}
    </div>
  </div>
  );
}

export default Home;