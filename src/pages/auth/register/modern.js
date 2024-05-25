import NextLink from "next/link";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
// const { enqueueSnackbar } = useSnackbar(); // Snackbar notification

import { useRouter } from "next/router"; // Import useRouter for navigation

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  FormHelperText,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "../../../layouts/auth/modern-layout";
import { paths } from "../../../paths";
import { useAuth } from "../../../hooks/use-auth";
import { useMounted } from "../../../hooks/use-mounted";
import Axios from "axios";

import { useSnackbar } from "notistack";

const initialValues = {
  member_name: "",
  email: "",
  password: "",
  contactNo: "", // New field
  confirmPassword: "",
  twitterId: "", // New field
  wallet_address: "",
  referralCode: "",
  policy: false,
};

const validationSchema = Yup.object({
  member_name: Yup.string().max(255).required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().min(7).max(255).required("Password is required"),
  contactNo: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Contact Number is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  twitterId: Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, 'Please enter a valid Twitter username without "@"')
    .max(60, 'Must be at most 60 characters')
    .required('Twitter ID is required'),
  wallet_address: Yup.string().required("Wallet Address is required"),
  referralCode: Yup.string(),
  policy: Yup.boolean()
    .oneOf([true], 'Terms and Conditions must be accepted')
    .required('Terms and Conditions must be accepted'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter(); // Initialize useRouter
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [referralCode, setReferralCode] = useState(router.query.code);


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      localStorage.setItem("email", values.email);
      try {
        const fullTwitterId = `https://twitter.com/${values.twitterId}`;
        await signUp(
          values.member_name,
          values.email,
          values.password,
          values.contactNo,
          fullTwitterId,
          values.wallet_address,
          values.referralCode
        );
        console.log(values);

        if (isMounted()) {
          enqueueSnackbar("Please Verify", {
            variant: "success",
          });
          router.push(paths.auth.verifyCode.modern);
        }
      } catch (err) {
        if (err?.response?.data?.message) {
          console.error(err.response.data.message);
          enqueueSnackbar(err.response.data.message, { variant: "error" });
          helpers.setSubmitting(false);
        } else {
          enqueueSnackbar("Something went wrong ", { variant: "error" });
          helpers.setSubmitting(false);
        }

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    if (router.query.code) {
      formik.setFieldValue("referralCode", router.query.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.code]);


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.index}
          sx={{
            alignItems: "center",
            display: "inline-flex",
          }}
          underline="hover"
        >
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Typography variant="subtitle2">Dashboard</Typography>
        </Link>
      </Box>
      <Stack sx={{ mb: 4 }} spacing={1}>
        <Typography variant="h5">Register</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{" "}
          <Link
            component={NextLink}
            href={paths.auth.login.modern}
            underline="hover"
            variant="subtitle2"
          >
            Log in
          </Link>
        </Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={formik.touched.member_name && !!formik.errors.member_name}
            fullWidth
            helperText={formik.touched.member_name && formik.errors.member_name}
            label="Name"
            name="member_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.member_name}
          />
          <TextField
            error={formik.touched.email && !!formik.errors.email}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <TextField
            error={formik.touched.password && !!formik.errors.password}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            error={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
            fullWidth
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            label="Confirm Password"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={showPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            error={formik.touched.contactNo && !!formik.errors.contactNo}
            fullWidth
            helperText={formik.touched.contactNo && formik.errors.contactNo}
            label="Contact Number"
            name="contactNo"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contactNo}
          />
          <TextField
            error={formik.touched.twitterId && !!formik.errors.twitterId}
            fullWidth
            helperText={formik.touched.twitterId && formik.errors.twitterId}
            label="Twitter ID"
            name="twitterId"
            placeholder="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.twitterId}
          />
          <TextField
            error={
              formik.touched.wallet_address && !!formik.errors.wallet_address
            }
            fullWidth
            helperText={
              formik.touched.wallet_address && formik.errors.wallet_address
            }
            label="Wallet Address"
            name="wallet_address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.wallet_address}
          />
          <TextField
            error={formik.touched.referralCode && !!formik.errors.referralCode}
            fullWidth
            helperText={
              formik.touched.referralCode && formik.errors.referralCode
            }
            label="Referal Code (Optional)"
            name="referralCode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.referralCode}
          />
        </Stack>
        <Box sx={{ alignItems: "center", display: "flex", ml: -1, mt: 1 }}>
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
            required={true}
          />
          <Typography color="text.secondary" variant="body2">
            I have read the{" "}
            <Link component="a" href="#">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {!!(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>{formik.errors.policy}</FormHelperText>
        )}
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;


