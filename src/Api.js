// import dotenv from "dotenv";
// dotenv.config();
import { createCards } from "./Card.js";
const API_KEY = "87e385fc6f59005274b365c73a2eac08";

// export default API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const searchMovie = async (input) => {
  await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}&page=1`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error with status code  ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      createCards(response.results);
      return response;
    })
    .catch((err) => console.error(err));
};
