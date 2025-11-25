import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { addItemToCart, fetchCartItems } from '../features/cartSlice';
import { ShoppingCart } from 'lucide-react'; // Make sure to install lucide-react or use react-icons

const Products = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
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
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Product Image Area */}
              <div className="h-48 w-full bg-gray-200 relative">
                <img 
                  src={product.image || "https://via.placeholder.com/400x300"} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Available Badge removed as requested */}
              </div>

              {/* Product Content */}
              <div className="p-5 flex flex-col grow">
                
                {/* Header: Title & Category */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                  {product.category && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="flex text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price & Action - Pushed to bottom */}
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-[#2dd4bf] mb-4">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  {authUser ? (
                    <button 
                      onClick={() => dispatch(addItemToCart(product))}
                      className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  ) : (
                    <button 
                      disabled 
                      className="w-full bg-gray-100 text-gray-400 font-bold py-2.5 px-4 rounded-lg cursor-not-allowed"
                    >
                      Login to Buy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      content = (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found. You can add one from the Sell page!</p>
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