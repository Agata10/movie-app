import { getGenreList } from "./Api.js";

const img_URL = "https://image.tmdb.org/t/p/w500";

export const createCards = async (array) => {
  const divHolder = document.getElementById("looked-up-holder");

  array.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `_${result.id}`);
    card.innerHTML = `
    <img src="${img_URL}${result.poster_path}" alt="poster">
    <div>
    <h3>${result.title}</h3>
    <div>${result.vote_average}</div>
    </div>`;
    appendGenres(result, card);
    divHolder.appendChild(card);
  });
};

export const appendGenres = async (resultArr, parent) => {
  const arrayOfGenres = await getGenreList();
  const listOfMovies = arrayOfGenres.genres
    .filter((item) => resultArr.genre_ids.includes(item.id))
    .map((item) => item.name);
  const p = document.createElement("p");
  listOfMovies.forEach((genre, index) => {
    if (index == arrayOfGenres.length - 1) {
      p.textContent += `${genre}`;
    }
    p.textContent += `${genre}, `;
    parent.appendChild(p);
  });
};
