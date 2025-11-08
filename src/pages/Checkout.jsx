import React from "react";

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          ✅ Checkout Page
        </h2>
        <p className="text-gray-700 mb-4">
          Welcome, <span className="font-semibold">{user?.name}</span>!
        </p>
        <p className="text-gray-600">You're ready to place your order 🎉</p>
      </div>
    </div>
  );
};

export default Checkout;
