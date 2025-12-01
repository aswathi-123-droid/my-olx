import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { fetchCartItems } from '../features/cartSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
      if(status=='idle')
      dispatch(fetchProducts());
   
    dispatch(fetchCartItems());
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  } else if (status === 'succeeded') {
    if (items.length > 0) {
      content = (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => (
            <ProductCard  key={product.id} product={product}></ProductCard>
          ))}
        </div>
      );
    } else {
      content = (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      );
    }
  } else if (status === 'failed') {
    content = <p className="text-red-500 text-center py-10">Error fetching products: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="flex text-3xl font-bold text-gray-900 mb-8">Available Products....</h1>
        {content}
      </div>
    </div>
  );
};

export default Products;