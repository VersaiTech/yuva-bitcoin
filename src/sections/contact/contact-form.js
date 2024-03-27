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

import { useState } from 'react';
import { useFormik } from 'formik';
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
  Unstable_Grid2 as Grid
} from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  twitterId: Yup.string().required('Twitter ID is required'),
  message: Yup.string().required('Message/Query is required')
});

export const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      twitterId: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setSubmitting(true);
        // Here you can make your POST request using Axios or fetch
        console.log('Form values:', values);
        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Full Name *</FormLabel>
            <OutlinedInput
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && <FormHelperText error>{formik.errors.name}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Twitter ID *</FormLabel>
            <OutlinedInput
              name="twitterId"
              value={formik.values.twitterId}
              onChange={formik.handleChange}
              error={formik.touched.twitterId && Boolean(formik.errors.twitterId)}
            />
            {formik.touched.twitterId && <FormHelperText error>{formik.errors.twitterId}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12}>
          <FormControl fullWidth>
            <FormLabel>Email *</FormLabel>
            <OutlinedInput
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && <FormHelperText error>{formik.errors.email}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
            <FormLabel>Message/Query *</FormLabel>
            <OutlinedInput
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              multiline
              rows={6}
              error={formik.touched.message && Boolean(formik.errors.message)}
            />
            {formik.touched.message && <FormHelperText error>{formik.errors.message}</FormHelperText>}
          </FormControl>
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
