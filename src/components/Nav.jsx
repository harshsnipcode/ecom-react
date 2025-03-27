import React, { useContext } from 'react';
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

function Nav() {
  const { products } = useContext(ProductContext);

  // Extract unique categories from products
  let distinctCategory = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinctCategory = [...new Set(distinctCategory)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()}, 0.4)`;
  };

  return (
    <nav className="w-[15%] h-screen bg-zinc-100 flex flex-col items-center p-5">
      <a className="py-3 px-5 border border-blue-400 rounded text-blue-500" href="/create">
        Add New Product
      </a>
      <hr className="w-[80%] m-2" />
      <h1 className="text-2xl w-[80%] mb-3">Category Filter</h1>
      <div className="w-[80%]">
        {distinctCategory.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${encodeURIComponent(c)}`} // ✅ FIXED URL
            className="mb-3 flex items-center"
          >
            <span
              style={{ backgroundColor: color() }}
              className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-100"
            ></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
