import React, { useState, useRef, useEffect } from "react";
import MovieForm from "./MovieForm";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeRef = useRef();
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-c3db2-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    fetchMoviesHandler();
  }, []);
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-c3db2-default-rtdb.firebaseio.com/movies.json",
      );
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }
      const data = await response.json();
      const loadedMovied = [];
      for (let key in data) {
        loadedMovied.push({
          id: key,
          title: data[key].title,
          opening_crawl: data[key].openingText,
          release_date: data[key].releaseDate,
        });
      }
      setMovies(loadedMovied);
    } catch (error) {
      setError(error.message);
      timeRef.current = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    }
    setIsLoading(false);
  };
  const cancelRetryHandler = () => {
    setError(null);
    setIsLoading(false);
    clearTimeout(timeRef.current);
  };
  const DeleteMovieHandler = async (id) => {
    const response = await fetch(
      `https://react-http-c3db2-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      },
    );
    setMovies((prevMovies) =>
      prevMovies.filter((element) => element.id !== id),
    );
  };
  return (
    <>
      <MovieForm onMovieAdd={addMovieHandler} />
      <h1>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && error && (
        <button onClick={cancelRetryHandler}>Cancel</button>
      )}
      {!isLoading && !error && movies.length === 0 && (
        <p>No movies found... </p>
      )}
      <div>
        <ul>
          {!isLoading &&
            movies.length > 0 &&
            movies.map((element) => (
              <li key={element.id}>
                <h2>{element.title}</h2>
                <h3>{element.release_date}</h3>
                <p>{element.opening_crawl}</p>
                <button onClick={() => DeleteMovieHandler(element.id)}>
                  Delete Movie
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default App;
