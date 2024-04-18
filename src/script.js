import {
  searchMovies,
  getTokenForSession,
  exchangeTokenForSessionId,
} from "./componentes/Api.js";
import { createCards } from "./componentes/Cards.js";
import showMovieInfo, { showFavMovies } from "./componentes/MovieInfo.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = document.getElementById("looked-up-holder");
const divWithFavs = document.getElementById("favourites");
let token;

async function onLoad() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    token = await getTokenForSession();
  }
}

const handleSearch = async () => {
  const movies = await searchMovies(searchInput.value);
  await createCards(movies, document.getElementById("looked-up-holder"));
};

onLoad();
showFavMovies();
//remove search cards when user delete input
searchInput.addEventListener("input", async (e) => {
  await exchangeTokenForSessionId(token);
  if (e.target.value === "") {
    while (divWithCards.firstChild) {
      divWithCards.removeChild(divWithCards.firstChild);
    }
  }
});
//handle enter
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btn.focus();
    btn.click();
  }
});

btn.addEventListener("click", handleSearch);
divWithCards.addEventListener("click", async (e) => {
  document.getElementById("add-fav-btn").style.backgroundColor =
    "rgb(255, 196, 0, 1)";
  await showMovieInfo(e);
});

divWithFavs.addEventListener("click", async (e) => {
  document.getElementById("add-fav-btn").style.backgroundColor =
    "rgb(255, 196, 0, 0.7)";
  await showMovieInfo(e);
});
