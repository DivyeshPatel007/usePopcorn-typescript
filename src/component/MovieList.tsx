import { useMovie } from "../context/useMovie";
import MovieProps from "../interface/interface";
import Movie from "./Movie";

interface MovieList {
  movies: MovieProps[];
}

function MovieList() {
  const { movies } = useMovie();
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

export default MovieList;
