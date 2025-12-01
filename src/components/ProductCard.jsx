import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { addItemToCart } from "../features/cartSlice";
import { ShoppingCart } from 'lucide-react';

function ProductCard({product}) {
 const dispatch = useDispatch()
 const authUser = useSelector((state) => state.auth.user);
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
    >
     
      <div className="h-48 w-full bg-gray-200 relative">
        <img
          src={product.image || "https://placehold.co/400x300"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3
            className={`text-lg font-bold ${
              product.sold ? "text-gray-400" : " text-gray-900"
            } leading-tight text-left flex-1`}
          >
            {product.name}
          </h3>

          {product.category && (
            <span
              className={`text-xs font-medium ${
                product.sold ? " text-gray-300" : " text-gray-500"
              } bg-gray-100 px-2 py-1 rounded-md shrink-0`}
            >
              {product.category}
            </span>
          )}
        </div>

       
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 text-left">
          {product.description}
        </p>

       
        <div className="mt-auto">
          <p
            className={`text-2xl font-bold ${
              product.sold ? "text-[#8ae1d6e6]" : "text-[#2dd4bf]"
            } mb-3 text-left`}
          >
            ${Number(product.price).toFixed(2)}
          </p>

          {authUser ? (
            <button
              onClick={() => dispatch(addItemToCart(product))}
              disabled={product.sold}
              className={`w-full ${
                product.sold
                  ? " bg-yellow-200 cursor-not-allowed"
                  : " bg-yellow-400  hover:bg-yellow-500"
              } text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.sold ? "Out of Stock" : "Add to Cart"}
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
  );
}

export default ProductCard;
