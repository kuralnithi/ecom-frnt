import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="flex">
      <div className="img">
        <img
          src="https://img.freepik.com/free-vector/empty-cart-concept-illustration_114360-17069.jpg?w=740&t=st=1707166428~exp=1707167028~hmac=4443e08052f6b5e1cfd7bd31d7605cb9b2fe98e554108ec7e53cb5e283f628ab"
          alt=""
        />
      </div>

      <div className="text flex flex-col justify-center mx-4">
        <div className="  font-bold md:text-2xl text-3xl md:text-6xl  text-purple-500">Cart is empty</div>
        <div className="  font-thin md:text-1xl text-2xl md:text-4xl  text-purple-500">Add items to cart</div>
        <Link to="/productpage">
      <div className="home bg-purple-500 hover:bg-purple-400 active:bg-purple-800 text-white text-center font-bold rounded-full my-2">
        Continue Shopping
      </div>
        </Link>
      </div>
    </div>
  );
}
