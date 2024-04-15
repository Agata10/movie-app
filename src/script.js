import { searchMovie } from "./Api.js";
import showMovieInfo from "./MovieInfo.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = doccument.getElementById("looked-up-holder");

const handleSearch = () => {
  searchMovie(searchInput.value);
};

btn.addEventListener("click", handleSearch);
divWithCards.addEventListener("click", showMovieInfo);
