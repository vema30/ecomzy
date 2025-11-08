import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlices';
import { Link } from 'react-router-dom'; // ✅ import Link for navigation

const Item = ({ id, title, price, description, category, image }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const product = { id, title, price, description, category, image };
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:shadow-xl hover:scale-105 transition-transform duration-200 border border-gray-100 w-64">
      {/* ✅ Clicking image or title goes to Product Details */}
      <Link to={`/product/${id}`} className="flex flex-col items-center w-full">
        <img
          src={image}
          alt={title}
          className="w-40 h-40 object-contain mb-4 rounded-md hover:opacity-90 transition"
        />
        <h2 className="text-lg font-semibold text-gray-800 text-center hover:text-orange-600 transition-colors">
          {title}
        </h2>
      </Link>

      <p className="text-sm text-gray-500 mt-1">{category}</p>
      <p className="text-gray-600 text-sm text-center mt-2 line-clamp-2  w-40 overflow-hidden">
        {description}
      </p>
      <p className="font-bold text-orange-600 mt-3">${price}</p>

      <button
        className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        onClick={handleClick}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Item;
