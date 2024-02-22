import "./App.css";
import Box from "./component/Box";
import ErrorMessage from "./component/ErrorMessage";
import Loader from "./component/Loader";
import Main from "./component/Main";
import MovieList from "./component/MovieList";
import Navbar from "./component/Navbar";
import NumResults from "./component/NumResults";
import Search from "./component/Search";
import SelectedMovies from "./component/SelectedMovies";
import WatchedMoviesList from "./component/WatchedMoviesList";
import WatchedSummary from "./component/WatchedSummary";
import { useMovie } from "./context/useMovie";


function App() {


  const { isLoading, error, selectedID } = useMovie();
  return (
    <>
      <Navbar>
        <Search />
        <NumResults />
      </Navbar>
      <Main>
        <Box>
        {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList />
          )}
          {error && <ErrorMessage/>}
        </Box>

        <Box>
          {selectedID ? (
            <SelectedMovies/>
          ) : (
            <>
              <WatchedSummary />
              <WatchedMoviesList />
            </>
          )}
          {selectedID && (
            <SelectedMovies/>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
