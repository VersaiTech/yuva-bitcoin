// import { useCallback } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Link,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Typography,
//   Unstable_Grid2 as Grid
// } from '@mui/material';

// export const ContactForm = () => {
//   const handleSubmit = useCallback((event) => {
//     event.preventDefault();
//   }, []);

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid
//         container
//         spacing={3}
//       >
//         <Grid
//           xs={12}
//           sm={6}
//         >
//           <FormControl fullWidth>
//             <FormLabel
//               sx={{
//                 color: 'text.primary',
//                 mb: 1
//               }}
//             >
//               Full Name *
//             </FormLabel>
//             <OutlinedInput
//               name="name"
//               required
//             />
//           </FormControl>
//         </Grid>
//         <Grid
//           xs={12}
//           sm={6}
//         >
//           <FormControl fullWidth>
//             <FormLabel
//               sx={{
//                 color: 'text.primary',
//                 mb: 1
//               }}
//             >
//               Twitter Id*
//             </FormLabel>
//             <OutlinedInput
//               name="company"
//               required
//             />
//           </FormControl>
//         </Grid>
//         <Grid
//           xs={12}
//           sm={12}
//         >
//           <FormControl fullWidth>
//             <FormLabel
//               sx={{
//                 color: 'text.primary',
//                 mb: 1
//               }}
//             >
//                Email *
//             </FormLabel>
//             <OutlinedInput
//               name="email"
//               type="email"
//               required
//             />
//           </FormControl>
//         </Grid>
//         <Grid xs={12}>
//           <FormControl fullWidth>
//             <FormLabel
//               sx={{
//                 color: 'text.primary',
//                 mb: 1
//               }}
//             >
//               Message/Query
//             </FormLabel>
//             <OutlinedInput
//               fullWidth
//               name="message"
//               required
//               multiline
//               rows={6}
//             />
//           </FormControl>
//         </Grid>
//       </Grid>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           mt: 3
//         }}
//       >
//         <Button
//           fullWidth
//           size="large"
//           variant="contained"
//         >
          
//           Let&apos;s Talk
//         </Button>
//       </Box>
//       <Typography
//         color="text.secondary"
//         sx={{ mt: 3 }}
//         variant="body2"
//       >
//         By submitting this, you agree to the
//         {' '}
//         <Link
//           color="text.primary"
//           href="#"
//           underline="always"
//           variant="subtitle2"
//         >
//           Privacy Policy
//         </Link>
//         {' '}
//         and
//         {' '}
//         <Link
//           color="text.primary"
//           href="#"
//           underline="always"
//           variant="subtitle2"
//         >
//           Cookie Policy
//         </Link>
//         .
//       </Typography>
//     </form>
//   );
// };

import { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook
import axios from 'axios';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  OutlinedInput,
  Typography,
  Unstable_Grid2 as Grid,
  TextField
} from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  twitterId: Yup.string().required('Twitter ID is required'),
  message: Yup.string().required('Message/Query is required')
});
const initialValues =
{
    name: '' ,
    email: '',
    twitterId: '',
    message: '',
}

export const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar function
  const [isMounted, setIsMounted] = useState(false); // State to track component mounting

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component mounts
    return () => {
      setIsMounted(false); // Set isMounted to false when component unmounts
    };
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        setSubmitting(true);
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Authorization token not found');
        }

        const headers = {
          Authorization: token,
        };

        // Prepare request body for posting new review
        const requestBody = {
          name: values.name, 
          email: values.email,
          twitterId: values.twitterId,
          message:values.message,
        };
        // Make POST request using Axios
        const response = await axios.post(`${BASEURL}/api/Support/createSupport`, requestBody, {
          headers: headers
        });
        console.log('Form values:', response.data);
        // Show success message using enqueueSnackbar
        enqueueSnackbar('Form submitted successfully', { variant: 'success' });
        if (isMounted) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        enqueueSnackbar('Error submitting form', { variant: 'error' });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Full Name *"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          color="primary" 
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="twitterId"
          name="twitterId"
          label="Twitter ID *"
          variant="outlined"
          value={formik.values.twitterId}
          onChange={formik.handleChange}
          error={formik.touched.twitterId && Boolean(formik.errors.twitterId)}
          helperText={formik.touched.twitterId && formik.errors.twitterId}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email *"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Message/Query *"
          variant="outlined"
          multiline
          rows={6}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />
      </Grid>
    </Grid>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Button
        fullWidth
        size="large"
        variant="contained"
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Let\'s Talk'}
      </Button>
    </Box>
    <Typography color="text.secondary" sx={{ mt: 3 }} variant="body2">
      By submitting this, you agree to the{' '}
      <Link href="#" underline="always">Privacy Policy</Link> and{' '}
      <Link href="#" underline="always">Cookie Policy</Link>.
    </Typography>
  </form>
  );
};
