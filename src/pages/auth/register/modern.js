import NextLink from 'next/link';
import * as Yup from 'yup';
import { useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { useRouter } from 'next/router'; // Import useRouter for navigation

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
  Typography
} from '@mui/material';
import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
import { paths } from '../../../paths';
import { useAuth } from '../../../hooks/use-auth';
import { useMounted } from '../../../hooks/use-mounted';
import Axios from 'axios';
import { useSnackbar } from 'notistack';

const initialValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  contactNumber: '', // New field
  twitterId: '', // New field
  policy: false
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  password: Yup
    .string()
    .min(7)
    .max(255)
    .required('Password is required'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  contactNumber: Yup
    .string()
    .matches(/^\d{10}$/, 'Invalid phone number')
    .required('Contact Number is required'),
  twitterId: Yup
    .string()
    .max(15, 'Must be at most 15 characters')
    .required('Twitter ID is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter(); // Initialize useRouter
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       await signUp(values.name, values.email, values.password, values.confirmPassword);

  //       if (isMounted()) {
  //         router.push(paths.dashboard.index);
  //       }
  //     } catch (err) {
  //       console.error(err.response.data.message);

  //       if (isMounted()) {
  //         helpers.setStatus({ success: false });
  //         helpers.setErrors({ submit: err.message });
  //         helpers.setSubmitting(false);
  //       }
  //     }
  //   }
  // });


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        // Send registration data to backend API
        const response = await Axios.post(`${BASEURL}/api/Auth/register`, {
          contactNo: values.contactNumber,
          member_name: values.name,
          password: values.password,
          email: values.email,
          twitterId: values.twitterId,
          // Additional fields if necessary
        });

        if (response.data.status) {
          enqueueSnackbar('User Registered successfully', { variant: 'success' });
          if (isMounted()) {
            router.push(paths.dashboard.index);
          }
        } else {
          console.error(response.data.message);

          if (isMounted()) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: response.data.message });
            helpers.setSubmitting(false);
          }
        }
      } catch (err) {
        console.error('Error:', err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: 'Registration failed' });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.index}
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
      <Stack sx={{ mb: 4 }} spacing={1}>
        <Typography variant="h5">
          Register
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?
          {' '}
          <Link component={NextLink} href={paths.auth.login.modern} underline="hover" variant="subtitle2">
            Log in
          </Link>
        </Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={formik.touched.name && !!formik.errors.name}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
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
            type={showPassword ? 'text' : 'password'}
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
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            fullWidth
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
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
            error={formik.touched.contactNumber && !!formik.errors.contactNumber}
            fullWidth
            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            label="Contact Number"
            name="contactNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contactNumber}
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
        </Stack>
        <Box sx={{ alignItems: 'center', display: 'flex', ml: -1, mt: 1 }}>
          <Checkbox checked={formik.values.policy} name="policy" onChange={formik.handleChange} />
          <Typography color="text.secondary" variant="body2">
            I have read the {' '}
            <Link component="a" href="#">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {!!(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>{formik.errors.policy}</FormHelperText>
        )}
        <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
          Register
        </Button>
      </form>
    </div>
  );
};

Page.getLayout = page => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
