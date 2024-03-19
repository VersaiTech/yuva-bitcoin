import NextLink from 'next/link';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Box, Button, Link, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
import { paths } from '../../../paths';
import { useAuth } from '../../../hooks/use-auth';
import { useMounted } from '../../../hooks/use-mounted';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/router';


const initialValues = {
  email: '',
  password: '',
  submit: null
};


const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup
    .string()
    .max(255)
    .required('Password is required')
});

const Page = () => {
  const isMounted = useMounted();
  const { issuer, signIn } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar(); // Snackbar notification
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, helpers) => {
  try {
    setLoading(true);
    const { submit, ...payload } = values;
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.post(`${BASEURL}/api/Auth/login`, payload);

    if (!response.data.status) {
      const { message } = response.data;
      let errorMessage = '';
      
      // Check the backend error message and set the appropriate snackbar message
      if (message.includes('Invalid email')) {
        errorMessage = 'Invalid email. Please check your email address.';
      } else if (message.includes('Invalid password')) {
        errorMessage = 'Invalid password. Please check your password.';
      } else {
        errorMessage = 'An error occurred. Please try again later.';
      }
      
      console.log("Backend error message:", message);
      console.log("Snackbar error message:", errorMessage);
      
      enqueueSnackbar(errorMessage, { variant: 'error' });
      helpers.setSubmitting(false);
      setLoading(false);
      return;
    }

    const { token } = response.data;
    localStorage.setItem('token', token);
    console.log('Authentication token:', token);

    if (response.data.status) {
      enqueueSnackbar('User login successful', { variant: 'success' });
      if (isMounted()) {
        router.push(paths.dashboard.index);
      }
    } else {
      console.error(response.data.message);
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: response.data.message });
      helpers.setSubmitting(false);
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
    helpers.setSubmitting(false);
  } finally {
    setLoading(false);
  }
}

  });

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.auth.login.modern}
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
            Home
          </Typography>
        </Link>
      </Box>
      <Stack
        sx={{ mb: 4 }}
        spacing={1}
      >
        <Typography variant="h5">
          Log in
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Don&apos;t have an account?
          &nbsp;
          <Link
            component={NextLink}
            href={paths.auth.register.modern}
            underline="hover"
            variant="subtitle2"
          >
            Register
          </Link>
        </Typography>
      </Stack>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={3}>
          <TextField
            // autoFocus
            error={!!(formik.touched.email && formik.errors.email)}
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
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
        </Stack>
        <Button
          fullWidth
          sx={{ mt: 3 }}
          size="large"
          type="submit"
          variant="contained"
        >
          Continue
        </Button>
        <Box sx={{ mt: 3 }}>
          <Link
             component={NextLink}
            href={paths.auth.forgotPassword.modern}
            underline="hover"
            variant="subtitle2"
          >
            Forgot password?
          </Link>
        </Box>
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
