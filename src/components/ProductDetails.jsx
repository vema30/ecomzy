import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlices";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        ⏳ Loading product...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">
        ❌ {error}
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-100 to-white py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain rounded-lg border"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm mb-2">{product.category}</p>
          <p className="text-gray-700 text-base mb-6 max-w-xl break-words leading-relaxed">
  {product.description}
</p>

          <p className="text-2xl font-semibold text-orange-600 mb-6">
            ${product.price}
          </p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
