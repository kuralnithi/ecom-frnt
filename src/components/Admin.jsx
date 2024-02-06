import React, { useState } from "react";
import Hoc from "./userlogin/Hoc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userValid } from "../Features/UserSlice";
import { emptyCart } from "../Features/CartSlice";
import Notauth from "./error pages/Notauth";

function Admin() {
  const [inpName, setInpName] = useState("");
  const [inpPrice, setInpPrice] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState();
  const [category, setcategory] = useState("");
  const [seller, setseller] = useState("");
  const [stock, setstock] = useState("");
  const [responce, setresponce] = useState("");

  //for header
  const userLogin = useSelector((state) => state.userStore.isValid);
  const cartItems = useSelector((state) => state.cartStore.value);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userValid(false));
    dispatch(emptyCart());
    localStorage.removeItem("ecom-token");
    localStorage.removeItem("ecom-oauth");
    navigate("/");
  };

  const userType = useSelector((state) => state.userStore.userTypeState);
  console.log("user type in admin page", userType);

  const onProductSubmit = async (e) => {
    e.preventDefault();

    const productObj = {
      name: inpName,
      price: inpPrice,
      description: description,
      image: image,
      category: category,
      seller: seller,
      stock: stock,
    };

    const productFetch = await fetch("https://ecom-server-73yx.onrender.com/api/addproduct", {
      method: "POST",

      body: JSON.stringify(productObj),

      headers: { "content-type": "application/json" },
    });
if(productFetch.status==200) {
  alert("Product added successfully")
}
    const responce = await productFetch.json();
    setresponce(responce);
  };
console.log(responce.status);
  return (
    <div>
      {userType === "admin" ? (
        <>
          <header className="sticky top-0 z-10 shadow-lg">
            <div className="cart bg-gray-100 w-full flex justify-between  py-2 px-2 ">
              <Link to={"/productpage"}>
                <div className="brand py-2 cursor-pointer hover:bg-red-300 rounded-full">
                  <img
                    className="w-6 md:w-10 lg:w-10 rounded-full"
                    src="https://play-lh.googleusercontent.com/_NYDMvdkuy3sPtWeBN7O7FbQ__0q0kmt52fwTMNgRHVFKjtY2eFp-LF0MBKGJ0SpQJY"
                    alt=""
                  />{" "}
                </div>
              </Link>

              <div className=" py-2  text-red-600 text-2xl font-bold">
                {/* {fetchedProduct.name} */}
                ADMIN
              </div>

              <div className="cartimg bg-gray-300 h-8 mt-1  px-2 rounded-2xl space-x-2 flex cursor-pointer">
                <div
                  className="cart-img-count bg-purple-600 hover:bg-purple-500 active:bg-gray-100  rounded-xl flex  font-bold text-white px-1 "
                  onClick={() => navigate("/cart")}
                >
                  <img
                    className="w-4 md:w-6 lg:w-6 animate-pulse"
                    src="https://www.svgrepo.com/show/250780/ecommerce.svg"
                    alt=""
                  />
                  <div className="itemcount w-4 md:w-6 lg:w-6 py-1">
                    {cartItems.length}
                  </div>
                </div>

                <div className="logoutbtn w-auto md:w-auto lg:w-auto px-1  py-1 rounded-xl font-bold text-white  bg-blue-400  hover:bg-blue-500 active:bg-gray-200">
                  {userLogin && <button onClick={handleLogout}> Logout</button>}
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="admin bg-gray-200 md:text-3xl sm:text-3xl lg:text-3xl flex flex-col items-center ">
  <h1 className="my-2 bg-gray-400 w-full text-center  font-bold ">Add Product</h1>
              <form action="" onSubmit={onProductSubmit} 
              className=" space-y-6 my-7"
              >
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                  className="flex flex-col my-1"
                    id="name"
                    type="text"
                    required
                    value={inpName}
                    onChange={(e) => setInpName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                  className="flex flex-col my-1 space-between"

                    id="price"
                    type="number"
                    required
                    value={inpPrice}
                    min={0}
                    onChange={(e) => setInpPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                  className="flex flex-col my-1 space-between"

id="description"
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="image">Image URL</label>
                  <input
                  className="flex flex-col my-1 space-between"

id="image"
                    type="text"
                    value={image}
                    required
                    onChange={(e) => setimage(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <input
                  className="flex flex-col my-1 space-between"

                    id="category"
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="seller">Seller</label>
                  <input
                  className="flex flex-col my-1 space-between"

                    id="seller"
                    type="text"
                    required
                    value={seller}
                    onChange={(e) => setseller(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="seller">Stock</label>
                  <input
                  className="flex flex-col my-1 space-between"

                    id="stock"
                    type="number"
                    required
                    value={stock}
                    min={0}

                    onChange={(e) => setstock(e.target.value)}
                  />
                </div>

                <div className="bg-yellow-400 text-center font-bold rounded-xl cursor-pointer py-1 px-1" >
                  <button type="submit"> Submit</button>
                </div>
              </form>
            </div>
          </main>
        </>
      ) : (<>
        <Notauth/>
        </>
      )}
    </div>
  );
}

export default Hoc(Admin);

//{
// "_id": {
//     "$oid": "65b7ee0d11d6c40eeb41f131"
//   },
//   "name": "PTron Newly Launched Tangent Sports, 60Hrs Playtime",
//   "price": 15.46,
//   "description": "Gigantic 60 + Hours of music playtime on a single charge; BT5.2 Wireless headphones with ENC (Environmental Noise Cancellation) Technology to enhance your voice quality over the voice calls",
//   "ratings": 5,
//   "images": [
//     {
//       "image": "/images/products/4.jpg"
//     }
//   ],
//   "category": "Headphones",
//   "seller": "Amazon",
//   "stock": 4
// }
