import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import VideoSection from "../components/VideoSection";

const API_KEY = "d4a444faa410fc9edb750809f6063835";
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieDetail = () => {
  const [detay, setDetay] = useState([]);
  const [videoKey, setVideoKey] = useState();

  const { id } = useParams();
  // console.log(id);

  const moviedetailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`

 

  const getDetails = async () => {
    const data3 = await axios.get(moviedetailsURL);
    setDetay(data3.data);
    const data4 = await axios.get(videoUrl);
    setVideoKey(data4.data.results[0].key)
  };

  useEffect(() => {
    getDetails();
  }, [moviedetailsURL, videoUrl]);

  console.log(detay);

  return (
    <div className="container py-5">
      <h2 className="text-center">{detay.original_title}</h2>

      {videoKey && <VideoSection videoKey={videoKey} />}

      <div className="card mb-3" >
        <div className="row g-0">
          <div className="col-md-4">
            <img src={detay.poster_path && IMG_API + detay.poster_path} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              
              <p className="card-text">
                Overwies : {detay.overview}
              </p>
              <p className="card-text">
                Rate : {detay.vote_average}
              </p>
              <p className="card-text">
              Total Rate : {detay.vote_count}
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
              <li className="list-group-item">
                <Link to={-1} className="card-link">
                  Go Back
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
