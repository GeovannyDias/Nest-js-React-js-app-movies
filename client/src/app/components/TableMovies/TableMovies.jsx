import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { EnhancedTableHead } from "./components/EnhancedTableHead";
import { EnhancedTableToolbar } from "./components/EnhancedTableToolbar";
import { deleteMovie, getMovies } from "../../services/movie.service";
import { Spinner } from "../Spinner/Spinner";
import { Empty } from "../Empty/Empty";
// import styles from "./TableMovies.module.css";

import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { notifyError } from "../../services";
import { DialogMovie } from "./components/DialogMovie";
import { ToastContainer } from "react-toastify";

// *************************************************************************************************
// FUNCTIONS
// *************************************************************************************************

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// COMPONENT FUNCTION
export function TableMovies() {
  const history = useHistory(); // RedirecTo

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    edit: false,
    data: null,
    title: "",
  });

  // GET DATA
  useEffect(() => {
    setIsLoading(true);
    getDataMovies();
  }, []);

  async function getDataMovies() {
    await getMovies().then((data) => {
      setMovies(data);
      setIsLoading(false);
    });
  }

  // ACTION BUTTONS

  function handleUpdate(movie) {
    setValue({ edit: true, data: movie, title: "Update Movie" });
    setOpen(true);
  }

  async function handleDelete(id) {
    await deleteMovie(id).then((res) => {
      notifyError(res.message, "bottom-right");
      getDataMovies();
    });
  }

  function handleView(id) {
    console.log(id);
    history.push("/movie/" + id);
  }

  // Load data
  if (isLoading) return <Spinner />;
  if (!isLoading && movies.length === 0) return <Empty />; // Si no hay resultados

  // Filters
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movies.length) : 0;

  // DIALOG COMPONENT

  const handleAddClick = () => {
    setValue({ edit: false, data: null, title: "New Movie" });
    setOpen(true);
  };

  const handleClose = (data) => {
    setOpen(false);
    if (data) {
      console.log("dataRES:", data);
      getDataMovies();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onAddClick={handleAddClick} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

              {stableSort(movies, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const labelId = `enhanced-table-checkbox-${index}`; // Remplazar con ID

                  return (
                    <TableRow hover key={row.id}>
                      <TableCell
                        component="th"
                        // id={labelId}
                        scope="row"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell align="right">
                        {row.duration} <small>min.</small>
                      </TableCell>

                      <TableCell align="right">{row.gender.name}</TableCell>

                      <TableCell align="right">
                        {row.state ? "Active" : "Inactive"}
                      </TableCell>

                      <TableCell align="right">
                        <IconButton onClick={() => handleView(row.id)}>
                          <VisibilityIcon color="primary" />
                        </IconButton>
                        <IconButton>
                          <EditIcon color="success" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DialogMovie
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        content={value}
        key={open}
      />
      <ToastContainer />
    </Box>
  );
}
