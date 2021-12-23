import { MoviesGrid } from "../../components/MoviesGrid/MoviesGrid";
import { Search } from "../../components/Search/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "../../hooks/useQuery";

export function LandingPage() {
  /* 
  key={search} si un componente tiene una key y esta cambia, se destruye el componente y se vuelve a crear
  de esta manera no se concatena las peliculas que se tiene con un nueva busqueda registrada en el Input search
  */

  const query = useQuery(); // Hook personalizado
  const search = query.get("search");
  const debouncedSearch = useDebounce(search, 400); // Espera 300 ms para que cambie la key y se realice la busqueda

  return (
    <div>
      <Search />
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
    </div>
  );
}
