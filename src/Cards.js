import { getGenreList } from "./Api.js";

const img_URL = "https://image.tmdb.org/t/p/w500";

export const createCards = async (array, divHolder) => {
  array.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `_${result.id}`);
    let url;
    if (result.poster_path === null) {
      url = "../src/assets/images/no-pic.png";
      //card.querySelector("img").style.width = "150px";
    } else {
      url = `${img_URL}${result.poster_path}`;
    }
    card.innerHTML = `
    <img src="${url}" alt="poster" id='img-holder'>
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
    if (index == listOfMovies.length - 1) {
      p.textContent += `${genre}`;
    } else {
      p.textContent += `${genre}, `;
    }
    parent.appendChild(p);
  });
};
