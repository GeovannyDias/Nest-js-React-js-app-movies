import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styles from "./Search.module.css";

export function Search() {
  //   const query = useQuery();
  //   const search = query.get("search");

  const [searchText, setSearchText] = useState("");
  const history = useHistory(); // Permite cambiar el historial de navigacion a la ruta, añade nuevo elemento a la ruta

  // Se coloca el valor de busqueda del url en el Input
  //   useEffect(() => {
  //     setSearchText(search || "");
  //   }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Calcela petición por defecto al formulario
    history.push("/?search=" + searchText);
    setSearchText(""); // Clear → Eliminar useEffect()
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Movies"
          aria-label="Search Movies"
          value={searchText}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);
            history.push("/?search=" + value);
          }}
          //   onChange={(e) => handleSubmit(e.target.value)}
          //   onChange={(e) => handleSubmit(e.target.value.toUpperCase)}
        />
        <button className={styles.searchButton} type="submit">
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
}
