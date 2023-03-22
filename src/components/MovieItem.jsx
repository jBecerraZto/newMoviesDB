import { IconStarFilled } from "@tabler/icons-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoviesContext } from "../contexts/MoviesDataContext";
import { langs } from "../utils/languages";
import { observerImgSlider } from "../utils/lazyLoading";

export const MovieItem = ({ movie }) => {
  const movieImage = useRef(null);
  const navigate = useNavigate();
  const { lang } = useMoviesContext();
  const seeMore = (lang == "es" && langs.es.movieItem.see) || "See more";

  const movieName = movie;

  useEffect(() => {
    observerImgSlider.observe(movieImage.current);
  }, []);

  function doubleClickHandler() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className="movieItem ">
      <div className="movieItem__info" onClick={doubleClickHandler}>
        <p className="movieItem__info__title">
          {movieName.title.substring(0, 20)}...
        </p>
        <p className="movieItem__info__des">
          {movie.overview.substring(0, 50)}...
        </p>
        <p className="movieItem__info__link">{seeMore}</p>
        <p className="movieItem__info__note">
          {movie.vote_average} <IconStarFilled size={18} color="red" />
        </p>
      </div>
      <img
        className="skeleton"
        ref={movieImage}
        data-src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
      />
    </div>
  );
};
