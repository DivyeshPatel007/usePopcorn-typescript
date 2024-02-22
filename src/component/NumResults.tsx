import { useMovie } from "../context/useMovie";



function NumResults() {
  const {movies}=useMovie()
  return (
    <p className="num-results">
      Found <strong>{movies.length ? movies.length : 0}</strong> results
    </p>
  );
}

export default NumResults;
