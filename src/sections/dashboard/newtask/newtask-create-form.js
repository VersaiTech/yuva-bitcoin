import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Stack,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { paths } from "../../../paths";
import Link from "next/link";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
tomorrow.setHours(0, 0, 0, 0); // Set time to 12 AM

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2); // Set to the day after tomorrow
dayAfterTomorrow.setHours(0, 0, 0, 0); // Set time to 12 AM

const initialValues = {
  name: "",
  description: "",
  oldPrice: 0,
  url: "",
  openDateTime: tomorrow.toISOString().slice(0, -8), // Combine start date and time (ISO format expects 0-based month)
  endDateTime: dayAfterTomorrow.toISOString().slice(0, -8), // Combine end date and time (ISO format expects 0-based month)
  submit: null,
};

// const initialValues = {
//   name: "",
//   description: "",
//   oldPrice: 0,
//   url: "",
//   openDateTime: new Date().toISOString().split("T")[0], // Combine start date and time
//   endDateTime: new Date().toISOString().split("T")[0], // Combine end date and time
//   submit: null,
// };

const validationSchema = Yup.object({
  name: Yup.string().max(255).required(),
  description: Yup.string().max(5000).required(),
  oldPrice: Yup.number().min(0).required(),
  url: Yup.string().url().required(),
  openDateTime: Yup.date().required(),
  endDateTime: Yup.date()
    .min(Yup.ref("openDateTime"), "End date must be after start date")
    .required(),
});

export const NewTaskForm = (props) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const data = {
          taskName: values.name,
          description: values.description,
          coins: values.oldPrice,
          link: values.url,
          scheduledTime: values.openDateTime,
          completionTime: values.endDateTime,
        };

        const response = await axios.post(`${BASEURL}/admin/addTask`, data, {
          headers: headers,
        });
        toast.success("Task created");
        router.push(paths.dashboard.newtask.index);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">New Task Details</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <Grid container spacing={3}>
                    {/* Grid for start and end date/time */}
                    <Grid item xs={6}>
                      {/* Combine startDate and startTime into one field */}
                      <TextField
                        error={
                          !!(
                            formik.touched.openDateTime &&
                            formik.errors.openDateTime
                          )
                        }
                        fullWidth
                        label="Start Date & Time"
                        name="openDateTime"
                        type="datetime-local" // Use datetime-local input type
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.openDateTime} // Combine startDate and startTime into one value
                        inputProps={{
                          min: new Date().toISOString().split("T")[0], // Set min value to today
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {/* Combine endDate and endTime into one field */}
                      <TextField
                        error={
                          !!(
                            formik.touched.endDateTime &&
                            formik.errors.endDateTime
                          )
                        }
                        fullWidth
                        label="End Date & Time"
                        name="endDateTime"
                        type="datetime-local" // Use datetime-local input type
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.endDateTime} // Combine endDate and endTime into one value
                        inputProps={{
                          min: new Date().toISOString().split("T")[0], // Set min value to today
                        }}
                      />
                    </Grid>
                  </Grid>
                  {/* Remaining TextField components */}
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Task Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={
                      !!(
                        formik.touched.description && formik.errors.description
                      )
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
                    multiline
                    rows={4} // You can adjust the number of rows as needed
                  />

                  <TextField
                    error={
                      !!(formik.touched.oldPrice && formik.errors.oldPrice)
                    }
                    fullWidth
                    label="Number of Coins"
                    name="oldPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.oldPrice}
                  />
                  <TextField
                    error={!!(formik.touched.url && formik.errors.url)}
                    fullWidth
                    label="Social Media Link"
                    name="url"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.url}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Link href={paths.dashboard.newtask.index}>
            <Button color="inherit">Cancel</Button>
          </Link>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
