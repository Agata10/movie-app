import {
  searchMovies,
  getTokenForSession,
  exchangeTokenForSessionId,
} from "./Api.js";
import { createCards } from "./Cards.js";
import showMovieInfo, { showFavMovies } from "./MovieInfo.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = document.getElementById("looked-up-holder");
const divWithFavs = document.getElementById("favourites");
let token;
let session;

async function onLoad() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    token = await getTokenForSession();
  }
}

const handleSearch = async () => {
  const movies = await searchMovies(searchInput.value);
  createCards(movies, document.getElementById("looked-up-holder"));
};

onLoad();
showFavMovies();
//remove search cards when user delete input
searchInput.addEventListener("input", async (e) => {
  session = await exchangeTokenForSessionId(token);
  if (e.target.value === "") {
    while (divWithCards.firstChild) {
      divWithCards.removeChild(divWithCards.firstChild);
    }
  }
});

btn.addEventListener("click", handleSearch);
divWithCards.addEventListener("click", showMovieInfo);
divWithFavs.addEventListener("click", showMovieInfo);

export { session };
