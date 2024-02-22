import  { ChangeEvent } from "react";
import { useMovie } from "../context/useMovie";

function Search() {

  const {query,setQuery}=useMovie()
  
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(() => e.target.value);
  }

  return (
    <input
      //   ref={inputEL}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleSearch}
    />
  );
}

export default Search;
