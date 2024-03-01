import NextLink from 'next/link';
import * as Yup from 'yup';
import { useState } from 'react'; // Import useState
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';

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

const initialValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
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
  policy: Yup
    .boolean()
    .oneOf([true], 'This field must be checked')
});

const Page = () => {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => { }
  });

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
          Register
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Already have an account?
          &nbsp;
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
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={3}>
          <TextField
            error={!!(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <TextField
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
            type={showPassword ? 'text' : 'password'} // Toggle visibility based on state
            value={formik.values.password}
            InputProps={{ // Add eye icon button for toggling password visibility
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
            fullWidth
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'} // Toggle visibility based on state
            value={formik.values.confirmPassword}
            InputProps={{ // Add eye icon button for toggling password visibility
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </Stack>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
            mt: 1
          }}
        >
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
          />
          <Typography
            color="text.secondary"
            variant="body2"
          >
            I have read the
            {' '}
            <Link
              component="a"
              href="#"
            >
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {!!(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>
            {formik.errors.policy}
          </FormHelperText>
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

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
