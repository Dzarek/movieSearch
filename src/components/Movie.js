import React from "react";
import { IMAGE_URL } from "../Config";
import { BsEyeFill } from "react-icons/bs";

const IMG_API = `${IMAGE_URL}w1280`;

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "lightgreen";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "darkred";
  }
};

const Movie = ({ title, poster_path, overview, vote_average }) => {
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
      <BsEyeFill className="icon" />
      <span
        className="votesNumber"
        style={{ color: `${setVoteClass(vote_average)}` }}
      >
        {vote_average}
      </span>
      <div className="movie-info">
        <h3>{title}</h3>
      </div>
      <div className="movie-over">
        <h2>Opis:</h2>
        <p>{overview ? overview : "Brak szczegółów w bazie danych."}</p>
      </div>
    </div>
  );
};

export default Movie;
