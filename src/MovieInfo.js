const showMovieInfo = async (e) => {
  if (e.target.className === "card") {
    console.log(e.target.id);
  }
};

export default showMovieInfo;
