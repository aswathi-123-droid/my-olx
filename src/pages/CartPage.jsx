import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCartAsync } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2dd4bf]">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty State - Matches First Image */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-24 h-24 text-gray-400 mb-6" strokeWidth={1.5} />
            <h2 className="text-xl font-medium text-gray-500 mb-8">Your cart is empty</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-[#2dd4bf] hover:bg-[#25b0a0] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Filled State - Matches Second Image */
          <div className="space-y-6">
            
            {/* Cart Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg shrink-0 p-2">
                     <img 
                        src={item.image || "https://via.placeholder.com/150"} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply"
                     />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <p className="text-[#2dd4bf] font-bold text-xl mt-1">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Delete Button (Mobile: hidden, Desktop: visible) */}
                      <button 
                        onClick={() => dispatch(removeItemFromCart(item.id))}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 hidden sm:block"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity Controls & Subtotal */}
                    <div className="flex items-center justify-between mt-4">
                      
                      <div className="text-right sm:hidden">
                          <button 
                            onClick={() => dispatch(removeItemFromCart(item.id))}
                            className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                      </div>

                      <span className=" font-bold text-gray-900 hidden sm:block">
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-[#2dd4bf]">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#2dd4bf] hover:bg-[#25b0a0] text-white font-bold py-4 rounded-xl text-lg transition-colors duration-200 shadow-md shadow-teal-100"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => dispatch(clearCartAsync())}
                  className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;