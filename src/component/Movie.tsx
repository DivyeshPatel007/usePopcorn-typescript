import { useMovie } from "../context/useMovie";
import MovieProps from "../interface/interface";

interface MovieType {
  movie: MovieProps;
}

function Movie({ movie }: MovieType) {
  const { onSelectedMovie } = useMovie();

  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
  );
}

export default Movie;
