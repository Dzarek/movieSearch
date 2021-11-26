import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../Config";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBackward, FaStar } from "react-icons/fa";

const SingleMovie = () => {
  const location = useLocation();
  const { id } = location.state;
  const [movie, setMovie] = useState([]);
  const [crews, setCrews] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);
  const IMG_API = `${IMAGE_URL}w1280`;
  const IMG_API2 = `${IMAGE_URL}w300`;

  useEffect(() => {
    fetch(`${API_URL}movie/${id}?api_key=${API_KEY}&language=pl-PL`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);

        fetch(`${API_URL}movie/${id}/credits?api_key=${API_KEY}`)
          .then((res) => res.json())
          .then((res) => {
            setCrews(res.cast);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(movie);
  const handleClick = () => {
    setActorToggle(!actorToggle);
  };
  const {
    backdrop_path,
    title,
    original_title,
    overview,
    genres,
    production_countries,
    release_date,
    runtime,
    vote_average,
    vote_count,
  } = movie;

  const convertMinsToHrsMins = () => {
    let h = Math.floor(runtime / 60);
    let m = runtime % 60;
    return `${h} godz. ${m} min.`;
  };
  console.log(crews);
  return (
    <div className="containerSM">
      <div className="headerSM">
        <img
          src={
            backdrop_path
              ? IMG_API + backdrop_path
              : "https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_960_720.jpg"
          }
          alt={title}
        />
        <div className="title">
          <h2>{title}</h2>
          <p>{original_title}</p>
        </div>
        <Link to="/" className="backToHome">
          <FaBackward />
        </Link>
      </div>
      <div className="votes">
        <div>
          <FaStar className="starIcon" />
          <h1>{vote_average}</h1>
        </div>
        <p>{vote_count} ocen</p>
      </div>
      <div className="allInfo">
        <div className="desc">
          <h3>Opis:</h3>
          <p>{overview ? overview : "Brak szczegółów w bazie danych."}</p>
        </div>
        <div className="othersInfo">
          {genres && (
            <div className="category">
              <h3>Gatunek:</h3>
              <p>
                {genres.map((item, index) => {
                  return <span key={index}>{item.name},</span>;
                })}
              </p>
            </div>
          )}
          {production_countries && (
            <div className="category">
              <h3>Produkcja:</h3>
              {production_countries.map((item, index) => {
                return <p key={index}>{item.name}</p>;
              })}
            </div>
          )}
          <div className="category">
            <h3>Premiera:</h3>
            <p>{release_date}</p>
          </div>
          <div className="category">
            <h3>Czas trwania:</h3>
            <p>{convertMinsToHrsMins()}</p>
          </div>
        </div>
      </div>
      {!actorToggle && (
        <button className="seeMoreBtn" onClick={handleClick}>
          zobacz obsadę
        </button>
      )}
      {actorToggle && (
        <div className="crewsContainer">
          {crews.map((item) => {
            const { profile_path, id, name } = item;
            return (
              <div className="oneCrew" key={id}>
                <img
                  src={
                    profile_path
                      ? IMG_API2 + profile_path
                      : "https://cdn.pixabay.com/photo/2014/04/03/11/50/drama-312318_960_720.png"
                  }
                  alt={name}
                />
                <h3>{name}</h3>
              </div>
            );
          })}
        </div>
      )}
      {actorToggle && (
        <button className="seeMoreBtn" onClick={handleClick}>
          ukryj obsadę
        </button>
      )}
    </div>
  );
};

export default SingleMovie;
