import { useEffect, useState } from "react";
import { getMovies } from "../../services/movie.service";
import { MovieCard } from "../MovieCard/MovieCard";
import { Spinner } from "../Spinner/Spinner";
import styles from "./MoviesGrid.module.css";
import { Empty } from "../Empty/Empty";

export function MoviesGrid({ search }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getMovies().then((data) => {
      // movies = data;
      setMovies(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;
  if (!isLoading && movies.length === 0) return <Empty />; // Si no hay resultados

  return (
    <ul className={styles.moviesGrid}>
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </ul>
  );
}

// Arrow function si se tiene una sola linea de codigo se puede
// eliminar el return
