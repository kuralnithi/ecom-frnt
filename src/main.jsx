import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { store } from "./Features/Store.jsx";
import Hoc from "./components/userlogin/Hoc.jsx";
import './styles/index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
 
 <Provider store={store}>
 <BrowserRouter>
   <GoogleOAuthProvider clientId="134806645826-14d8k7eltt71qtbrkqa44gb5h6878e3a.apps.googleusercontent.com">  
    <App />
    <Hoc/>
    </GoogleOAuthProvider>
 
  </BrowserRouter>
  </Provider>
);
