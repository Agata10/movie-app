import { searchMovies, getTokenForSession } from "./Api.js";
import { createCards } from "./Cards.js";
import showMovieInfo, { showFavMovies } from "./MovieInfo.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = document.getElementById("looked-up-holder");

async function onLoad() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    await getTokenForSession();
  }
}

const handleSearch = async () => {
  const movies = await searchMovies(searchInput.value);
  createCards(movies, document.getElementById("looked-up-holder"));
};

btn.addEventListener("click", handleSearch);
divWithCards.addEventListener("click", showMovieInfo, false);
onLoad();
showFavMovies();
