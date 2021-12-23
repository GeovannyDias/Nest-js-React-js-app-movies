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
import { postGender, updateGender } from "../../../services/gender.service";

import { notifySuccess } from "../../../services";

const initialValues = {
  name: "",
};

const validationSchema = yup.object({
  name: yup.string("Enter Gender Name").required("* Field required"),
});

export function DialogGender(props) {
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
      // console.log(values);
      validateSave(values);
    },
  });

  // VALIDATE NEW POST OR UPDATE DATA
  function validateSave(data) {
    if (content && !content.edit) postDataGender(data);
    if (content && content.edit) updateDataGender(data);
  }

  // POST NEW GENDER
  async function postDataGender(data) {
    await postGender(data)
      .then((res) => {
        console.log("Res:", res);
        notifySuccess("Data saved successfully!", "bottom-right");
        handleOk();
      })
      .catch((error) => console.log("ERROR:", error));
  }

  // UPDATE DATA GENDER
  async function updateDataGender(data) {
    const id = data?.id ? data.id : "";
    await updateGender(id, data)
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
                label="Gender"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
