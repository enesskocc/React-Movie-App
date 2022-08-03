import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppRouter = () => {

  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
  }

  
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
