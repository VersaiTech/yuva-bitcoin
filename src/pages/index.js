// import Head from 'next/head';
// import { usePageView } from '../hooks/use-page-view';
// import { Layout as MarketingLayout } from '../layouts/marketing';
// import { HomeCta } from '../sections/home/home-cta';
// import { HomeFaqs } from '../sections/home/home-faqs';
// import { HomeFeatures } from '../sections/home/home-features';
// import { HomeHero } from '../sections/home/home-hero';
// import { HomeReviews } from '../sections/home/home-reviews';

// const Page = () => {
//   usePageView();

//   return (
//     <>
//       <Head>
//         <title>
//           YuvaBitcoin 
//         </title>
//       </Head>
//       <main>
//         <HomeHero />
//         <HomeFeatures />
//         <HomeReviews />
//         <HomeCta />
//         <HomeFaqs />
//       </main>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <MarketingLayout>
//     {page}
//   </MarketingLayout>
// );

// export default Page;



// import NextLink from 'next/link';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
// import { Box, Button, Link, Stack, SvgIcon, TextField, Typography } from '@mui/material';
// import { Layout as AuthLayout } from '../layouts/auth/modern-layout';
// import { paths } from '../paths';
// import { useAuth } from '../hooks/use-auth';
// import { useMounted } from '../hooks/use-mounted';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useSnackbar } from 'notistack';


// const initialValues = {
//   email: '',
//   password: '',
//   submit: null
// };


// const useParams = () => {
//   const searchParams = useSearchParams();
//   const returnTo = searchParams.get('returnTo') || undefined;
//   return {
//     returnTo
//   };
// };

// const validationSchema = Yup.object({
//   email: Yup
//     .string()
//     .email('Must be a valid email')
//     .max(255)
//     .required('Email is required'),
//   password: Yup
//     .string()
//     .max(255)
//     .required('Password is required')
// });

// const Page = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const isMounted = useMounted();
//   const { issuer, signIn } = useAuth();
//   const { returnTo } = useParams();
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues,
//     validationSchema,

//     onSubmit: async (values, helpers) => {
//       console.log(values);
//       try {
//         await signIn(values.email, values.password);

//         if (isMounted()) {
//           enqueueSnackbar('Login successful!', { variant: 'success' });
//           router.push(returnTo || paths.dashboard.index);
//         }
//       } catch (err) {
//         console.error(err);

//         if (isMounted()) {
//           helpers.setStatus({ success: false });
//           helpers.setErrors({ submit: err.message });
//           helpers.setSubmitting(false);
//           enqueueSnackbar('Login failed. Please check your credentials.', { variant: 'error' });
//         }
//       }
//     }
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
//             Home Page
//           </Typography>
//         </Link>
//       </Box>
//       <Stack
//         sx={{ mb: 4 }}
//         spacing={1}
//       >
//         <Typography variant="h5">
//           Log in
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           Don&apos;t have an account?
//           &nbsp;
//           <Link
//             component={NextLink}
//             href={paths.auth.register.modern}
//             underline="hover"
//             variant="subtitle2"
//           >
//             Register
//           </Link>
//         </Typography>
//       </Stack>
//       <form
//         noValidate
//         onSubmit={formik.handleSubmit}
//       >
//         <Stack spacing={3}>
//           <TextField
//             autoFocus
//             error={!!(formik.touched.email && formik.errors.email)}
//             fullWidth
//             helperText={formik.touched.email && formik.errors.email}
//             label="Email Address"
//             name="email"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="email"
//             value={formik.values.email}
//           />
//           <TextField
//             error={!!(formik.touched.password && formik.errors.password)}
//             fullWidth
//             helperText={formik.touched.password && formik.errors.password}
//             label="Password"
//             name="password"
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             type="password"
//             value={formik.values.password}
//           />
//         </Stack>
//         <Button
//           fullWidth
//           sx={{ mt: 3 }}
//           size="large"
//           type="submit"
//           variant="contained"
//         >
//           Log in
//         </Button>
//         <Box sx={{ mt: 3 }}>
//           <Link
//             href="#"
//             underline="hover"
//             variant="subtitle2"
//           >
//             Forgot password?
//           </Link>
//         </Box>
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


import Head from "next/head";
import { subDays, subHours, subMinutes } from "date-fns";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePageView } from "../hooks/use-page-view";
import { useSettings } from "../hooks/use-settings";
import { Layout as DashboardLayout } from "../layouts/dashboard";
import { CryptoCards } from "../sections/dashboard/crypto/crypto-cards";
import { CryptoOperation } from "../sections/dashboard/crypto/crypto-operation";
import { CryptoWallet } from "../sections/dashboard/crypto/crypto-wallet";
import { CryptoTransactions } from "../sections/dashboard/crypto/crypto-transactions";
import { CryptoUpgrade } from "../sections/dashboard/crypto/crypto-upgrade";
import { CryptoCurrentBalance } from "../sections/dashboard/crypto/crypto-current-balance";
import { OverviewDoneTasks } from '../sections/dashboard/overview/overview-done-tasks';
import { OverviewOpenTickets } from '../sections/dashboard/overview/overview-open-tickets';
import { OverviewPendingIssues } from '../sections/dashboard/overview/overview-pending-issues';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/use-auth';
import { paths } from '../paths';
import Page from "./dashboard/portfolio";


const now = new Date();

const MyPage = () => {
  const settings = useSettings();
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated } = useAuth(); 

  usePageView();

  useEffect(() => {
    // Redirect the user to the dashboard if they are already authenticated
    if (!isAuthenticated) {
      router.push(paths.auth.login.modern); 
    }
  }, [isAuthenticated, router]);

  return (
    <>
      
      <Page />
    </>
  );
};

MyPage.getLayout = (MyPage) => <DashboardLayout>{MyPage}</DashboardLayout>;

export default MyPage;
