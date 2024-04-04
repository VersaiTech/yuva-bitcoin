import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  SvgIcon,
  Link,
  Grid,
  Paper,
} from "@mui/material";
import Mail03 from "../../../icons/untitled-ui/duocolor/mail-03";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { usePageView } from "../../../hooks/use-page-view";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios"; // Import Axios for HTTP requests
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const initialValues = {
  name: "",
  twitterId: "",
  email: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string().max(255).required("Name is required"),
  twitterId: Yup.string().max(255).required("Twitter ID is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  message: Yup.string().required("Query is required"),
});

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  usePageView();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // Inside your component
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true); // Set submitting state to true

        // Prepare request body
        const requestBody = {
          name: values.name,
          twitterId: values.twitterId,
          email: values.email,
          message: values.message,
        };

        // Send form data to API endpoint
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const headers = {
          Authorization: token,
        };

        const response = await Axios.post(
          `${BASEURL}/api/Support/createSupport`,
          requestBody,
          { headers: headers }
        );
        console.log(response.data);
        // Show success notification
        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
        router.push(paths.dashboard.index);
        // Reset form after successful submission
        resetForm();
      } catch (error) {
        // Show error notification
        enqueueSnackbar("Failed to submit form. Please try again later.", {
          variant: "error",
        });
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false); // Set submitting state back to false
      }
    },
  });
  return (
    <>
      <Head>
        <title>Contact | Yuva Bitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            py: 8,
          }}
        >
          <Container maxWidth="md" sx={{ pl: { lg: 5 } }}>
            <Stack spacing={2}>
              <div>
                <Link
                  color="text.primary"
                  href="/"
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <Typography variant="subtitle2">Home</Typography>
                </Link>
              </div>
              <Typography variant="h3">Contact</Typography>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                mb: 6,
                mt: 8,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
                variant="rounded"
              >
                <SvgIcon>
                  <Mail03 />
                </SvgIcon>
              </Avatar>
              <Typography variant="overline">Contact sales</Typography>
            </Stack>
            <Typography sx={{ mb: 3 }} variant="h1">
              Talk to our account expert
            </Typography>
            <Typography sx={{ mb: 3 }} variant="body1">
              Have you any query and doubt please contact us
            </Typography>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            px: 6,
            py: 10,
          }}
        >
          <Container
            maxWidth="lg" // Adjusted maxWidth to make the form wider
            sx={{
              pr: {
                lg: 1,
              },
            }}
          >
            <Typography sx={{ pb: 3 }} variant="h6">
              Fill the form below
            </Typography>
            <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      User Name
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      placeholder="Enter your name"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Twitter ID
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="twitterId"
                      value={formik.values.twitterId}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.twitterId &&
                        Boolean(formik.errors.twitterId)
                      }
                      helperText={
                        formik.touched.twitterId && formik.errors.twitterId
                      }
                      type="tel"
                      required
                      placeholder="Enter your twitter ID"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Email
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      type="email"
                      required
                      placeholder="Enter your email"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Query
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.message && Boolean(formik.errors.message)
                      }
                      helperText={
                        formik.touched.message && formik.errors.message
                      }
                      multiline
                      rows={4}
                      required
                      placeholder="Enter your query"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 4 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          width: "100%",
                          backgroundColor: "green",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "darkgreen",
                          },
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

ContactPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ContactPage;
