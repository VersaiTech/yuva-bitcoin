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
import { useState, useEffect } from "react";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const validationSchema = Yup.object({
  taskId: Yup.string().required("Task ID is required"),
  description: Yup.string().max(5000).required("Description is required"),
  coins: Yup.number().min(0).required("Coins is required"),
  taskName: Yup.string().max(255).required("Task Name is required"),
  link: Yup.string().url().required("Link is required"),
  userTwitterId: Yup.string().required("User Twitter ID is required"),
  taskSubmitDate: Yup.date().required("Task Submit Date is required"),
});

export const WorkTaskEditForm = ({ customer, ...other }) => {
  const router = useRouter();
  const {userId} = router.query;

  console.log(userId);
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);



  console.log(customer);

  const formik = useFormik({
    initialValues: {
      userId: userId || "",
      taskId: customer.taskId || "",
      description: customer.description || "",
      coins: customer.coins || "",
      taskName: customer.taskName || "",
      link: customer.link || "",
      userTwitterId: customer.userTwitterId || "",
      taskSubmitDate: customer.completionTime || "", // Dummy date, replace with API value
      submit: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      // Your submission logic
    },
  });

  const handleConfirmRequest = async () => {
    try
    {
      const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization:token
    }

    // const Data = {
    //   taskId: formik.values.taskId,
    //   userId: formik.values.userId,
    // }

    const response = await axios.post(`${BASEURL}/admin/confirmTaskCompletion`, 
    {taskId: formik.values.taskId,
      userId: formik.values.userId},
    {
      headers: headers
    })

    if (response.status === 200) {
      enqueueSnackbar("Request confirmed successfully", {
        variant: "success",
      });
      router.push(paths.dashboard.taskwork.index);
    }
    else {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  }
  catch (error) {
    enqueueSnackbar(error.message, {
      variant: "error",
    });
  }

  };

  const handleRejectRequest = async () => {
    // Your rejection logic
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
        <CardHeader title="Approve or Reject Task" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={2}>
            {/* Existing form fields */}
            {/* <Grid item xs={12} md={6}>
              <TextField
              disabled
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
            </Grid> */}
            <Grid item xs={12} md={6}>
              <TextField
              disabled
                error={!!(formik.touched.taskId && formik.errors.taskId)}
                fullWidth
                helperText={formik.touched.taskId && formik.errors.taskId}
                label="Task Id"
                name="taskId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.taskId}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
              disabled
                error={!!(formik.touched.userId && formik.errors.userId)}
                fullWidth
                helperText={formik.touched.userId && formik.errors.userId}
                label="User Id"
                name="userId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.userId}
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
              disabled
                error={!!(formik.touched.link && formik.errors.link)}
                fullWidth
                helperText={formik.touched.link && formik.errors.link}
                label="Link"
                name="link"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.link}
              />
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
              <TextField
              disabled
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
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
              <TextField
              disabled
                error={!!(formik.touched.coins && formik.errors.coins)}
                fullWidth
                helperText={formik.touched.coins && formik.errors.coins}
                label="Coins"
                name="coins"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.coins}
              />
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.userTwitterId && formik.errors.userTwitterId)}
                fullWidth
                helperText={formik.touched.userTwitterId && formik.errors.userTwitterId}
                label="User Twitter ID"
                name="userTwitterId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.userTwitterId}
              />
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                label="Task Submit Date"
                value={formik.values.taskSubmitDate}
              />
            </Grid> */}
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
          <Button onClick={handleConfirmRequest} variant="contained">
            Confirm Request
          </Button>
          <Button onClick={handleRejectRequest} color="error" variant="contained">
            Reject Request
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
          <Button color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

WorkTaskEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
