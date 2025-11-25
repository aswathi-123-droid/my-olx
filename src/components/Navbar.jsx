import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/authSlice';
import { ShoppingBag, Store, ShoppingCart, User, LogOut, LogIn, Package } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access auth and cart state from Redux
  // Using optional chaining/defaults to prevent errors if state isn't fully set up yet
  const { user } = useSelector((state) => state.auth || { user: null });
  const { items } = useSelector((state) => state.cart || { items: [] });
  
  // Calculate cart items count
  const cartItemCount = items ? items.length : 0;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/products");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none" 
            onClick={() => navigate('/')}
          >
            <ShoppingBag className="w-6 h-6 text-[#2dd4bf]" strokeWidth={2.5} />
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-[#2dd4bf]">Market</span>
              <span className="text-orange-500">Place</span>
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-6">
            
            {/* Products - Highlighted Button Style (Like Screenshot) */}
            <button 
              onClick={() => navigate("/products")}
              className="text-gray-600 hover:text-[#2dd4bf] px-3 py-2 rounded-md flex items-center gap-2 font-medium transition-colors duration-200"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </button>

            {/* Sell Link */}
            {user?<button 
              onClick={() => navigate('/sell')}
              className="text-gray-600 hover:text-[#2dd4bf] px-3 py-2 rounded-md flex items-center gap-2 font-medium transition-colors duration-200"
            >
              <Store className="w-5 h-5" />
              <span className="hidden sm:inline">Sell</span>
            </button>:''}

            {/* Cart with Badge */}
            <button 
              onClick={() => navigate("/cart")}
              className="group text-gray-600 hover:text-[#2dd4bf] px-3 py-2 rounded-md flex items-center gap-2 font-medium transition-colors duration-200 relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:text-[#2dd4bf] transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>


            {/* Authentication Section (Conditional Rendering) */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-gray-700 font-medium">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{user.email.split('@')[0]}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-[#2dd4bf] font-medium flex items-center gap-2 transition-colors px-3 py-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login/Signup</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;