import { useMovie } from "../context/useMovie";

function ErrorMessage() {
  const { error: message } = useMovie();
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export default ErrorMessage;
