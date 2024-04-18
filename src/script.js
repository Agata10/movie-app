import {
  searchMovies,
  getTokenForSession,
  exchangeTokenForSessionId,
  getTrendingMovies,
} from "./componentes/Api.js";
import { createCards } from "./componentes/Cards.js";
import showMovieInfo, { showFavMovies } from "./componentes/MovieInfo.js";
const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const divWithCards = document.getElementById("looked-up-holder");
const divWithFavs = document.getElementById("favourites");
const carouselInner = document.querySelector(".carousel-inner");
const img_URL = "https://image.tmdb.org/t/p/w500";
let token;

const appendCarouselElement = async (array) => {
  const carouselItem = createCarouselElement();
  const holder = document.createElement("div");
  if (document.querySelector(".carousel-holder")) {
    holder.classList.add("carousel-holder2");
  } else {
    holder.classList.add("carousel-holder");
  }
  await createCards(array, holder);
  carouselItem.appendChild(holder);
  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) carouselItem.classList.add("active");
  carouselInner.appendChild(carouselItem);
};

const createCarouselElement = () => {
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");
  return carouselItem;
};

async function onLoad() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    token = await getTokenForSession();
  }
  const theMostTrend = await getTrendingMovies();
  console.log(theMostTrend.slice(5, 10));
  const _5firstMovies = theMostTrend.slice(0, 5).map((obj) => {
    return { ...obj };
  });
  const _5lastMovies = theMostTrend.slice(5, 10).map((obj) => {
    return { ...obj };
  });
  await appendCarouselElement(_5firstMovies);
  await appendCarouselElement(_5lastMovies);
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
