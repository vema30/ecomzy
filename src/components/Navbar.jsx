import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlices";
import { ShoppingCart } from "lucide-react"; // ✅ nice icon

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { totalQuantity } = useSelector((state) => state.cart);
console.log(totalQuantity);
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <Link to="/" className="text-2xl font-bold">
        🛍️ Ecomzy
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {/* ✅ Cart with badge */}
        <Link to="/cart" className="relative flex items-center">
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {totalQuantity}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="font-semibold">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
