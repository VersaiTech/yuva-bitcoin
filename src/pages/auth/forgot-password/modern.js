import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Box, Button, Link, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
import { paths } from '../../../paths';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

const initialValues = {
  email: ''
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required')
});

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      try {
        const email = formik.values.email;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Auth/forgotPassword`, {
          email: email
        })
        console.log(response);
        enqueueSnackbar('Password reset email sent!', {
          variant: 'success'
        });
        router.push(`${paths.auth.resetPassword.modern}?email=${email}`);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Error sending password reset email', {
          variant: 'error'
        });
      }
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
          Forgot password
        </Typography>
      </Stack>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
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
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
        >
          Send reset link
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
