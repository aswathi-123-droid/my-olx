import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processCheckout, resetCheckout } from '../features/checkoutSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (status === 'succeeded') {
      alert("Purchase Successful!");
      dispatch(resetCheckout());
      navigate('/');
    }
  }, [status, navigate, dispatch]);

  const handleConfirm = () => {
    dispatch(processCheckout(items));
  };

  if (items.length === 0 && status !== 'succeeded') return <h2>No items to checkout</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Checkout</h1>
      <p>You are about to buy {items.length} items.</p>
      <button onClick={handleConfirm} disabled={status === 'loading'}>
        {status === 'loading' ? 'Processing...' : 'Confirm Purchase'}
      </button>
    </div>
  );
};

export default CheckoutPage;