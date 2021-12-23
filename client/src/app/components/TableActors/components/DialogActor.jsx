import { useEffect } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useFormik } from "formik";
import * as yup from "yup";
import { postActor, updateActor } from "../../../services/actor.service";

import { notifySuccess } from "../../../services";

const initialValues = {
  first_name: "",
  last_name: "",
  age: "",
  photo: "",
  state: "",
};

const validationSchema = yup.object({
  first_name: yup.string("Enter First Name").required("* Field required"),
  last_name: yup.string("Enter Last Name").required("* Field required"),
  age: yup.number("Enter Age").required("* Field required"),
  photo: yup.string("Select Photo"),
  state: yup.boolean("Select State").required("* Field required"),
});

export function DialogActor(props) {
  //   console.log(props);
  const { onClose, content, open, ...other } = props;

  useEffect(() => {
    if (!open) {
      console.log("useEffect: open:", open);
      //   setValue(valueProp);
    }
  }, [open]);

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
      //   console.log(values);
      //   alert(JSON.stringify(values, null, 2));
      validateSave(values);
    },
  });

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
            <form id="CreateForm" onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ mb: 1, width: "100%" }}
                fullWidth
                id="first_name"
                name="first_name"
                label="First Name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />

              <TextField
                sx={{ mb: 1 }}
                fullWidth
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
              <TextField
                fullWidth
                sx={{ mb: 1 }}
                id="age"
                name="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
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
                id="photo"
                name="photo"
                label="Photo"
                type="file"
                InputLabelProps={{
                  shrink: true,
                }}
                // value={formik.values.photo}
                // onChange={formik.handleChange}
                error={formik.touched.photo && Boolean(formik.errors.photo)}
                helperText={formik.touched.photo && formik.errors.photo}
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
                sx={{ width: "100%" }}
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
