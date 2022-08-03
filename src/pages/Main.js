import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";
import MovieDetail from "./MovieDetail";

// const API_KEY = "c82af2a6ab5aff0ebdc7dd229657ef82";
const API_KEY = "d4a444faa410fc9edb750809f6063835";

const Main = () => {
  const [veri, setVeri] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`

 

  const getData = async (url) => {
    const  data1  = await axios.get(url);
    setVeri(data1.data.results);
  };


  useEffect(() => {
    getData(url);
  }, []);
 

  // const getSearch = async (searchURL) => {
  //   const searchdata = await axios.get(searchURL);
  //   setVeri(searchdata.data.results)
  // }

  // console.log(veri);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search && currentUser) {
      getData(searchURL );
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
    } else {
      toastWarnNotify("Please enter a text");
    }
  }

  return (
    <div>

<nav className="navbar bg-light ">
        <div className="container-fluid justify-content-center">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
     
     <div className="cards d-flex flex-wrap justify-content-center">
     {loading ? (
      <div className="spinner-border text-primary m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>) : (
     veri.map((i, index)=>
      <MovieCard result = {i} key={index}/>))}
     </div>
     
    

      
    </div>
  );
};

export default Main;