import React from "react";
import { useState } from "react";
import loginresim from "../image/antalya.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate()

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
        firstName,
        lastName,
      );
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      })
      navigate(`/`);
      toastSuccessNotify("Registered successfully")
      console.log(user);
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
    
  };

  return (
    <div className="d-flex">
      <div class="flex-shrink-0 d-none d-md-block">
        <img
          src={loginresim}
          style={{ width: "1000px", height: "700px" }}
          alt="loginresim"
        />
      </div>
      <form className="mt-5 ms-5" onSubmit={handleSubmit}>
        <h2>REGISTER</h2>
        <div className="d-flex align-items-start flex-column mb-5 mt-5">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />

          <label htmlFor="">Password</label>
          <input
            type="Password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
        </div>
        <div className="d-flex align-items-start flex-column">
          <button className="mb-4 btn btn-outline-success" onSubmit={register}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
