import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useFormik } from "formik";
import * as yup from "yup";
import {
  getActors,
  postActor,
  updateActor,
} from "../../../services/actor.service";

import { notifySuccess } from "../../../services";
import { Autocomplete } from "@mui/material";
import { getGenders } from "../../../services/gender.service";

// delete
const _initialValues = {
  first_name: "",
  last_name: "",
  age: "",
  photo: "",
  state: "",
};
const initialValues = {
  name: "",
  duration: "",
  genderId: "",
  sinopsis: "",
  imageUrl: "",
  state: "",
  actors: [],
};

const validationSchema = yup.object({
  name: yup.string("Enter movie name").required("* Field required"),
  duration: yup.number("Enter duration").required("* Field required"),
  genderId: yup.number("Select gender").required("* Field required"),
  sinopsis: yup.string("Enter sinopsis").required("* Field required"),
  imageUrl: yup.string("Select Image"),
  state: yup.boolean("Select State").required("* Field required"),
  actors: yup.array("Select Actors").required("* Field required"),
});

// delete
const _validationSchema = yup.object({
  first_name: yup.string("Enter First Name").required("* Field required"),
  last_name: yup.string("Enter Last Name").required("* Field required"),
  age: yup.number("Enter Age").required("* Field required"),
  photo: yup.string("Select Photo"),
  state: yup.boolean("Select State").required("* Field required"),
});

// COMPONENT FUNCTION
export function DialogMovie(props) {
  //   console.log(props);
  const { onClose, content, open, ...other } = props;

  // Data
  const [genders, setGenders] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getADataGenders();
    getDataActors();
  }, []);

  async function getADataGenders() {
    await getGenders().then((data) => {
      console.log("Gender:", data);
      setGenders(data);
    });
  }

  async function getDataActors() {
    await getActors().then((data) => {
      console.log("Actor:", data);
      setActors(data);
    });
  }

  const handleCancel = () => {
    onClose(); // Null
  };

  const handleOk = () => {
    onClose({ state: true }); // Acept
  };

  // FORMIK - FORM CONTROL
  const formik = useFormik({
    initialValues: content.edit && content.data ? content.data : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //   alert(JSON.stringify(values, null, 2));
      // validateSave(values);
    },
  });

  // Change string a boolean
  const handleChangeGender = (event) => {
    const genderId = +event.target.value;
    console.log(genderId, typeof genderId);
    if (genderId !== 0) formik.setFieldValue("genderId", genderId);
    if (genderId === 0) formik.setFieldValue("genderId", "");
  };

  // Change string a boolean
  const handleChangeSelect = (event) => {
    const state = event.target.value;
    if (state === "true") {
      formik.setFieldValue("state", true);
    } else if (state === "false") {
      formik.setFieldValue("state", false);
    } else {
      formik.setFieldValue("state", "");
    }
  };

  // VALIDATE NEW POST OR UPDATE DATA
  function validateSave(data) {
    if (content && !content.edit) postDataActor(data);
    if (content && content.edit) updateDataActor(data);
  }

  // POST NEW ACTOR
  async function postDataActor(data) {
    await postActor(data)
      .then((res) => {
        notifySuccess("Data saved successfully!", "bottom-right");
        handleOk();
      })
      .catch((error) => console.log("ERROR:", error));
  }

  // UPDATE DATA ACTOR
  async function updateDataActor(data) {
    const id = data?.id ? data.id : "";
    await updateActor(id, data)
      .then((res) => {
        notifySuccess("Data updated successfully!", "bottom-right");
        handleOk();
      })
      .catch((error) => console.log("ERROR:", error));
  }

  return (
    <div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 600 } }}
        maxWidth="sm"
        open={open}
        {...other}
      >
        <DialogTitle>{content.title}</DialogTitle>
        <DialogContent dividers>
          {/* FORM */}
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <form
              id="CreateForm"
              onSubmit={formik.handleSubmit}
              style={{ width: "100%" }}
            >
              <TextField
                sx={{ mb: 1, width: "100%" }}
                fullWidth
                id="name"
                name="name"
                label="Movie name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                sx={{ mb: 1 }}
                id="duration"
                name="duration"
                label="Duration"
                type="number"
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helperText={formik.touched.duration && formik.errors.duration}
              />

              <TextField
                id="genderId"
                name="genderId"
                label="Select gender"
                select
                value={formik.values.genderId}
                onChange={(e) => handleChangeGender(e)}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                // helperText="Please select the genderId"
                error={
                  formik.touched.genderId && Boolean(formik.errors.genderId)
                }
                helperText={formik.touched.genderId && formik.errors.genderId}
                sx={{ mb: 1, width: "100%" }}
              >
                <option key="" value={""} disabled>
                  Please select gender
                </option>
                {genders.map((gender) => {
                  return (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  );
                })}
              </TextField>

              <TextField
                sx={{ mb: 1 }}
                fullWidth
                id="sinopsis"
                name="sinopsis"
                label="Sinopsis"
                multiline
                rows={3}
                value={formik.values.sinopsis}
                onChange={formik.handleChange}
                error={
                  formik.touched.sinopsis && Boolean(formik.errors.sinopsis)
                }
                helperText={formik.touched.sinopsis && formik.errors.sinopsis}
              />

              {/* <TextField
                fullWidth
                sx={{ mb: 1 }}
                id="photo"
                name="photo"
                label="Photo"
                value={formik.values.photo}
                onChange={formik.handleChange}
                error={formik.touched.photo && Boolean(formik.errors.photo)}
                helperText={formik.touched.photo && formik.errors.photo}
              /> */}

              <TextField
                fullWidth
                sx={{ mb: 1 }}
                id="imageUrl"
                name="imageUrl"
                label="Image"
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                // value={formik.values.photo}
                // onChange={formik.handleChange}
                error={
                  formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                }
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              />

              <TextField
                id="state"
                name="state"
                label="Select state"
                select
                value={formik.values.state}
                onChange={(e) => handleChangeSelect(e)}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                // helperText="Please select the state"
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                sx={{ mb: 1, width: "100%" }}
              >
                <option key="" value={""} disabled>
                  Please select the state
                </option>
                <option key="active" value={true}>
                  Active
                </option>
                <option key="inactive" value={false}>
                  Inactive
                </option>
              </TextField>

              <Autocomplete
                multiple
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[13]]}
                filterSelectedOptions
                // freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Actors"
                    placeholder="Actor"
                  />
                )}
                // id="actors"
                // name="actors"
                // value={formik.values.actors}
                // onChange={formik.handleChange}
                // error={formik.touched.actors && Boolean(formik.errors.actors)}
                // helperText={formik.touched.actors && formik.errors.actors}
              />
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: "auto" }}>
          <Button
            autoFocus
            onClick={handleCancel}
            variant="contained"
            color="error"
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit" form="CreateForm">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// disabled={!formik.isValid}

//   const formikClick = () => {
//     const sub = formik.isValid;
//     console.log("Click", sub);
//     // formik.values.first_name = "Sofia";
//     // formik.setFieldValue("first_name", "Estefania"); // Boocle inficito por cada setFieldValue se renderiza
//     // value={() => formik.setFieldValue("state", true)}
//   };

//   formikClick();
//   console.log("formik:", formik);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
