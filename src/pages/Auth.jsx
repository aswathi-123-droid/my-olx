import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux'
import { signupUser } from '../features/authSlice';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name:''
  });
  const dispatch = useDispatch();
  const {user,loading,error} = useSelector(state=>state.auth)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if(formData.email!=='' || formData.password!==''){
          if(activeTab === 'signup' || formData.name!==''){
            dispatch(signupUser(formData))
            navigate('/products')
          }
          else{
            dispatch(loginUser(formData))
            navigate('/products')  
            
          }
      }
    }
console.log(user)
   
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo Circle */}
          <div className="bg-[#2dd4bf] p-4 rounded-full mb-4 shadow-sm">
            <ShoppingBag className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">MarketPlace</h1>
          <p className="text-gray-500 mt-2 text-sm">Buy and sell with ease</p>
        </div>

        {/* Login/Signup Toggle */}
        <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'login' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'signup' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab==='signup'?
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 outline-none transition-all placeholder-gray-400 text-gray-700"
            />
          </div> : ''}
          
          
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 outline-none transition-all placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 outline-none transition-all placeholder-gray-400 text-gray-700 tracking-widest"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1cc1a8] hover:bg-[#17a590] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 mt-2 shadow-lg shadow-[#1cc1a8]/20"
          >
            { activeTab === 'signup' ?'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
