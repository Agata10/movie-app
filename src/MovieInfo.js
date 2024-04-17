import {
  getInfoAboutMovie,
  addToFavourite,
  getFavouritesMovies,
} from "./Api.js";
import { createCards } from "./Cards.js";
const img_URL = "https://image.tmdb.org/t/p/w500";

export const showFavMovies = async () => {
  const favMovies = await getFavouritesMovies();
  if (favMovies) {
    console.log(favMovies);
    document.getElementById("favourites-holder").style.display = "flex";
    createCards(favMovies, document.getElementById("favourites"));
  } else {
    document.getElementById("favourites-holder").style.display = "none";
  }
};

const showMovieInfo = async (e) => {
  const dialog = document.querySelector("dialog");
  const title = document.getElementById("title");
  const ranking = document.getElementById("ranking");
  const description = document.getElementById("description");
  const genres = document.getElementById("genres");
  const date = document.getElementById("date");
  const country = document.getElementById("country");
  const duration = document.getElementById("duration");
  const img = dialog.querySelector("img");
  const addFavBtn = document.getElementById("add-fav-btn");

  const card = e.target.closest(".card");
  const closeBtn = document.getElementById("close");
  if (card) {
    const info = await getInfoAboutMovie(card.id.slice(1));
    dialog.showModal();

    img.setAttribute("src", `${img_URL}${info.poster_path}`);
    document.querySelector("main").style.filter = "blur(2px)";
    title.textContent = info.title;
    ranking.textContent = Number(info.vote_average).toFixed(2);
    description.textContent = info.overview;
    const genresInfo = info.genres.map((item) => item.name);
    genresInfo.forEach((g, index) => {
      if (index === genresInfo.length - 1) {
        genres.textContent = `${g}`;
      } else {
        genres.textContent = `${g}, `;
      }
    });
    date.textContent = info.release_date;
    const hours = info.runtime / 60;
    const rhours = Math.floor(hours);
    const min = Math.round((hours - rhours) * 60);
    duration.textContent = `${rhours}h ${min}min`;
    const countries = info.production_countries.map((item) => item.name);
    countries.forEach((c, index) => {
      if (index === countries.length - 1) {
        country.textContent = `${c}`;
      } else {
        country.textContent = `${c}, `;
      }
    });

    closeBtn.addEventListener("click", () => {
      dialog.close();
      document.querySelector("main").style.filter = "blur(0px)";
      showFavMovies();
    });

    addFavBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToFavourite(card.id.slice(1));
      showFavMovies();
    });
  }
};

export default showMovieInfo;
