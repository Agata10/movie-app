const img_URL = "https://image.tmdb.org/t/p/w500";
export const createCards = (array) => {
  const divHolder = document.getElementById("looked-up-holder");
  array.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
 
    <img src="${img_URL}${result.poster_path}" alt="poster">
    <div>
    <h3>${result.original_title}</h3>
    <div>${result.vote_average}</div>
    </div>`;
    divHolder.appendChild(card);
  });
};
