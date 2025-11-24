import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/authSlice'

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className=' bg-white h-5 flex justify-around'>
       <h1>MarketPlace</h1>
       <button onClick={()=>{navigate("/products")}}>Products</button>
       <button onClick={()=>{navigate('/sell')}}>Sell</button>
       <button onClick={()=>{navigate("/cart")}}>Cart</button>
       <button onClick={()=>{navigate("/login")}}>Login/Signup</button>
       <button onClick={()=>{dispatch(logoutUser()); navigate("/products")}}>SignOut</button>
    </div>
  )
}

export default Navbar
