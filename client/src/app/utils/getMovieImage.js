import placeholder from "../../assets/placeholder.jpg";

export function getMovieImage(image) {
  const imageUrl = image ? image : placeholder;
  return imageUrl;
}
