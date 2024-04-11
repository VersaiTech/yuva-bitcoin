import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Box, Button, Link, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
import { paths } from '../../../paths';
import { useAuth } from '../../../hooks/use-auth';
import { useMounted } from '../../../hooks/use-mounted';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';

const initialValues = {
  email: '',
  password: '',
  submit: null
};


const useParams = () => {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || undefined;
  return {
    returnTo
  };
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
  const { enqueueSnackbar } = useSnackbar();
  const isMounted = useMounted();
  const { issuer, signIn } = useAuth();
  const { returnTo } = useParams();
  const router = useRouter();
  

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, helpers) => {
      localStorage.setItem("email", values.email);
      console.log(values);
      try {
        await signIn(values.email, values.password);

        if (isMounted()) {
          enqueueSnackbar("Please Verify", {
            variant: "success",
          });
          router.push(paths.auth.verifyCode.modern);
        }
      } 
      catch (err) {
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
        console.log(err.response.data.message);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
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
         Admin Login
        </Typography>
        {/* <Typography
          color="text.secondary"
          variant="body2"
        >
          Don&apos;t have an account?
          &nbsp;
          <Link
            href="#"
            underline="hover"
            variant="subtitle2"
          >
            Register
          </Link>
        </Typography> */}
      </Stack>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={3}>
          <TextField
            autoFocus
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
          {/* <Link
            href="#"
            underline="hover"
            variant="subtitle2"
          >
            Forgot password?
          </Link> */}
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
