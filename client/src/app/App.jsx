import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MovieDetail } from "./pages/MovieDetail/MovieDetail";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { AdminPage } from "./pages/Admin/AdminPage";
// import { AppBar, Button } from "@mui/material";

export function App() {
  return (
    <Router>
      <header className={styles.headerContainer}>
        <Link to="/">
          <h1 className={styles.title}>Movies</h1>
        </Link>

        <Link to={"/admin"}>
          <h1 className={styles.title}>Adminstrar</h1>
        </Link>
      </header>

      <main>
        <Switch>
          <Route exact path="/movie/:movieId">
            <MovieDetail />
          </Route>
          <Route exact path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

// Si se exporta por default al cambiar el nombre del componente
// con F2 no se cambiara el nombre donde fue importado el componente
// Si se exporta por default se puede importar de la siguiente manera
// import as Geo "./Name" pero cambiar el nombre del componente es
// una mala practica

// export default function Name(params) {
//    return;
// }
