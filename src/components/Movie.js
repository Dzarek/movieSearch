import React, { useState } from "react";
import { IMAGE_URL } from "../Config";
import { FaWindowClose } from "react-icons/fa";
import { IoEnter } from "react-icons/io5";
import { GrTextAlignFull } from "react-icons/gr";
import { Link } from "react-router-dom";

const IMG_API = `${IMAGE_URL}w500`;

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "darkgreen";
  } else if (vote >= 6) {
    return "darkorange";
  } else {
    return "darkred";
  }
};

const Movie = ({ title, poster_path, overview, vote_average, id }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_960_720.jpg"
        }
        alt={title}
      />
      <div className="icons">
        {showInfo ? (
          <FaWindowClose
            onClick={() => setShowInfo(!showInfo)}
            className="icon"
          />
        ) : (
          <GrTextAlignFull
            onClick={() => setShowInfo(!showInfo)}
            className="icon"
          />
        )}
        <Link to={`/${id}`} state={{ id: id }}>
          <IoEnter className="icon" />
        </Link>
      </div>
      <span
        className="votesNumber"
        style={{ color: `${setVoteClass(vote_average)}` }}
      >
        {vote_average}
      </span>
      <div className="movie-info">
        <h3>{title}</h3>
      </div>
      <div
        className="movie-over"
        style={
          showInfo
            ? { transform: `translateY(0%)` }
            : { transform: `translateY(110%)` }
        }
      >
        <h2>Opis:</h2>
        <p>{overview ? overview : "Brak szczegółów w bazie danych."}</p>
      </div>
    </div>
  );
};

export default Movie;
