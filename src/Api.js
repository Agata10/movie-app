import { createCards } from "./Cards.js";
import { showFavMovies } from "./MovieInfo.js";
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
  }
};

export const searchMovies = async (input) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}&page=1`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const movies = await response.json();
    return movies.results;
  } catch (err) {
    console.error(err);
  }
};

export const getInfoAboutMovie = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getMovieCast = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const deleteFavMovie = async (movie_id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/21215550/favorite?api_key=${API_KEY}&session_id=${localStorage.getItem(
        "authToken"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          media_type: "movie",
          media_id: movie_id,
          favorite: false,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const addToFavourite = async (movie_id) => {
  try {
    // const session = await exchangeTokenForSessionId(token);
    const favMovies = await getFavouritesMovies();
    const ismovie = favMovies.find((item) => {
      if (item.id == movie_id) return true;
    });
    if (ismovie) {
      console.log(movie_id);
      console.log(ismovie);
      const del = await deleteFavMovie(movie_id);
      return del;
    } else {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/21215550/favorite?api_key=${API_KEY}&session_id=${localStorage.getItem(
          "authToken"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            media_type: "movie",
            media_id: movie_id,
            favorite: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error with status code ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getTokenForSession = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=87e385fc6f59005274b365c73a2eac08`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error with status code  ${response.status}`);
      }
      const data = await response.json();
      window.open(
        `https://www.themoviedb.org/authenticate/${data.request_token}`
      );
      localStorage.setItem("token", data.request_token);
      return data.request_token;
    } catch (err) {
      console.error(err);
    }
  } else {
    return token;
  }
};

export const exchangeTokenForSessionId = async (requestToken) => {
  try {
    const tokenAuth = localStorage.getItem("authToken");
    if (!tokenAuth) {
      const body = { request_token: `${requestToken}` };
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=87e385fc6f59005274b365c73a2eac08`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error(`Error with status code  ${response.status}`);
      }
      const sessionID = await response.json();
      localStorage.setItem("authToken", sessionID.session_id);
      return sessionID.session_id;
    } else {
      return tokenAuth;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getFavouritesMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/21215550/favorite/movies?api_key=${API_KEY}&page=1&sort_by=created_at.asc&session_id=${localStorage.getItem(
        "authToken"
      )}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error with status code  ${response.status}`);
    }
    const favs = await response.json();
    return favs.results;
  } catch (err) {
    console.error(err);
  }
};
