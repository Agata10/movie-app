import { searchMovie } from "./Api.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");

const handleSearch = () => {
  searchMovie(searchInput.value);
};

btn.addEventListener("click", handleSearch);
