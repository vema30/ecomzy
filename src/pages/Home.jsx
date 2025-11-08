import React, { useEffect, useState } from 'react';
import Item from '../components/Item.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
        ⏳ Loading products...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
        ❌ {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 py-10 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm">
          Welcome to <span className="text-orange-600">Ecomzy</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Shop the latest trends with great deals 🎉
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((p) => (
            <Item
              key={p._id}
              id={p._id}
              title={p.title}
              price={p.price}
              description={p.description}
              category={p.category}
              image={p.image}
            />
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">
            No products available 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
