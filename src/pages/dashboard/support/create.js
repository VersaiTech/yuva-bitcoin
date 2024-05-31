import { useState, useEffect, useCallback } from "react";
import { useTheme } from '@mui/material/styles';
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
  Alert,
} from "@mui/material";
import Mail03 from "../../../icons/untitled-ui/duocolor/mail-03";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { usePageView } from "../../../hooks/use-page-view";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

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
  const [memberData, setMemberData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  usePageView();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const theme = useTheme();

  const getMemberDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const headers = {
        Authorization: token,
      };

      console.log("Token:", token);
      console.log("Headers:", headers);

      const response = await Axios.get(`${BASEURL}/admin/getMemberDetails`, {
        headers: headers,
      });

      console.log("Response from API:", response.data);
      setMemberData(response.data.member); // Assuming the response contains member details
    } catch (err) {
      console.error("Error fetching member details:", err);
    }
  }, []);

  useEffect(() => {
    getMemberDetails();
  }, [getMemberDetails]);

  const formik = useFormik({
    initialValues: {
      name: memberData?.member_name || "",
      twitterId: memberData?.twitterId || "",
      email: memberData?.email || "",
      message: "",
    },
    enableReinitialize: true, // This will reinitialize the form with the new initial values when memberData changes
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);

        const requestBody = {
          name: values.name,
          twitterId: values.twitterId,
          email: values.email,
          message: values.message,
        };

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
        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
        router.push(paths.dashboard.index);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
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
            <Alert
            severity="info"
            sx={{
              mt: 2,
              color: "text.primary",
              backgroundColor: "background.paper",
              fontWeight: "bold",
            }}
          >
            Our team will respond you shortly. 
          </Alert>
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
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root.Mui-disabled': {
                      color: theme.palette.mode === 'dark' ? '#fff' : '#123',
                      backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#f0f0f0',
                      border: '1px solid #d3d3d3',
                    },
                  }}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  required
                  placeholder="Enter your name"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Twitter ID
                </Typography>
                <TextField
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root.Mui-disabled': {
                      color: theme.palette.mode === 'dark' ? '#fff' : '#123',
                      backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#f0f0f0',
                      border: '1px solid #d3d3d3',
                    },
                  }}
                  name="twitterId"
                  value={formik.values.twitterId}
                  onChange={formik.handleChange}
                  error={formik.touched.twitterId && Boolean(formik.errors.twitterId)}
                  helperText={formik.touched.twitterId && formik.errors.twitterId}
                  required
                  placeholder="Enter your twitter ID"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Email
                </Typography>
                <TextField
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root.Mui-disabled': {
                      color: theme.palette.mode === 'dark' ? '#fff' : '#123',
                      backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#f0f0f0',
                      border: '1px solid #d3d3d3',
                    },
                  }}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  type="email"
                  required
                  placeholder="Enter your email"
                  disabled
                  InputProps={{
                    style: {
                      WebkitTextFillColor: 'black', // Text color for webkit browsers
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Query
                </Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
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
                      width: '100%',
                      backgroundColor: 'green',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'darkgreen',
                      },
                    }}
                  >
                    Raise Query
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
