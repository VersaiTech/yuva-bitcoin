
import NextLink from "next/link";
import * as Yup from "yup";
import { useState, useEffect } from "react";
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
  const [isResending, setIsResending] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const email = localStorage.getItem("email");
const member_name = localStorage.getItem("member_name");
const contactNo = localStorage.getItem("contactNo");
const twitterId = localStorage.getItem("twitterId");
const wallet_address = localStorage.getItem("wallet_address");
const referralCode = localStorage.getItem("referralCode");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, countdown * 1000); // Enable button after `countdown` seconds

    return () => clearTimeout(timer);
  }, [countdown]); // Run effect whenever `countdown` changes

  const handleResendOTP = async () => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  
      setIsResending(true);
      setIsButtonDisabled(true);
      const reqBody = {
        email: email,
        member_name: member_name,
        contactNo: contactNo,
        twitterId: twitterId,
        wallet_address: wallet_address,
        referralCode: referralCode
      };
  
      // Make a request to your backend endpoint to resend OTP
      const response = await axios.post(`${BASEURL}/api/Auth/resendOTP`, reqBody);
      console.log(reqBody);
  
      // Check if the response status is in the 200 range (successful response)
      if (response.status >= 200 && response.status < 300) {
        enqueueSnackbar("OTP Resent Successfully", { variant: "success" });
        setCountdown(10); // Reset countdown to 10 seconds
      } else {
        throw new Error('Failed to resend OTP');
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      enqueueSnackbar("Error resending OTP. Please try again later.", {
        variant: "error",
      });
    } finally {
      setIsResending(false);
      setIsButtonDisabled(false); // Re-enable the button after the process
    }
  };
  

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

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
      <Stack sx={{ mb: 4 }} spacing={1}>
        <Typography variant="h5">Verify code</Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
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
                p: {
                  xs: "7px", // 5px padding on small screens
                  sm: "14px", // 14px padding on larger screens
                },
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
        <Box 
        sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
      >
        <Typography
          variant="body2"
          onClick={handleResendOTP}
          sx={{
            cursor: isResending || isButtonDisabled ? 'not-allowed' : 'pointer',
            color: isResending || isButtonDisabled ? 'grey' : 'primary.main',
            textDecoration: 'underline',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isResending ? "Resending..." : "Resend OTP"}
          {isButtonDisabled && <span> ({countdown}s)</span>}
        </Typography>
      </Box>
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
        We havve sent a one-time verification code to your email. Please check
        your inbox and enter the code here.
      </Typography>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
