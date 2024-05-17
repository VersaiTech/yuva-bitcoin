// import NextLink from 'next/link';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
// import { MuiOtpInput } from 'mui-one-time-password-input';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   FormLabel,
//   Link,
//   Stack,
//   SvgIcon,
//   Typography
// } from '@mui/material';
// import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
// import { paths } from '../../../paths';

// const initialValues = {
//   code: ''
// };

// const validationSchema = Yup.object({
//   code: Yup
//     .string()
//     .min(6)
//     .max(6)
//     .required('Code is required')
// });

// const Page = () => {
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: () => { }
//   });

//   return (
//     <div>
//       <Box sx={{ mb: 4 }}>
//         <Link
//           color="text.primary"
//           component={NextLink}
//           href={paths.dashboard.index}
//           sx={{
//             alignItems: 'center',
//             display: 'inline-flex'
//           }}
//           underline="hover"
//         >
//           <SvgIcon sx={{ mr: 1 }}>
//             <ArrowLeftIcon />
//           </SvgIcon>
//           <Typography variant="subtitle2">
//             Dashboard
//           </Typography>
//         </Link>
//       </Box>
//       <Stack
//         sx={{ mb: 4 }}
//         spacing={1}
//       >
//         <Typography variant="h5">
//           Verify code
//         </Typography>
//       </Stack>
//       <form
//         noValidate
//         onSubmit={formik.handleSubmit}
//       >
//         <FormControl error={!!(formik.touched.code && formik.errors.code)}>
//           <FormLabel
//             sx={{
//               display: 'block',
//               mb: 2
//             }}
//           >
//             Code
//           </FormLabel>
//           <MuiOtpInput
//             length={6}
//             onBlur={() => formik.handleBlur('code')}
//             onChange={(value) => formik.setFieldValue('code', value)}
//             onFocus={() => formik.setFieldTouched('code')}
//             sx={{
//               '& .MuiFilledInput-input': {
//                 p: '14px'
//               }
//             }}
//             value={formik.values.code}
//           />
//           {!!(formik.touched.code && formik.errors.code) && (
//             <FormHelperText>
//               {formik.errors.code}
//             </FormHelperText>
//           )}
//         </FormControl>
//         <Button
//           fullWidth
//           size="large"
//           sx={{ mt: 3 }}
//           type="submit"
//           variant="contained"
//         >
//           Verify
//         </Button>
//       </form>
//     </div>
//   );
// };

// Page.getLayout = (page) => (
//   <AuthLayout>
//     {page}
//   </AuthLayout>
// );

// export default Page;

import NextLink from "next/link";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useSnackbar } from "notistack";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "../../../layouts/auth/modern-layout";
import { paths } from "../../../paths";
import axios from "axios"; // Import Axios
import { useRouter } from "next/router"; // Import useRouter for navigation
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const initialValues = {
  code: "",
};

const validationSchema = Yup.object({
  code: Yup.string().min(6).max(6).required("Code is required"),
});

const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [verificationError, setVerificationError] = useState("");
  const router = useRouter(); // Initialize useRouter

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const email = localStorage.getItem("email");
        console.log(email);
        const response = await axios.post(`${BASEURL}/api/Auth/verifyOTP`, {
          otp: values.code,
          email: email,
        });
        enqueueSnackbar("OTP verified successfully", { variant: "success" });
        router.push(paths.auth.login.modern);
      } catch (error) {
        // Handle error
        console.error("Error verifying OTP:", error);
        setVerificationError("Error verifying OTP. Please try again.");
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.dashboard.index}
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
      <Stack sx={{ mb: 4 }}
spacing={1}>
        <Typography variant="h5">Verify code</Typography>
      </Stack>
      <form noValidate
onSubmit={formik.handleSubmit}>
        <FormControl error={!!(formik.touched.code && formik.errors.code)}>
          <FormLabel
            sx={{
              display: "block",
              mb: 2,
            }}
          >
            Code
          </FormLabel>
          <MuiOtpInput
            length={6}
            onBlur={() => formik.handleBlur("code")}
            onChange={(value) => formik.setFieldValue("code", value)}
            onFocus={() => formik.setFieldTouched("code")}
            sx={{
              "& .MuiFilledInput-input": {
                p: "14px",
              },
            }}
            value={formik.values.code}
          />
          {!!(formik.touched.code && formik.errors.code) && (
            <FormHelperText>{formik.errors.code}</FormHelperText>
          )}
        </FormControl>
        {verificationError && (
          <FormHelperText error>{verificationError}</FormHelperText>
        )}
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Verify
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        We've sent a one-time verification code to your email. Please check
        your inbox and enter the code here.
      </Typography>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
