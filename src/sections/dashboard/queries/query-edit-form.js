// import NextLink from "next/link";
// import PropTypes from "prop-types";
// import toast from "react-hot-toast";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Stack,
//   TextField,
//   Typography,
//   Grid,
// } from "@mui/material";
// import { paths } from "../../../paths";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import { useRouter } from "next/router";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// export const QueryEditForm = ({ query, ...other }) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       message:  "",
//       // Add more fields as needed
//     },
//     validationSchema: Yup.object({
//         message: Yup.string().required("Message is required"),
//       }),
//     onSubmit: async (values, helpers) => {
//       try {
//         const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };

//         // Prepare data to be sent to the server
//         const data = {
//           message: values.message,
//           // Add more fields as needed
//         };

//         const response = await axios.post(
//           `${BASEURL}/api/Support/adminReplyToUser/${query.supportTicketId}`,
//           data,
//           { headers: headers }
//         );

//         if (response.status === 200) {
//           enqueueSnackbar("Query updated successfully", {
//             variant: "success",
//           });
//           helpers.setSubmitting(false); // Set submitting state to false
//           // Redirect or handle success as needed
//         } else {
//           enqueueSnackbar("Something went wrong", { variant: "error" });
//         }
//       } catch (err) {
//         enqueueSnackbar(err.message, { variant: "error" });
//         console.log(err);
//       }
//     },
//   });

//   return (
//     // <form onSubmit={formik.handleSubmit} {...other}>
//     //   <Card>
//     //     <CardHeader title="Edit Query" />
//     //     <CardContent sx={{ pt: 0 }}>
//     //       <Grid container spacing={3}>
//     //         <Grid item xs={12} md={6}>
//     //           <TextField
//     //             fullWidth
//     //             label="Subject"
//     //             name="subject"
//     //             value={formik.values.subject}
//     //             onChange={formik.handleChange}
//     //             error={formik.touched.subject && Boolean(formik.errors.subject)}
//     //             helperText={formik.touched.subject && formik.errors.subject}
//     //           />
//     //         </Grid>
//     //         <Grid item xs={12}>
//     //           <TextField
//     //             fullWidth
//     //             multiline
//     //             minRows={5}
//     //             maxRows={10}
//     //             label="Message"
//     //             name="message"
//     //             value={formik.values.message}
//     //             onChange={formik.handleChange}
//     //             error={formik.touched.message && Boolean(formik.errors.message)}
//     //             helperText={formik.touched.message && formik.errors.message}
//     //           />
//     //         </Grid>
//     //         {/* Add more fields as needed */}
//     //       </Grid>
//     //     </CardContent>
//     //     <Stack
//     //       direction={{
//     //         xs: "column",
//     //         sm: "row",
//     //       }}
//     //       flexWrap="wrap"
//     //       spacing={3}
//     //       sx={{ p: 3 }}
//     //     >
//     //       <Button type="submit" variant="contained" 
//     //       // disabled={formik.isSubmitting}
//     //       >
//     //         Update
//     //       </Button>
//     //       <Button
//     //         color="inherit"
//     //         component={NextLink}
//     //         href={paths.dashboard.support.list}
//     //         variant="outlined"
//     //       >
//     //         Cancel
//     //       </Button>
//     //     </Stack>
//     //   </Card>
//     // </form>
//     <form onSubmit={formik.handleSubmit} {...other}>
//     <Card>
//       <CardHeader title="Edit Query" />
//       <CardContent sx={{ pt: 0 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               minRows={5}
//               maxRows={10}
//               label="Your Message"
//               name="message"
//               value={formik.values.message}
//               onChange={formik.handleChange}
//               error={formik.touched.message && Boolean(formik.errors.message)}
//               helperText={formik.touched.message && formik.errors.message}
//             />
//           </Grid>
//         </Grid>
//       </CardContent>
//       <Stack
//         direction={{
//           xs: "column",
//           sm: "row",
//         }}
//         flexWrap="wrap"
//         spacing={3}
//         sx={{ p: 3 }}
//       >
//         <Button type="submit" variant="contained" 
//         // disabled={formik.isSubmitting}
//         >
//           Update
//         </Button>
//         <Button
//           color="inherit"
//           component={NextLink}
//           href={paths.dashboard.support.list}
//           variant="outlined"
//         >
//           Cancel
//         </Button>
//       </Stack>
//     </Card>
//   </form>
//   );
// };

// QueryEditForm.propTypes = {
//   query: PropTypes.object.isRequired,
// };





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
  Divider,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { paths } from "../../../paths";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const QueryEditForm = ({ query, ...other }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      message: "",
      // Add more fields as needed
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        // Prepare data to be sent to the server
        const data = {
          message: values.message,
          // Add more fields as needed
        };

        const response = await axios.post(
          `${BASEURL}/api/Support/adminReplyToUser/${query.supportTicketId}`,
          data,
          { headers: headers }
        );

        if (response.status === 200) {
          enqueueSnackbar("Query updated successfully", {
            variant: "success",
          });
          helpers.setSubmitting(false); // Set submitting state to false
          // Redirect or handle success as needed
          router.push(paths.dashboard.support.list);
        } else {
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      } catch (err) {
        if (err.response && err.response.status === 500) {
          enqueueSnackbar(
            "Failed to send email reply. Please try again later.",
            { variant: "error" }
          );
        } else {
          enqueueSnackbar(err.message, { variant: "error" });
        }
        console.error(err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit Query" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={5}
                maxRows={10}
                label="Your Message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={
                  formik.touched.message && Boolean(formik.errors.message)
                }
                helperText={
                  formik.touched.message && formik.errors.message
                }
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
          <Button
            color="inherit"
            component={NextLink}
            href={paths.dashboard.support.list}
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

QueryEditForm.propTypes = {
  query: PropTypes.object.isRequired,
};
