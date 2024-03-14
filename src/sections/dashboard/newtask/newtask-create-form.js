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

const initialValues = {
  name: "",
  description: "",
  oldPrice: 0,
  url: "",
  openDate: new Date().toISOString().split("T")[0],
  startTime: "", //Add startTime field
  endTime: "", // Add endTime field
  submit: null,
};

const validationSchema = Yup.object({
  name: Yup.string().max(255).required(),
  description: Yup.string().max(5000).required(),
  oldPrice: Yup.number().min(0).required(),
  url: Yup.string().url().required(),
  openDate: Yup.date().required(),
  startTime: Yup.string().required(), // Add validation for startTime
  endTime: Yup.string().required(), // Add validation for endTime
  endDate: Yup.date().min(Yup.ref("openDate")).required(),
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
        

        
        const data = new FormData();
        data.append("taskName", values.name);
        data.append("description", values.description);
        data.append("coins", values.oldPrice);
        data.append("link", values.url);
        data.append("scheduledTime", `${values.openDate}T${values.startTime}`);
        data.append("completionTime", `${values.openDate}T${values.endTime}`);
        // Add any other fields as necessary


        console.log(data)

        const response = await axios.post(`${BASEURL}/admin/addTask`, data, {
          headers: headers,
        });
        console.log(response.data);
        toast.success("Task created");
        router.push(paths.dashboard.newtask.index);
      } catch (err) {
        console.error(err);
        console.log(err);
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
                    {/* Grid for start and end time */}
                    <Grid item xs={6}>
                      {/* Add TextField for startTime */}
                      <TextField
                        error={
                          !!(formik.touched.startTime &&
                          formik.errors.startTime)
                        }
                        fullWidth
                        label="Start Time"
                        name="startTime"
                        type="time"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.startTime}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {/* Add TextField for endTime */}
                      <TextField
                        error={
                          !!(formik.touched.endTime && formik.errors.endTime)
                        }
                        fullWidth
                        label="End Time"
                        name="endTime"
                        type="time"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.endTime}
                      />
                    </Grid>
                    {/* Grid for open and end date */}
                    <Grid item xs={6}>
                      {/* Add TextField for openDate */}
                      <TextField
                        error={
                          !!(formik.touched.openDate &&
                          formik.errors.openDate)
                        }
                        fullWidth
                        label="Open Date"
                        name="openDate"
                        type="date"
                        
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.openDate}
                        inputProps={{
                          min: new Date().toISOString().split("T")[0], // Set min value to today
                          placeholder: "", // Remove the placeholder
                        }}
                      
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {/* Add TextField for endDate */}
                      <TextField
                        error={
                          !!(formik.touched.endDate && formik.errors.endDate)
                        }
                        fullWidth
                        label="End Date"
                        name="endDate"
                        type="date"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.endDate}
                        inputProps={{
                          min: new Date().toISOString().split("T")[0], // Set min value to today
                          placeholder: "", // Remove the placeholder
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
