import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import { getMovieById } from "../../services/movie.service";
import { getMovieImage } from "../../utils/getMovieImage";
import styles from "./MovieDetail.module.css";

export function MovieDetail() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getMovieById(movieId).then((data) => {
      setMovie(data);
      setIsLoading(false);
    });
  }, [movieId]); // Este efecto depende de movieId, si cambia esa variable se ejecute el efecto

  if (isLoading) return <Spinner />;
  if (!movie) return null; // Primero se carga el componente luego se elecuta el efecto
  const imageUrl = getMovieImage(movie.imageUrl);

  return (
    <div className={styles.detailContainer}>
      <img
        className={`${styles.col} ${styles.movieImage}`}
        src={imageUrl}
        alt={movie.name}
      />
      <div className={`${styles.col} ${styles.movieDetails}`}>
        <p>
          <strong>Título: </strong>
          {movie.name}
        </p>
        <p>
          <strong>Género: </strong>
          {movie.gender.name}
        </p>
        <p>
          <strong>Duración: </strong>
          {movie.duration} <small>min.</small>
        </p>
        <p>
          <strong>Sinopsis: </strong>
          {movie.sinopsis}
        </p>
        <div>
          <strong>Actores: </strong>
          <table className={styles.table}>
            <tbody>
              {movie.actors.map((actor) => {
                return (
                  <tr key={actor.id}>
                    <td>{`${actor.actor.first_name} ${actor.actor.last_name}`}</td>
                    <td>
                      {actor.actor.age} <small>años</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
