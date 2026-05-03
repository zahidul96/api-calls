import React, { useState, useRef,useEffect } from "react";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeRef = useRef();
  useEffect(() => {
    fetchMoviesHandler();
  }, []);
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.info/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying");
      }
      const data = await response.json();
      setMovies(data);
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
  return (
    <>
      <h1>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && error && (
        <button onClick={cancelRetryHandler}>Cancel</button>
      )}
      {!isLoading && movies.length === 0 && !error && (
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
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default App;
