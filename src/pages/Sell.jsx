import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Import RHF
import { addNewProduct } from '../features/productSlice'; 
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const SellPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm();

 
  const imageFileList = watch('image');
  const fileName = imageFileList?.[0]?.name || "No file chosen";


  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "e0oh6w9h"); 
    data.append("cloud_name", "dvmkmpjll");   

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvmkmpjll/image/upload", 
        {
          method: "POST",
          body: data,
        }
      );
      const fileData = await response.json();
      return fileData.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

 
  const onSubmit = async (data) => {
    try {
      const file = data.image[0];
      const imageUrl = await uploadToCloudinary(file);


      await dispatch(addNewProduct({
        name: data.name,
        price: Number(data.price),
        description: data.description,
        category: data.category,
        condition: data.condition,
        image: imageUrl
      })).unwrap();

      navigate('/');
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong during upload.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex justify-center items-center py-10 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
         
          <div className="flex items-center space-x-3 mb-6">
            <HiOutlineShoppingBag className="text-teal-400 text-4xl" />
            <h2 className="text-3xl font-semibold text-gray-800">Sell an Item</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            
            <div>
              <label htmlFor="name" className="flex text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input 
                type="text" 
                id="name" 
                className={`w-full border rounded-md p-2.5 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                {...register("name", { required: "Title is required" })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            
           
            <div>
              <label htmlFor="description" className="flex text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea 
                id="description" 
                rows="4" 
                className={`w-full border rounded-md p-2.5 outline-none resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label htmlFor="price" className="flex text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input 
                  type="number" 
                  id="price" 
                  min="0" 
                  className={`w-full border rounded-md p-2.5 outline-none ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("price", { required: "Price is required" , min: {value: 0, message: "Price cannot be negative" }})}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div>

              
              <div>
                <label htmlFor="category" className="flex text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select 
                  id="category" 
                  className={`w-full border rounded-md p-2.5 outline-none bg-white ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("category", { required: "Category is required" })}
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="furniture">Furniture</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
            </div>
            
           
            <div>
              <label htmlFor="condition" className="flex text-sm font-medium text-gray-700 mb-1">Condition *</label>
              <select 
                id="condition" 
                className={`w-full border rounded-md p-2.5 outline-none bg-white ${errors.condition ? 'border-red-500' : 'border-gray-300'}`}
                {...register("condition", { required: "Condition is required" })}
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
              {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition.message}</p>}
            </div>

           
            <div>
              <label className="flex text-sm font-medium text-gray-700 mb-1">Product Image *</label>
              <div className={`flex items-center border rounded-md p-2 bg-white ${errors.image ? 'border-red-500' : 'border-gray-300'}`}>
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
                  accept="image/*"
                  {...register("image", { required: "Product image is required" })}
                />
                <span className="ml-4 text-gray-500 truncate max-w-xs">
                  {fileName}
                </span>
              </div>
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            </div>

            
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className={`w-full text-white font-semibold py-3 rounded-md transition-colors shadow-sm ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-teal-400 hover:bg-teal-500'
              }`}
            >
              {isSubmitting ? 'Uploading Product...' : 'List Product'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellPage;