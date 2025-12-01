import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'; 
import { signupUser, loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  
 
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  const dispatch = useDispatch();
  const { user,error } = useSelector(state => state.auth);

  
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    reset(); 
  };

  const onSubmit = (data) => {
    if (activeTab === 'signup') {
      dispatch(signupUser(data));
    } else {
      dispatch(loginUser({ email: data.email, password: data.password }));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        
       
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#2dd4bf] p-4 rounded-full mb-4 shadow-sm">
            <ShoppingBag className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">MarketPlace</h1>
          <p className="text-gray-500 mt-2 text-sm">Buy and sell with ease</p>
        </div>

  
        <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8">
          <button
            onClick={() => handleTabSwitch('login')}
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'login' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabSwitch('signup')}
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'signup' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
          {activeTab === 'signup' && (
            <div className="space-y-1.5">
              <label className="flex text-sm font-bold text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all placeholder-gray-400 text-gray-700 ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-[#2dd4bf] focus:ring-[#2dd4bf]/20'
                }`}
                {...register("name", { 
                  required: "Name is required" 
                })}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
          )}
          
        
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all placeholder-gray-400 text-gray-700 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#2dd4bf] focus:ring-[#2dd4bf]/20'
              }`}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          
          <div className="space-y-1.5">
            <label className="flex text-sm font-bold text-gray-900">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all placeholder-gray-400 text-gray-700 tracking-widest ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#2dd4bf] focus:ring-[#2dd4bf]/20'
              }`}
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

         
          <button
            type="submit"
            className="w-full bg-[#1cc1a8] hover:bg-[#17a590] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 mt-2 shadow-lg shadow-[#1cc1a8]/20"
          >
            {activeTab === 'signup' ? 'Create Account' : 'Login'}
          </button>
           {<p className="text-red-500 text-xs">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Auth;