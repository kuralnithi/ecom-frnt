import React, { Suspense, lazy } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../Features/Store";
import { Route, Routes, useNavigate } from "react-router-dom";
// import ProductPage from './ProductPage';
// import Cart from './Cart';
// import ProductView from './ProductView';
// import Admin from './Admin';
// import Login from './userlogin/Login';
// import ResetPasswordpage from './userlogin/ResetPasswordpage';
import { userValid } from "../Features/UserSlice";
import Pagenotfound from "./error pages/Pagenotfound";
import Loading from "./loaddingpage/Loading";

export default function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ProductPage = lazy(() => import("./ProductPage"));
  const ProductView = lazy(() => import("./ProductView"));
  const Cart = lazy(() => import("./Cart"));
  const Admin = lazy(() => import("./Admin"));
  const Login = lazy(() => import("./userlogin/Login"));
  const ResetPasswordpage = lazy(() => import("./userlogin/ResetPasswordpage"));


  const routes = (
    <Routes>
      <Route path="/productpage" Component={ProductPage} />
      <Route path="/productview" Component={ProductView} />
      <Route path="/cart" Component={Cart} />
      <Route path="/admin" Component={Admin} />
      <Route path="/" Component={Login} />
      <Route path="/Preset" Component={ResetPasswordpage} />
      <Route path="*" element={<Pagenotfound/>} />
      <Route path="/loading" element={<Loading/>} />

    </Routes>
  );

  return (
    <div className="">
     

      <Suspense fallback={<Loading/>}> {routes} </Suspense>
    </div>
  );
}
