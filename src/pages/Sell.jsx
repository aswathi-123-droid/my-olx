import React, { useState } from 'react';
import { Tag, Upload } from 'lucide-react'; // Changed icon to represent 'Selling'
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';

const SellPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Using useState instead of useForm
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  // 2. Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation check
    if (!formData.name || !formData.price || !formData.description) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(addNewProduct({
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      // image: "https://via.placeholder.com/150" // Placeholder image logic
    }));
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo Circle */}
          <div className="bg-[#2dd4bf] p-4 rounded-full mb-4 shadow-sm">
            <Tag className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sell Item</h1>
          <p className="text-gray-500 mt-2 text-sm">List your item for the world to see</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Product Name */}
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Vintage Camera"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 outline-none transition-all placeholder-gray-400 text-gray-700"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              min="1"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 outline-none transition-all placeholder-gray-400 text-gray-700"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your item condition, features..."
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 outline-none transition-all placeholder-gray-400 text-gray-700 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1cc1a8] hover:bg-[#17a590] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 mt-2 shadow-lg shadow-[#1cc1a8]/20 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            List Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
