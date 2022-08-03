import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

const IMG_API = "https://image.tmdb.org/t/p/w1280";


const MovieCard = ({ result }) => {
  // console.log(result);

  const { currentUser } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleDetail = () => {
    !currentUser && toastWarnNotify("please log in to see details");
    navigate(`/details/${result.id}`);
  };

  const handleVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div className=" movie">
      <div
        className="card"
        style={{ width: "18rem" }}
        onClick={handleDetail}
      >
        <img
          src={result.poster_path && IMG_API + result.poster_path}
          className="card-img-top"
          alt="..."
        />
        <div>
          <h5 className="card-title">{result.title}</h5>
          {currentUser && (
          <span className={`tag ${handleVoteClass(result.vote_average)} `}>
            {result.vote_average}
          </span>
        )}
        </div>
        <div className="card-body movie-over">
        <h2>Overview</h2>
          <p className="card-text ">{result.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
