import NextLink from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Box, Button, Link, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
import { paths } from '../../../paths';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
//import IconButton, VisibilityOffIcon, VisibilityIcon
// import { IconButton, VisibilityOffIcon, VisibilityIcon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


const initialValues = {
  otp: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = Yup.object({
  otp: Yup
    .string()
    .length(6, 'Must be exactly 6 digits')
    .required('Required'),
  password: Yup
    .string()
    .min(7, 'Must be at least 7 characters')
    .max(255)
    .required('Required'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const togglePasswordConfirmVisibility = () => {
    setShowPassword(!showPassword);
  }

  const togglePasswordConfirmVisibility2 = () => {
    setShowPassword2(!showPassword2);
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      const email = new URLSearchParams(window.location.search).get('email');
      console.log(email);
      const otp = formik.values.otp;
      const password = formik.values.password;
      const passwordConfirm = formik.values.passwordConfirm;
      if (password !== passwordConfirm) {
        formik.setFieldError('passwordConfirm', 'Passwords must match');
        return;
      }

      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Auth/verifyOTPForResetPassword`, {
          email: email,
          otp: otp,
          newPassword: password,
          passwordConfirm: passwordConfirm
        })
        .then((response) => {
          console.log(response);
          router.push(paths.auth.login.modern);
          enqueueSnackbar('Password reset successful', {
            variant: 'success'
          })
        })
        .catch((error) => {
          console.error(error);
          formik.setFieldError('otp', 'Invalid OTP');
          enqueueSnackbar('Invalid OTP', {
            variant: 'error'
          })
        });
    }
  });

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.dashboard.index}
          sx={{
            alignItems: 'center',
            display: 'inline-flex'
          }}
          underline="hover"
        >
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Typography variant="subtitle2">
            Dashboard
          </Typography>
        </Link>
      </Box>
      <Stack
        sx={{ mb: 4 }}
        spacing={1}
      >
        <Typography variant="h5">
          Reset password
        </Typography>
      </Stack>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={3}>
          <TextField
            error={!!(formik.touched.otp && formik.errors.otp)}
            fullWidth
            helperText={formik.touched.otp && formik.errors.otp}
            label="OTP"
            name="otp"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.otp}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordConfirmVisibility}
edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
            fullWidth
            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            label="Password (Confirm)"
            name="passwordConfirm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={showPassword2 ? "text" : "password"}
            value={formik.values.passwordConfirm}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordConfirmVisibility2}
edge="end">
                  {showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </Stack>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
        >
          Reset
        </Button>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;

