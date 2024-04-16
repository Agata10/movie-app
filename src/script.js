import { searchMovies, getTokenForSession } from "./Api.js";
import showMovieInfo from "./MovieInfo.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = document.getElementById("looked-up-holder");

async function onLoad() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    await getTokenForSession();
  }
}

const handleSearch = () => {
  searchMovies(searchInput.value);
};

btn.addEventListener("click", handleSearch);
divWithCards.addEventListener("click", showMovieInfo, false);
onLoad();
