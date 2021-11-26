import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AllMovies from "./components/AllMovies";
import SingleMovie from "./components/SingleMovie";
import { ScrollToTop } from "react-router-scroll-to-top";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AllMovies />}></Route>
        <Route path="/:movieId" element={<SingleMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
