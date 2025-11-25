import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../features/productSlice'; // Your redux action
import { FiShoppingCart, FiPlus, FiLogOut } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const SellPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. State for Form Data
  const [formData, setFormData] = useState({
    name: '',        // Maps to "Title" in UI
    price: '',
    description: '',
    category: '',    // Added to match UI
    condition: ''    // Added to match UI
  });

  // 2. State for File Input UI
  const [fileName, setFileName] = useState("No file chosen");

  // Handle Text/Select Changes
  const handleInputChange = (e) => {
    const { id, value } = e.target; // Using 'id' to match the UI labels below
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle File Change
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.price || !formData.description) {
      alert("Please fill in the required fields");
      return;
    }

    // Dispatch to Redux
    dispatch(addNewProduct({
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      condition: formData.condition,
      image: fileName // You might want to handle actual file uploading logic here
    }));

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
       {/* Main Content */}
      <main className="flex justify-center items-center py-10 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <HiOutlineShoppingBag className="text-teal-400 text-4xl" />
            <h2 className="text-3xl font-semibold text-gray-800">Sell an Item</h2>
          </div>
          <p className=" flex text-gray-600 mb-8">List your item for others to purchase</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title (Mapped to formData.name) */}
            <div>
              <label htmlFor="name" className="flex text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-teal-500 focus:border-teal-500 outline-none" 
                placeholder="iPhone 13 Pro Max" 
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="flex text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea 
                id="description" 
                rows="4" 
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none" 
                placeholder="Describe your item..."
                required
              ></textarea>
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="flex text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input 
                  type="number" 
                  id="price" 
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-teal-500 focus:border-teal-500 outline-none" 
                  placeholder="99.99" 
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="flex text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  id="category" 
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-teal-500 focus:border-teal-500 text-gray-500 outline-none bg-white"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label htmlFor="condition" className="flex text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select 
                id="condition" 
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-teal-500 focus:border-teal-500 text-gray-500 outline-none bg-white"
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>

            {/* Product Image (File Upload UI) */}
            <div>
              <label className="flex text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                <label 
                  htmlFor="product-image-upload" 
                  className="bg-teal-50 text-teal-700 font-medium py-2 px-4 rounded cursor-pointer hover:bg-teal-100 transition-colors"
                >
                  Choose file
                </label>
                <input 
                  id="product-image-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <span className="ml-4 text-gray-500 truncate max-w-xs">{fileName}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-teal-400 text-white font-semibold py-3 rounded-md hover:bg-teal-500 transition-colors shadow-sm"
            >
              List Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellPage;