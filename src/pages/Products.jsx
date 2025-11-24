import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  console.log('Product Status:', status, 'Error:', error);

  let content;

  if (status === 'loading') {
    content = <p>Loading products...</p>;
  } else if (status === 'succeeded') {
    if (items.length > 0) {
      content = (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {items.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              {authUser ? (
                <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
              ) : (
                <p>Login to buy</p>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      content = <p>No products found. You can add one from the Sell page!</p>;
    }
  } else if (status === 'failed') {
    content = <p>Error fetching products: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Available Products</h1>
      {content}
    </div>
  );
};

export default Products;