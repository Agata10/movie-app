import { getGenreList } from "./Api.js";

const img_URL = "https://image.tmdb.org/t/p/w500";
export const createCards = async (array, divHolder) => {
  if (divHolder.id === "favourites") {
    while (divHolder.firstChild) {
      divHolder.removeChild(divHolder.firstChild);
    }
  }
  if (divHolder.id === "looked-up-holder") {
    while (divHolder.firstChild) {
      divHolder.removeChild(divHolder.firstChild);
    }
  }
  let i = 0;
  if (divHolder.classList.contains("carousel-holder2")) {
    i = 5;
  }
  array.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `_${result.id}`);
    if (
      divHolder.classList.contains("carousel-holder") ||
      divHolder.classList.contains("carousel-holder2")
    ) {
      const createNumber = document.createElement("div");
      createNumber.textContent = i + 1;
      i++;
      createNumber.classList.add("number");
      card.appendChild(createNumber);
    }
    let url;
    if (result.poster_path === null) {
      url = "../src/assets/images/no-pic.png";
      //card.querySelector("img").style.width = "150px";
    } else {
      url = `${img_URL}${result.poster_path}`;
    }
    card.innerHTML += `
    <img src="${url}" alt="poster" id='img-holder'>
    <div class="title-rank">
    <h3>${result.title}</h3>
    <div>${result.vote_average.toFixed(2)}</div>
    </div>`;
    appendGenres(result, card);
    divHolder.appendChild(card);
  });
};

export const appendGenres = async (resultObj, parent) => {
  const arrayOfGenres = await getGenreList();
  const listOfMovies = arrayOfGenres.genres
    .filter((item) => resultObj.genre_ids.includes(item.id))
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
