import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart } from '../../Features/CartSlice';
import { userValid } from '../../Features/UserSlice';
import { useDispatch } from 'react-redux';

export default function Notauth() {
    const dispatch =useDispatch();
const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userValid(false));
        dispatch(emptyCart());
        localStorage.removeItem("ecom-token");
        localStorage.removeItem("ecom-oauth");
        navigate("/");
      };
  return (
    <div className='md:flex justify-center space-around '>


<div className="img">
<img className='w-96 mt-11'
 src="https://img.freepik.com/premium-photo/fun-3d-asian-teenager-with-manga-style_183364-21281.jpg?w=360" alt="" />
</div>

<div className='text-center md:flex md:flex-col  justify-center font-bold text-2xl md:text-6xl  text-purple-500'>
<div>You Are Not Authorized</div>
<div className="login my-5">
<button 
onClick={handleLogout}
className='bg-purple-500 text-white cursor-pointer rounded-full px-2 py-2 font-thin hover:bg-purple-400 active:bg-purple-800 animate-pulse'
>
Login
</button >
</div>
</div>

    </div>
  )
}
