import React from 'react'
import { useMovie } from '../context/useMovie';
import WatchedMovie from './WatchedMovie';

function WatchedMoviesList() {
  const {watched}=useMovie()
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList