import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Features/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
import Hoc from "./userlogin/Hoc";
import { userValid } from "../Features/UserSlice";
import { emptyCart } from "../Features/CartSlice";
import EmptyCart from "./error pages/EmptyCart";

function ProductPage() {
  const userLogin = useSelector((state) => state.userStore.isValid);
  const cartItems = useSelector((state) => state.cartStore.value);
  const [searchInp,setSearchInp] = useState('');
const [trigger,setTrigger] = useState('');
  const navigate = useNavigate();

  const userType = useSelector((state) => state.userStore.userTypeState);
  console.log("user type in product page", userType);

  const dispatch = useDispatch();
  const [fetchedProducts, setFetchedProducts] = useState([]);

  const handleLogout = () => {
    dispatch(userValid(false));
    dispatch(emptyCart())

    localStorage.removeItem("ecom-token");
    localStorage.removeItem("ecom-oauth");
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, [trigger]);

  const fetchProducts = async () => {
    const responce = await fetch("https://ecom-server-73yx.onrender.com/api/products");
    const resproducts = await responce.json();
    await dispatch(fetchData(resproducts.products));
  };

  const products = useSelector((state) => state.productStore.value);  
  console.log(products);

const handleSearchClick = () =>{

const searchProducts = products.filter(product => product.name.toLowerCase().startsWith(searchInp.toLocaleLowerCase()));

dispatch(fetchData(searchProducts));
if(searchProducts.length==0){
  fetchProducts()
}
}

  return (
    <div className="">
      <header className="s  ticky top-0 z-10 shadow-lg"  >
        <div className="cart bg-gray-100 w-full flex justify-between  py-2 px-2 ">
          <div className="brand py-2 cursor-pointer hover:bg-red-300 rounded-full" onClick={()=>setTrigger(Math.random())}>
           <img 
              className="w-6 md:w-10 lg:w-10 rounded-full"
              src="https://play-lh.googleusercontent.com/_NYDMvdkuy3sPtWeBN7O7FbQ__0q0kmt52fwTMNgRHVFKjtY2eFp-LF0MBKGJ0SpQJY"
              alt=""
            />
          </div>
          <div className="search-bar py-2  text-red-600 font-bold">
            <form>
              <div className=" bg-gray-200  rounded  ">
                <div className=" flex ">
                  <svg onClick={handleSearchClick}
                   className="cursor-pointer w-3 md:w-7 lg:w-7 pt-2 h-4 md:h-8 lg:h-8  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
                  <input
                    type="search"
                    className=" font-thin md:w-96 lg:w-96 pl-2 md:py-2 lg:py-2 rounded"
                    placeholder=" search products"
                    onKeyDown={(e)=>{   e.key=="Enter" && e.preventDefault();} }
                    onChange={(e)=>setSearchInp(e.target.value)}
                  />
                </div>
              </div>
            </form>
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
              <div className="itemcount w-4 md:w-6 lg:w-6 py-1">{cartItems.length}</div>
            </div>

            <div className="logoutbtn w-auto md:w-auto lg:w-auto px-1  py-1 rounded-xl font-bold text-white  bg-blue-400  hover:bg-blue-500 active:bg-gray-200">
              {userLogin && <button onClick={handleLogout}> Logout</button>}
            </div>
          </div>
        </div>
      </header>
      {userType === "admin" && (
     <div className="admin flex justify-center animate-pulse my-2">     <Link to={`/admin`} 
      className="bg-red-600 text-white rounded px-2 py-2  font-bold cursor-pointer hover:bg-red-500 active:bg-red-800"
      >
          
       Go to  Admin controll
        </Link>
        </div>

      )}
<div className="shopping-cartoon flex justify-center">
  <img src="https://img.freepik.com/free-vector/people-run-sale-store-mall-market_107791-15610.jpg?w=826&t=st=1707149654~exp=1707150254~hmac=16c8ed677c91030c50281b1c214731e2c853c99703cde05b444ef09f21f3cf86" alt="" />
</div>
      <div className="productslistdiv grid   place-items-center  md:grid-cols-2 lg:grid-cols-3   py-8 ">     
        
       {products.length !== 0 ? (
        products.map((product) => {
          return (
            <>
              <div className="group w-52 md:w-78 lg:w-78 md:h-96 lg:h-96 justify-between flex flex-col  items-center rounded-2xl px-2 my-8 py-2 shadow-2xl space-y-2    duration-200 ">

                <div className="pimg h-56 flex flex-col justify-center group-hover:p-3 duration-200">
                  <img src={product.image} />
                </div>
                <div className="bg-gray-200 w-full text-center rounded">{product.name}</div>

                <div>{`₹ ${product.price}`}</div>

                <Link to={`/productview?id=${product._id}`}>
                  <button className="bg-purple-600 text-white font-bold rounded px-2 cursor-pointer hover:bg-purple-500 active:bg-purple-800"> Buy now</button>
                </Link>
              </div>
              
            </>
          );
        })
      ) : (
        <>  
        <EmptyCart/>
        
        </>
      )}
    </div>

    <footer class="bg-white dark:bg-gray-900 mt-12">
        <hr />

        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a class="flex items-center">
                <img
                  src="https://play-lh.googleusercontent.com/_NYDMvdkuy3sPtWeBN7O7FbQ__0q0kmt52fwTMNgRHVFKjtY2eFp-LF0MBKGJ0SpQJY"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  K - Mart
                </span>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a class="hover:underline">Flowbite</a>
                  </li>
                  <li>
                    <a class="hover:underline">Tailwind CSS</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a class="hover:underline ">Github</a>
                  </li>
                  <li>
                    <a class="hover:underline">Discord</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024 <a class="hover:underline">K - Mart</a>. All Rights
              Reserved.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span class="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">GitHub account</span>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default Hoc(ProductPage);
