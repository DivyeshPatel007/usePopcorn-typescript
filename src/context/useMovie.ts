import { useContext } from "react";
import { MovieContext } from "./MovieContext";

function useMovie() {
    const context = useContext(MovieContext);
    if (context === undefined)
      throw new Error("MovieContext is used outside MovieProvider");
    return context;
  }
  
  export { useMovie };