import { useEffect, useState } from "react";
import Movie from "./Movie";
import { API_KEY, API_URL } from "../Config";
import spinner from "../images/spinner.gif";
import spinner2 from "../images/spinner2.gif";

function AllMovies() {
  const SEARCH_API = `${API_URL}search/movie?&api_key=${API_KEY}&language=pl-PL&query=`;
  const FEATURED_API = `${API_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pl-PL&page=1`;
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const getData = async (API) => {
    setLoading(true);
    const moviesResponse = await fetch(API);
    const moviesR = await moviesResponse.json();
    setMovies([...movies, ...moviesR.results]);
    setCurrentPage(moviesR.page);
    setLoading(false);
  };
  useEffect(() => {
    getData(FEATURED_API);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (searchTerm) {
      // ONE WAY
      // const moviesResponse = await fetch(SEARCH_API + searchTerm);
      // const moviesR = await moviesResponse.json();
      // setMovies(moviesR.results);

      // SECOND WAY
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }
  };

  // const handleOnChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  const handleClickBtn = () => {
    let endpoint = `${API_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pl-PL&page=${
      currentPage + 1
    }`;
    getData(endpoint);
  };
  return (
    <>
      <header>
        <img className="loader2" src={spinner} alt="" />
        <div>
          <h2>Wyszukiwarka Filmów</h2>
          <form onSubmit={handleOnSubmit} action="">
            <input
              type="text"
              placeholder="szukaj..."
              className="search"
              value={searchTerm}
              onChange={handleOnSubmit}
            />
          </form>
        </div>
      </header>

      <div className="movie-container">
        {movies &&
          movies.map((movie) => {
            return <Movie key={movie.id} {...movie} />;
          })}
      </div>
      {loading ? (
        <div className="loader">
          <img className="loader" src={spinner2} alt="" />
          <h2>Wczytywanie...</h2>
        </div>
      ) : (
        <button className="seeMoreBtn" onClick={handleClickBtn}>
          zobacz więcej
        </button>
      )}
    </>
  );
}

export default AllMovies;
