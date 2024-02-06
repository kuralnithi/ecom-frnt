import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userValid } from "../../Features/UserSlice";
import { userType } from "../../Features/UserSlice";
import "react-loading-skeleton/dist/skeleton.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  //FORM states
  const [RegUserName, setRegUserName] = useState("");
  const [RegEmailId, setRegEmailId] = useState("");
  const [RegPassword, setRegPassword] = useState("");

  const [LoginEmailid, setLoginEmailid] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [userTypeInp, setUserTypeInp] = useState("");
  console.log("userTypeInp", userTypeInp);
  const [regform, setRegForm] = useState(false);
  const [fgtUser, setFgtUser] = useState(false);

  //................

  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userStore.isValid);
  console.log("useState valid? in LoginPage : ", userAuth);
  const userTypeState = useSelector((state) => state.userStore.userTypeState);
  console.log("user type in Login page", userTypeState);

  const [oResponce, setOresponce] = useState("");

  const [regStatus, setRgStatus] = useState("");
  const [loginStatus, setloginStatus] = useState("");
  const [loginserverStatus, setloginserverStatus] = useState("");
  const [resetMessage, setresetMessage] = useState("");
  const [username, setUsername] = useState("");
  const [emailid, setemailid] = useState("");
  const navigate = useNavigate();

  console.log("recive token  in FE >", token);

  const handleRegUserInp = (e) => {
    setRegUserName(e.target.value);
  };

  const handleRegEmailInp = (e) => {
    setRegEmailId(e.target.value);
  };

  const handleRegPasswordInp = (e) => {
    setRegPassword(e.target.value);
  };

  const handleLoginEmailInp = (e) => {
    setLoginEmailid(e.target.value);
  };

  const handleLoginPasswordInp = (e) => {
    setLoginPassword(e.target.value);
  };
  const handleUserTypeInp = (e) => {
    setUserTypeInp(e.target.value);
  };
  //REG btn

  const handleRegBtn = async (e) => {
    e.preventDefault();
    if (RegUserName == "" || RegEmailId == "" || RegPassword == "") {
      setRgStatus("Please enter the required details");

      setTimeout(() => {
        setRgStatus("");
      }, 3000);
      return;
    }

    const requestBody = JSON.stringify({
      username: RegUserName,
      emailid: RegEmailId,
      password: RegPassword,
      usertype: userTypeInp,
    });

    // https://password-reset-ze4r.onrender.com

    try {
      const regResponce = await fetch(
        "http://localhost:5000/api/user/register",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: requestBody,
        }
      );

      const regResDetails = await regResponce.json();

      const message = regResDetails.message;

      if (regResDetails) {
        setRgStatus(message);
        setRegEmailId("");
        setRegPassword("");
        setRegUserName("");
      }
      console.log("REG STATUS", regStatus);
      setTimeout(() => {
        setRgStatus("");
      }, 3000);
    } catch (error) {
      console.log("error in reg>>", error);
    }
  };

  const handleLoginBtn = async (e) => {
    e.preventDefault();

    if (LoginEmailid == "" || LoginPassword == "") {
      setloginStatus("Please enter the required details");
      setTimeout(() => {
        setloginStatus("");
      }, 3000);

      return;
    }

    const loginRes = await fetch("http://localhost:5000/api/user/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        emailid: LoginEmailid,
        password: LoginPassword,
      }),
    });
    console.log("LOG REG>>>", loginRes);
    const data = await loginRes.json();
    localStorage.setItem("ecom-token", data.token);
    console.log("token setted in local", data.token);
    setToken(localStorage.getItem("ecom-token"));
    console.log("token get from local and updated in setToken()", token);
    setloginserverStatus(data.message);
    setTimeout(() => {
      setloginserverStatus("");
    }, 3000);
    console.log("TOKENNN>>>", data.token);
  };

  const handleChangePassword = async () => {
    try {
      if (LoginEmailid == "") {
        setloginStatus("Please enter the E-mail id of forgetted password");

        setTimeout(() => {
          setloginStatus("");
        }, 3000);

        return;
      }

      const forgetFetch = await fetch(
        "http://localhost:5000/api/resetpassword",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            emailid: LoginEmailid,
          }),
        }
      );

      const responce = await forgetFetch.json();

      if (responce) {
        setresetMessage(responce.message);
        console.log(responce.message);
      }

      if (responce.message == "mail sent successfully to emailid") {
        setLoginEmailid("");
        setLoginPassword("");
        setTimeout(() => {
          navigate("/Preset");
        }, 2000);

        console.log("reset msg>>", resetMessage);
      }

      setTimeout(() => {
        setresetMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [token]);

  const fetchdata = async () => {
    try {
      setToken(localStorage.getItem("ecom-token"));
      console.log("token get from local and updated in setToken()", token);

      const responce = await fetch("http://localhost:5000/api/getuser", {
        method: "get",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      });

      const data = await responce.json();

      if (data.username) {
        console.log("user found__Log in auth successfull", data);
        setUsername(data.username);
        setemailid(data.emailid);
        dispatch(userValid(true));
        dispatch(userType(data.usertype));
        setTimeout(() => {
          navigate("/productpage");
        }, 2000);
      }
    } catch (error) {
      console.log("errorrr>>>>>", error);
    }
  };
  console.log("user name>>", username);
  console.log("email id>>", emailid);

  //Oauth...............................................................

  useEffect(() => {
    const oUser = localStorage.getItem("ecom-oauth");
    if (oUser === "true") {
      dispatch(userValid(true));
      navigate("/productpage");
    } else if (oResponce) {
      localStorage.setItem("ecom-oauth", "true");
      dispatch(userValid(true));
      navigate("/productpage");
    } else {
      localStorage.setItem("ecom-oauth", "false");
    }
  }, [oResponce]);

  //login UI functionality.....................................

  const handleSignUpBtn = () => {
    setRegForm(true);
  };
  const handleAlreadyRegBtn = () => {
    setRegForm(false);
  };

  return (
    <div className=" px-2 ">
      <header>
        {" "}
        <div className="login-heading flex justify-center pt-12 text-xl lg:text-6xl md:lg:text-6xl text-purple-500 font-bold ">
          <span> Welcome to K-Mart</span>
        </div>
      </header>

      <div className="  justify-center login-main-div space-y-2 lg:flex md:flex md:space-x-48  md:pt-4 ">
        <div className=" py-6">
          <img
            className="rounded-full shadow-2xl"
            src="https://img.freepik.com/free-vector/shopaholic-with-text-view-cartoon-people-characters-putting-colourful-boxes-into-car_1284-26784.jpg?w=740&t=st=1707051956~exp=1707052556~hmac=7c9a90685241965e1d44f0f57382c813c5731051a4348c9d8fcc17a6afb72816"
            alt=""
          />
        </div>
        <div className="form  flex flex-col items-center  shadow-2xl  px-2 rounded-full  ">
          <div className="form-heading font-bold  py-12 ">
            {regform ? (
              <h1 className="font-bold font-sans">SIGN UP</h1>
            ) : fgtUser ? (
              <h1> CHANGE PASSWORD </h1>
            ) : (
              <h1>Log in to K-Mart</h1>
            )}
          </div>
          <div hidden={!regform} className="reg-form ">
            <div className="  flex flex-col items-center space-y-4">
              <input
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                type="text"
                value={RegUserName}
                onChange={handleRegUserInp}
                placeholder="Enter usename"
                maxLength={10}
              />

              <input
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                value={RegEmailId}
                onChange={handleRegEmailInp}
                placeholder="Enter EmailId"
                maxLength={30}
              />
              <input
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300"
                type="password"
                value={RegPassword}
                onChange={handleRegPasswordInp}
                placeholder="Enter Password"
                maxLength={20}
              />
              <div className="radio flex space-x-2 font-semibold">
                <label htmlFor="customer">customer</label>
                <input
                  id="customer"
                  name="usertype"
                  type="radio"
                  value="customer"
                  onChange={handleUserTypeInp}
                />

                <label htmlFor="admin">admin</label>

                <input
                  id="admin"
                  name="usertype"
                  type="radio"
                  value="admin"
                  onChange={handleUserTypeInp}
                />
              </div>
              {userType}
            </div>
            <hr />
            <div className="regbtn flex flex-col my-2">
              {" "}
              <button
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 "
                onClick={handleRegBtn}
              >
                register
              </button>
            </div>
            <div className="alreadyreg flex justify-center my-2  text-purple-500 font-bold">
              <button className="" onClick={handleAlreadyRegBtn}>
                Already registered ?
              </button>
            </div>
            {<p>{regStatus}</p>}
          </div>

          <div hidden={regform} className="login-form">
            <div className=" flex flex-col items-center space-y-4 ">
              <input
                type="text"
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                value={LoginEmailid}
                onChange={handleLoginEmailInp}
                placeholder="Enter EmailId"
                maxLength={30}
                required
              />
              <input
                hidden={fgtUser}
                type="password"
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                value={LoginPassword}
                onChange={handleLoginPasswordInp}
                placeholder="Enter Password"
                maxLength={20}
                required
              />
              <div className="">
                <div className="loginbtn flex justify-center">
                  {" "}
                  <button
                    hidden={fgtUser}
                    onClick={handleLoginBtn}
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Login
                  </button>
                </div>
                <button
                  className="text-purple-500 font-bold mx-2"
                  hidden={fgtUser}
                  onClick={handleSignUpBtn}
                >
                  Sign Up ?
                </button>
                <a
                  className=" text-purple-500 font-bold cursor-pointer"
                  hidden={fgtUser}
                  onClick={() => setFgtUser(true)}
                >
                  {" "}
                  Forget password ?{" "}
                </a>
                <button
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    hidden={!fgtUser}
                  onClick={handleChangePassword}
                >
                  {" "}
                  change password{" "}
                </button>
                <a
                  className="text-purple-500 font-bold mx-2 cursor-pointer"
                  hidden={!fgtUser}
                  onClick={() => setFgtUser(false)}
                >
                  {" "}
                  Log-in?{" "}
                </a>
              </div>
              <div className="gLogin bg-gray-200 ">
                <GoogleLogin
                  size="small"
                  onSuccess={async (Credentialresponce) => {
                    const OauthUserFetch = await fetch(
                      "http://localhost:5000/api/oauth",
                      {
                        method: "POST",
                        headers: {
                          "content-type": "application/json",
                          authorization: JSON.stringify(
                            Credentialresponce.credential
                          ),
                        },
                        body: JSON.stringify({
                          usertype: userTypeInp,
                        }),
                      }
                    );

                    const OuthFetchResponce = await OauthUserFetch.json();
                    setOresponce(OuthFetchResponce);
                    console.log(oResponce);

                    const decodeHeader = jwtDecode(
                      Credentialresponce.credential
                    );
                    console.log(decodeHeader);
                    console.log(Credentialresponce);
                  }}
                  onError={() => alert("error google login")}
                />
              </div>
              {<p>{loginStatus}</p>}
              {<p>{loginserverStatus}</p>}
            </div>
            {resetMessage ? <div>{resetMessage}</div> : null}
          </div>
        </div>
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
