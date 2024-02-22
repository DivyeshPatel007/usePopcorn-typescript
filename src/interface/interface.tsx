export default interface MovieProps {
  imdbID: string;
  Title: string;
  imdbRating: number;
  Poster: string;
  Runtime: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userRating: any; // You can replace 'any' with the specific type of userRating
  Year: string;
  Plot?: string;
  Released?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
}
