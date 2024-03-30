import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import { paths } from "../../../paths";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState } from "react";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const validationSchema = Yup.object({
  taskId: Yup.string().required("Task ID is required"),
  description: Yup.string().max(5000).required("Description is required"),
  coins: Yup.number().min(0).required("Coins is required"),
  taskName: Yup.string().max(255).required("Task Name is required"),
  link: Yup.string().url().required("Link is required"),
  openDateTime: Yup.date().required("Open Date and Time are required"),
  endDateTime: Yup.date().min(Yup.ref("openDateTime")).required("End Date and Time are required"),
});

export const NewTaskEditForm = ({ customer, ...other }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      taskId: customer.taskId || "",
      description: customer.description || "",
      coins: customer.coins || "",
      taskName: customer.taskName || "",
      link: customer.link || "",
      openDateTime: customer.scheduledTime || "", // Combine open date and time
      endDateTime: customer.completionDateTime || "", // Combine end date and time
      submit: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const data = {
          taskId: values.taskId,
          description: values.description,
          coins: values.coins,
          taskName: values.taskName,
          link: values.link,
          scheduledTime: values.openDateTime,
          completionDateTime: values.endDateTime,
        };

        const response = await axios.post(
          `${BASEURL}/admin/editTask/${customer.taskId}`,
          data,
          { headers: headers }
        );

        if (response.status === 200) {
          enqueueSnackbar("Task updated successfully", { variant: "success" });
          router.push(paths.dashboard.newtask.index);
        } else {
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      } catch (err) {
        enqueueSnackbar(err.message, { variant: "error" });
        console.log(err);
      }
    },
  });

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.delete(
        `${BASEURL}/admin/deleteTask/${customer.taskId}`,
        { headers: headers }
      );
      if (response.status === 200) {
        enqueueSnackbar("Task deleted successfully", { variant: "success" });
        router.push(paths.dashboard.newtask.index);
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      console.log(err);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit Task" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={2}>
            {/* Existing form fields */}
            <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.taskName && formik.errors.taskName)}
                fullWidth
                helperText={formik.touched.taskName && formik.errors.taskName}
                label="Task Name"
                name="taskName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.taskName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.taskId && formik.errors.taskId)}
                fullWidth
                helperText={formik.touched.taskId && formik.errors.taskId}
                label="Task ID"
                name="taskId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.taskId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  !!(formik.touched.link && formik.errors.link)
                }
                fullWidth
                helperText={formik.touched.link && formik.errors.link}
                label="Link"
                name="link"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.link}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  !!(formik.touched.description && formik.errors.description)
                }
                fullWidth
                helperText={
                  formik.touched.description && formik.errors.description
                }
                label="Description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
            
            {/* Date and Time Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.openDateTime && formik.errors.openDateTime)}
                fullWidth
                helperText={formik.touched.openDateTime && formik.errors.openDateTime}
                label="Open Date and Time"
                name="openDateTime"
                type="datetime-local"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.openDateTime}
                inputProps={{
                  min: new Date().toISOString().split("T")[0], // Set min value to today
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.endDateTime && formik.errors.endDateTime)}
                fullWidth
                helperText={formik.touched.endDateTime && formik.errors.endDateTime}
                label="End Date and Time"
                name="endDateTime"
                type="datetime-local"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.endDateTime}
                inputProps={{
                  min: new Date().toISOString().split("T")[0], // Set min value to today
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.coins && formik.errors.coins)}
                fullWidth
                helperText={formik.touched.coins && formik.errors.coins}
                label="Coins"
                name="coins"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.coins}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button type="submit" variant="contained">
            Update
          </Button>
          <Button color="error" onClick={handleOpenDialog} variant="contained">
            Delete Task
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            href={paths.dashboard.newtask.index}
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTask} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

NewTaskEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
