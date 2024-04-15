import { getGenreList } from "./Api.js";

const img_URL = "https://image.tmdb.org/t/p/w500";

const createCards = async (array) => {
  const divHolder = document.getElementById("looked-up-holder");
  const arrayOfGenres = await getGenreList();
  array.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const listOfMovies = arrayOfGenres.genres
      .filter((item) => result.genre_ids.includes(item.id))
      .map((item) => item.name);
    card.innerHTML = `
    <img src="${img_URL}${result.poster_path}" alt="poster">
    <div>
    <h3>${result.title}</h3>
    <div>${result.vote_average}</div>
    </div>`;
    divHolder.appendChild(card);
    const p = document.createElement("p");
    listOfMovies.forEach((genre, index) => {
      if (index == arrayOfGenres.length - 1) {
        p.textContent += `${genre}`;
      }
      p.textContent += `${genre}, `;
      card.appendChild(p);
    });
  });
};

export default createCards;
