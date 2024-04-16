import { searchMovies } from "./Api.js";
import showMovieInfo from "./MovieInfo.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = document.getElementById("looked-up-holder");

const handleSearch = () => {
  searchMovies(searchInput.value);
};

btn.addEventListener("click", handleSearch);
divWithCards.addEventListener("click", showMovieInfo, false);
