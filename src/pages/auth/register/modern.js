// import NextLink from "next/link";
// import * as Yup from "yup";
// import { useState } from "react";
// import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useFormik } from "formik";
// import { useRouter } from "next/router"; // Import useRouter for navigation

// import {
//   Box,
//   Button,
//   Checkbox,
//   IconButton,
//   FormHelperText,
//   Link,
//   Stack,
//   SvgIcon,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Layout as AuthLayout } from "../../../layouts/auth/modern-layout";
// import { paths } from "../../../paths";
// import { useAuth } from "../../../hooks/use-auth";
// import { useMounted } from "../../../hooks/use-mounted";
// import Axios from "axios";
// import { useSnackbar } from "notistack";

// const initialValues = {
//   email: "",
//   name: "",
//   password: "",
//   confirmPassword: "",
//   contactNo: "", // New field
//   twitterId: "", // New field
//   policy: false,
//   otp: "", // New field
// };

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Must be a valid email")
//     .max(255)
//     .required("Email is required"),
//   name: Yup.string().max(255).required("Name is required"),
//   password: Yup.string().min(7).max(255).required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
//   contactNo: Yup.string()
//     .matches(/^\d{10}$/, "Invalid phone number")
//     .required("Contact Number is required"),
//   twitterId: Yup.string()
//     .max(15, "Must be at most 15 characters")
//     .required("Twitter ID is required"),
//   otp: Yup.string().required("OTP is required"),
// });

// const Page = () => {
//   const isMounted = useMounted();
//   const router = useRouter();
//   const { signUp } = useAuth();
// const [showPassword, setShowPassword] = useState(false);
// const [showOtpField, setShowOtpField] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   // const formik = useFormik({
//   //   initialValues,
//   //   validationSchema,
//   //   onSubmit: async (values, helpers) => {
//   //     try {
//   //       await signUp(values.name, values.email, values.password, values.confirmPassword);

//   //       if (isMounted()) {
//   //         router.push(paths.dashboard.index);
//   //       }
//   //     } catch (err) {
//   //       console.error(err.response.data.message);

//   //       if (isMounted()) {
//   //         helpers.setStatus({ success: false });
//   //         helpers.setErrors({ submit: err.message });
//   //         helpers.setSubmitting(false);
//   //       }
//   //     }
//   //   }
//   // });

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async (values, helpers) => {
//       try {
//         const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//         const response = await Axios.post(`${BASEURL}/api/Auth/register`, {
//           contactNo: values.contactNo,
//           member_name: values.name,
//           password: values.password,
//           email: values.email,
//           twitterId: values.twitterId,
//         });

// if (response.data.status) {
//   enqueueSnackbar("Otp Sent successfully", {
//     variant: "success",
//   });
//   // if (isMounted()) {
//   //   router.push(paths.dashboard.index);
//   // }
//   setShowOtpField(true);
// } else {
//           console.error(response.data.message);
//           if (isMounted()) {
//             helpers.setStatus({ success: false });
//             helpers.setErrors({ submit: response.data.message });
//             helpers.setSubmitting(false);
//           }
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         if (isMounted()) {
//           helpers.setStatus({ success: false });
//           helpers.setErrors({ submit: "Registration failed" });
//           helpers.setSubmitting(false);
//         }
//       }
//     },
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const handleOtpSubmit = async () => {
//     try {
//       const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//       const verifyResponse = await Axios.post(`${BASEURL}/api/Auth/verifyOTP`, {
//         email: formik.values.email,
//         otp: formik.values.otp,
//       });

//       if (verifyResponse.data.status) {
//         enqueueSnackbar("OTP verified successfully", {
//           variant: "success",
//         });
//         if (isMounted()) {
//           router.push(paths.dashboard.index);
//         }
//       } else {
//         console.error(verifyResponse.data.message);
//         if (isMounted()) {
//           formik.setStatus({ success: false });
//           formik.setErrors({ otp: verifyResponse.data.message });
//         }
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       if (isMounted()) {
//         formik.setStatus({ success: false });
//         formik.setErrors({ otp: "OTP verification failed" });
//       }
//     }
//   };

//   return (
//     <div>
//       <Box sx={{ mb: 4 }}>
//         <Link
//           color="text.primary"
//           component={NextLink}
//           href={paths.index}
//           sx={{
//             alignItems: "center",
//             display: "inline-flex",
//           }}
//           underline="hover"
//         >
//           <SvgIcon sx={{ mr: 1 }}>
//             <ArrowLeftIcon />
//           </SvgIcon>
//           <Typography variant="subtitle2">Dashboard</Typography>
//         </Link>
//       </Box>
//       <Stack sx={{ mb: 4 }} spacing={1}>
//         <Typography variant="h5">Register</Typography>
//         <Typography color="text.secondary" variant="body2">
//           Already have an account?{" "}
//           <Link
//             component={NextLink}
//             href={paths.auth.login.modern}
//             underline="hover"
//             variant="subtitle2"
//           >
//             Log in
//           </Link>
//         </Typography>
//       </Stack>
//       <form onSubmit={formik.handleSubmit}>
//         <Stack spacing={3}>
//           <TextField
//             error={formik.touched.name && !!formik.errors.name}
//             fullWidth
//             helperText={formik.touched.name && formik.errors.name}
//             label="Name"
//             name="name"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             value={formik.values.name}
//           />
//           <TextField
//             error={formik.touched.email && !!formik.errors.email}
//             fullWidth
//             helperText={formik.touched.email && formik.errors.email}
//             label="Email Address"
//             name="email"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="email"
//             value={formik.values.email}
//           />

//           <TextField
//             error={formik.touched.password && !!formik.errors.password}
//             fullWidth
//             helperText={formik.touched.password && formik.errors.password}
//             label="Password"
//             name="password"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type={showPassword ? "text" : "password"}
//             value={formik.values.password}
//             InputProps={{
//               endAdornment: (
//                 <IconButton onClick={togglePasswordVisibility} edge="end">
//                   {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                 </IconButton>
//               ),
//             }}
//           />
//           <TextField
//             error={
//               formik.touched.confirmPassword && !!formik.errors.confirmPassword
//             }
//             fullWidth
//             helperText={
//               formik.touched.confirmPassword && formik.errors.confirmPassword
//             }
//             label="Confirm Password"
//             name="confirmPassword"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type={showPassword ? "text" : "password"}
//             value={formik.values.confirmPassword}
//             InputProps={{
//               endAdornment: (
//                 <IconButton onClick={togglePasswordVisibility} edge="end">
//                   {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                 </IconButton>
//               ),
//             }}
//           />
//           <TextField
//             error={
//               formik.touched.contactNo && !!formik.errors.contactNo
//             }
//             fullWidth
//             helperText={
//               formik.touched.contactNo && formik.errors.contactNo
//             }
//             label="Contact Number"
//             name="contactNo"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             value={formik.values.contactNo}
//           />
//           <TextField
//             error={formik.touched.twitterId && !!formik.errors.twitterId}
//             fullWidth
//             helperText={formik.touched.twitterId && formik.errors.twitterId}
//             label="Twitter ID"
//             name="twitterId"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             value={formik.values.twitterId}
//           />
//         </Stack>
//         <Box sx={{ alignItems: "center", display: "flex", ml: -1, mt: 1 }}>
//           <Checkbox
//             checked={formik.values.policy}
//             name="policy"
//             onChange={formik.handleChange}
//           />
//           <Typography color="text.secondary" variant="body2">
//             I have read the{" "}
//             <Link component="a" href="#">
//               Terms and Conditions
//             </Link>
//           </Typography>
//         </Box>
//         {!!(formik.touched.policy && formik.errors.policy) && (
//           <FormHelperText error>{formik.errors.policy}</FormHelperText>
//         )}
//         <Button
//           fullWidth
//           size="large"
//           sx={{ mt: 3 }}
//           type="submit"
//           variant="contained" // Trigger form submission
//         >
//           Register
//         </Button>
//       </form>
//     </div>
//   );
// };

// Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

// export default Page;

import NextLink from "next/link";
import * as Yup from "yup";
import { useState } from "react";
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
import { useAuth } from '../../../hooks/use-auth';
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
    .max(15, "Must be at most 15 characters")
    .required("Twitter ID is required"),
    wallet_address:  Yup.string()
    .required("Wallet Address is required"),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter(); // Initialize useRouter
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      localStorage.setItem("email", values.email);
      try {
        await signUp(
      values.member_name,
      values.email,
      values.password,
      values.contactNo,
      // values.confirmPassword,
      values.twitterId,
      values.wallet_address
        );
        console.log(values);

        if (isMounted()) {
          enqueueSnackbar("Registration successful Please Verify", { variant: 'success' });
          router.push(paths.auth.verifyCode.modern);
        }
      } catch (err) {
        console.error(err.response.data.message);
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
        helpers.setSubmitting(false);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

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
            error={
              formik.touched.contactNo && !!formik.errors.contactNo
            }
            fullWidth
            helperText={
              formik.touched.contactNo && formik.errors.contactNo
            }
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.twitterId}
          />
          <TextField
            error={formik.touched.wallet_address && !!formik.errors.wallet_address}
            fullWidth
            helperText={formik.touched.wallet_address && formik.errors.wallet_address}
            label="Wallet Address"
            name="wallet_address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.wallet_address}
          />
        </Stack>
        <Box sx={{ alignItems: "center", display: "flex", ml: -1, mt: 1 }}>
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
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
        >
          Register
        </Button>
      </form>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
