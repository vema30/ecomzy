import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../slices/cartSlices";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { totalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // 🛒 If cart is empty
  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Your cart is empty 🛍️
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/"
          className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );

  // 🧺 Cart with items
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Your Shopping Cart
        </h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-3 sm:mt-0">
                <p className="text-gray-700">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
                <p className="font-semibold text-orange-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 font-semibold hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 border-t pt-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Total: <span className="text-orange-600">${totalAmount.toFixed(2)}</span>
          </h3>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-6 sm:mt-0">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
