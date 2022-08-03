import React from "react";
import { useState } from "react";
import loginresim from "../image/antalya.jpg";
import { auth } from "../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, forgotPassword, } from "../auth/firebase";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

const Login = () => {
  let navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const Login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      toastSuccessNotify("Logged in successfully")
      // sessionStorage.setItem("user", JSON.stringify(user.user))
      navigate(`/`);
      console.log(user);
    } catch (error) {
      toastErrorNotify(error.message);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login();
    console.log(loginEmail, loginPassword);
  };



  return (
    <div className="d-flex ">
      <div className="flex-shrink-0 d-none d-md-block">
        <img
          src={loginresim}
          style={{ width: "1000px", height: "700px" }}
          alt="loginresim"
        />
      </div>
      <div>
      <form className="mt-5 ms-5" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="d-flex align-items-start flex-column mb-5 mt-5">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />

          <label htmlFor="">Password</label>
          <input
            type="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <button className="btn btn-secondary btn-sm mb-3" onClick={()=>forgotPassword(loginEmail)}>
            Forgot Password?
          </button>
        </div>
        <div className="d-flex align-items-start flex-column">
          <button className="mb-4 btn btn-outline-success" onSubmit={Login}>
            LOGIN
          </button>
          
        </div>
      </form>
      <button
          
            className="btn btn-outline-success mx-5"
            onClick={()=>signInWithGoogle(navigate)}
          >
            LOGIN WITH GOOGLE
          </button>
          </div>
    </div>
  );
};

export default Login;
