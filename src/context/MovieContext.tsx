/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useEffect, useState } from "react";
import Movie from "../interface/interface";
import { KEY } from "../constant";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface MovieContextProps {
  selectedID: string | null;
  setSelectedID: React.Dispatch<React.SetStateAction<string | null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  movies: Movie[];
  isLoading: boolean;
  error: string;
  onSelectedMovie: (id: string) => void;
  onCloseMovie: () => void;
  onAddWatched: (movie: Movie) => void;
  onDeleteWatched:(id:string)=>void;
  watched: Movie[];
}
export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

interface MovieProviderProps {
  children: ReactNode;
}

export default function MovieProvider({ children }: MovieProviderProps) {
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [watched, setWatched] = useLocalStorageState<Movie[]>([], "watched");

  function handleSelectedMovies(id: string) {
    setSelectedID((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie: Movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id:string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    async function fetchMovies() {
      setIsLoading(true);
      try {
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok)
          throw new Error("Something went Wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movies not found");
        setMovies(data.Search);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    const timeout = setTimeout(() => {
      fetchMovies();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);
  return (
    <MovieContext.Provider
      value={{
        selectedID,
        setSelectedID,
        query,
        setQuery,
        movies,
        isLoading,
        error,
        onSelectedMovie: handleSelectedMovies,
        onAddWatched: handleAddWatched,
        onCloseMovie: handleCloseMovie,
        onDeleteWatched:handleDeleteWatched,
        watched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
