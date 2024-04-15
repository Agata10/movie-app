import createCards from "./Cards.js";
const API_KEY = "87e385fc6f59005274b365c73a2eac08";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getGenreList = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
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
      createCards(response.results);
      return response;
    })
    .catch((err) => console.error(err));
};

export const getInfoAboutMovie = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
