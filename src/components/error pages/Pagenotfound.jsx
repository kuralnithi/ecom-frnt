import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userValid } from "../../Features/UserSlice";
import { emptyCart } from "../../Features/CartSlice";

export default function Pagenotfound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userValid(false));
    dispatch(emptyCart());
    localStorage.removeItem("ecom-token");
    localStorage.removeItem("ecom-oauth");
    navigate("/");
  };

  return (
    <div className=" md:flex md:justify-center ">
      <div className="pagenotfound-img">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-people-holding-numbers-concept-illustration_114360-7983.jpg?w=740&t=st=1707169588~exp=1707170188~hmac=3fe4235abf99eaf70613640046ef63033763dbc3bb82ee16251e48305bda0ea9"
          alt=""
        />
      </div>

      <div className="text text-3xl md:text-6xl text-purple-500 font-bold text-center   md:flex md:flex-col  md:justify-center space-y-2">
        <div className="text1">
          {" "}
          <span>Page not found</span>
        </div>
        <div className="btn">
          <button
            onClick={handleLogout}
            className="bg-purple-500 text-white cursor-pointer rounded-full px-2 py-2 font-thin hover:bg-purple-400 active:bg-purple-800 animate-pulse"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
