import { useEffect, useState } from "react";
import { KEY } from "../constant";
import { useMovie } from "../context/useMovie";
import MovieProps from "../interface/interface";
import StarRating from "./StarRating";



function SelectedMovies() {

  const {selectedID,onCloseMovie,onAddWatched,watched}=useMovie()


  const [movie, setMovie] = useState<MovieProps>({
    Title: "",
    Year: "",
    Poster: "",
    Runtime: 0,
    imdbRating: 0,
    Plot: "",
    Released: "",
    Actors: "",
    Director: "",
    Genre: "",
    userRating: "",
    imdbID: "",
  });
  const [userRating, setUserRating] = useState(0);
  // const userRating = 0;
  const [isLoading, setIsLoading] = useState(false);
  const isWatched = watched.some((watch) => watch.imdbID === selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchSelectedMovie() {
      setIsLoading(true);
      try {
        // setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        if (!res.ok) throw new Error("Something went Wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movies not found");
        // setMovies(data.Search)
        setMovie(data);
      } catch (error) {
        // setError(error.message)
      } finally {
        setIsLoading(false);
      }
    }
    fetchSelectedMovie();
  }, [selectedID]);


  function handleAddWatched() {
    onAddWatched(
      {
      imdbID: selectedID!, 
      Title: title,
      imdbRating: Number(imdbRating),
      Poster: poster,
      Runtime: Number(runtime.toString().split(" ")[0]),
      userRating,
      Year: year,
    });
    onCloseMovie();
  }
  return (
    <div className="details">
      {isLoading && <p className="loader">Loading...</p>}
      {!isLoading && (
        <>
          <header>
            <button className="btn-back " onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                {" "}
                <span>⭐</span> {imdbRating}{" "}
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAddWatched}>
                    + Add to list
                  </button>
                )}
              </div>
            ) : (
              <p className="rating" style={{ textAlign: "center" }}>
                You rated this movie: {watchedUserRating} ⭐
              </p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovies;
