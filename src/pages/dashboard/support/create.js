import { useState, useEffect, useCallback } from "react";
import { useTheme } from '@mui/material/styles';
import Head from "next/head";
import React from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import Mail03 from "../../../icons/untitled-ui/duocolor/mail-03";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { usePageView } from "../../../hooks/use-page-view";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { paths } from "../../../paths";

const validationSchema = Yup.object({
  name: Yup.string().max(255).required("Name is required"),
  twitterId: Yup.string().max(255).required("Twitter ID is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  message: Yup.string().required("Query is required"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactPage = () => {
  const [memberData, setMemberData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
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

      const response = await Axios.get(`${BASEURL}/admin/getMemberDetails`, {
        headers: headers,
      });

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

        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
        setOpen(true); // Open the dialog
        router.push(paths.dashboard.support.create);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Contact | Yuva Bitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          py: 8,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3} mb={6} alignItems="center" textAlign="center">
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 64, height: 64 }}>
              <SvgIcon component={Mail03} sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h3">Contact Support</Typography>
            <Typography variant="body1" maxWidth="sm">
              If you have any queries or issues, please fill out the form below, and our support team will get back to you shortly.
            </Typography>
          </Stack>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Support Form
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter ID"
                    name="twitterId"
                    value={formik.values.twitterId}
                    onChange={formik.handleChange}
                    error={formik.touched.twitterId && Boolean(formik.errors.twitterId)}
                    helperText={formik.touched.twitterId && formik.errors.twitterId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    type="email"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Query"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
              </Grid>
              <Box mt={3} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    minWidth: 200,
                    height: 45,
                  }}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Raise Query"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Form Submitted Successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Thank you for reaching out to us. Your query has been submitted successfully. Our team will get back to you shortly via your registered email address.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ContactPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ContactPage;
