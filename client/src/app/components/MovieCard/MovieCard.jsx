import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { getMovieImage } from "../../utils/getMovieImage";

export function MovieCard({ movie }) {
  const imageUrl = getMovieImage(movie.imageUrl);
  return (
    <li className={styles.movieCard}>
      <Link to={"/movie/" + movie.id}>
        <img
          src={imageUrl}
          alt={movie.name}
          width={300}
          height={450}
          className={styles.movieImage}
        />
        <div>{movie.name}</div>
      </Link>
    </li>
  );
}
