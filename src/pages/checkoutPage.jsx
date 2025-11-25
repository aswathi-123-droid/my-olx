import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processCheckout, resetCheckout } from '../features/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.checkout);

  // Calculate Total
  const total = items.reduce((acc, item) => acc + Number(item.price), 0);

  useEffect(() => {
    if (status === 'succeeded') {
      // Small delay to allow the user to see the button change state if needed, 
      // or just standard alert behavior
      setTimeout(() => {
        alert("Purchase Successful!");
        dispatch(resetCheckout());
        navigate('/');
      }, 100);
    }
  }, [status, navigate, dispatch]);

  const handleConfirm = () => {
    dispatch(processCheckout(items));
  };

  // Optional: Redirect if cart is empty and not currently processing/succeeded
  if (items.length === 0 && status !== 'succeeded' && status !== 'loading') {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No items to checkout</h2>
            <button 
                onClick={() => navigate('/')}
                className="text-[#2dd4bf] hover:underline font-medium"
            >
                Return to Shop
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Main Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Checkout</h1>
        
        {/* Order Summary Label */}
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Order Summary</h2>

        {/* Items List */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-900 font-medium">{item.name}</span>
              <span className="text-gray-900 font-bold ml-4">
                ${Number(item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-6"></div>

        {/* Total Section */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-[#2dd4bf]">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={status === 'loading'}
          className={`w-full text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-teal-100 
            ${status === 'loading' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#2dd4bf] hover:bg-[#25b0a0]'
            }`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Complete Purchase
            </>
          )}
        </button>

        {/* Terms Text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By completing this purchase, you agree to our terms and conditions
        </p>

      </div>
    </div>
  );
};

export default CheckoutPage;