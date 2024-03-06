// // Import the useCustomer hook from your Page component
// import { ArrowRightIcon } from '@untitled-ui/icons-react/build/esm/ArrowRight';
// import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Stack, SvgIcon, Typography } from '@mui/material';
// import { Chart } from '../../../components/chart';
// import { paths } from '../../../paths';
// import Link from 'next/link';
// import { useCustomer } from '../../../pages/dashboard/withdrawals/useCustomer'; // Import the useCustomer hook

// const chartSeries = [83];

// const useChartOptions = () => {
//   // Your useChartOptions implementation
// };

// const OverviewEarnings = () => {
//   const customer = useCustomer(); // Fetch the customer balance using the useCustomer hook
//   const chartOptions = useChartOptions();

//   return (
//     <Box
//       sx={{
//         backgroundColor: (theme) => theme.palette.mode === 'dark'
//           ? 'neutral.800'
//           : 'neutral.100',
//         p: 3,
//         backgroundColor: (theme) => theme.palette.mode === 'dark'
//       }}
//     >
//       <Grid
//         container
//         spacing={4}
//       >
//         <Grid
//           xs={12}
//           md={6}
//         >
//           <Card>
//             <CardContent>
//               <Stack
//                 alignItems="center"
//                 direction="row"
//                 spacing={2}
//               >
//                 <img
//                   src="/yuvalogo2.png " // Replace with the path to your image
//                   alt="Your Image"
//                   style={{
//                     width: 100, // Adjust the width of the image as needed
//                     height: 100, // Adjust the height of the image as needed
//                     objectFit: 'cover', // Ensure the image covers the entire container
//                     borderRadius: '50%', // Apply border radius to make it circular
//                     zIndex: 1 // Ensure the image is above other content
//                   }}
//                 />
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Stack spacing={1}>
//                     <Typography variant="h4">
//                       132 YB
//                     </Typography>
//                     <Typography variant="h6">
//                       Total Earnings
//                     </Typography>
//                   </Stack>
//                 </Box>
//               </Stack>
//             </CardContent>
//             <Divider />
//             <CardActions>
//               <Link href={paths.dashboard.earnings.index}>
//                 <Button
//                   color="inherit"
//                   endIcon={(
//                     <SvgIcon>
//                       <ArrowRightIcon />
//                     </SvgIcon>
//                   )}
//                 >
//                   See all earnings
//                 </Button>
//               </Link>
//             </CardActions>
//           </Card>
//         </Grid>
//         <Grid
//           xs={12}
//           md={6}
//         >
//           <Card>
//             <CardContent>
//               <Stack
//                 alignItems="center"
//                 direction="row"
//                 spacing={2}
//               >
//                 <Chart
//                   height={120}
//                   options={chartOptions}
//                   series={chartSeries}
//                   type="radialBar"
//                   width={120}
//                 />
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Stack spacing={1}>
//                     <Typography variant="h4">
//                       {customer} {/* Display the customer balance */}
//                     </Typography>
//                     <Typography variant="h6">
//                       Your Wallet Balance
//                     </Typography>
//                   </Stack>
//                 </Box>
//               </Stack>
//             </CardContent>
//             <Divider />
//             <CardActions>
//               <Link href={paths.dashboard.withdraw.create}>
//                 <Button
//                   color="inherit"
//                   endIcon={(
//                     <SvgIcon>
//                       <ArrowRightIcon />
//                     </SvgIcon>
//                   )}
//                 >
//                   Withdraw money
//                 </Button>
//               </Link>
//             </CardActions>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// // OverviewEarnings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default OverviewEarnings;



import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronUpIcon from '@untitled-ui/icons-react/build/esm/ChevronUp';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Link,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../../components/chart';
import { useCustomer } from '../../../pages/dashboard/withdrawals/useCustomer';
import {paths} from '../../../paths';

const chartSeries = [83];

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false
        },
        hollow: {
          size: '50%'
        },
        track: {
          background: theme.palette.background.default
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };
};

export const OverviewEarnings = () => {
  const chartOptions = useChartOptions();
  const customer = useCustomer();


  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'neutral.100',
        // p: 3,
        backgroundColor: (theme) => theme.palette.mode === 'dark'
      }}
    >
      <Grid
        container
        spacing={4}
      >
        <Grid
          xs={12}
          md={6}
        >
          <Card>
            <CardContent>
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <img
                  src="/yuvalogo2.png " // Replace with the path to your image
                  alt="Your Image"
                  style={{
                    width: 100, // Adjust the width of the image as needed
                    height: 100, // Adjust the height of the image as needed
                    objectFit: 'cover', // Ensure the image covers the entire container
                    borderRadius: '50%', // Apply border radius to make it circular
                    zIndex: 1 // Ensure the image is above other content
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      132 YB
                    </Typography>
                    <Typography variant="h6">
                      Total Earnings
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions>
              <Link href={paths.dashboard.earnings.index}>
                <Button
                  color="inherit"
                  endIcon={(
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  )}
                >
                  See all earnings
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Card>
            <CardContent>
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Chart
                  height={120}
                  options={chartOptions}
                  series={chartSeries}
                  type="radialBar"
                  width={120}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {customer} {/* Display the customer balance */}
                    </Typography>
                    <Typography variant="h6">
                      Your Wallet Balance
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions>
              <Link href={paths.dashboard.withdraw.create}>
                <Button
                  color="inherit"
                  endIcon={(
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  )}
                >
                  Withdraw money
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

//   return (
//     <Box
//       sx={{
//         backgroundColor: (theme) => theme.palette.mode === 'dark'
//           ? 'neutral.800'
//           : 'neutral.100',
//         p: 3
//       }}
//     >
//       <Grid
//         container
//         spacing={3}
//       >
//         <Grid
//           xs={12}
//           md={6}
//         >
//           <Card>
//             <CardContent>
//               <Stack
//                 alignItems="center"
//                 direction="row"
//                 spacing={2}
//               >
//                 <Chart
//                   height={160}
//                   options={chartOptions}
//                   series={chartSeries}
//                   type="radialBar"
//                   width={160}
//                 />
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Stack spacing={1}>
//                     <Typography variant="h4">
//                       0.299 BTC
//                     </Typography>
//                     <Typography variant="subtitle2">
//                       Weekly earnings
//                     </Typography>
//                   </Stack>
//                 </Box>
//                 <Avatar
//                   sx={{
//                     backgroundColor: 'success.alpha8',
//                     color: 'success.main'
//                   }}
//                   variant="rounded"
//                 >
//                   <SvgIcon>
//                     <ChevronUpIcon />
//                   </SvgIcon>
//                 </Avatar>
//               </Stack>
//             </CardContent>
//             <Divider />
//             <CardActions>
//               <Button
//                 color="inherit"
//                 endIcon={(
//                   <SvgIcon>
//                     <ArrowRightIcon />
//                   </SvgIcon>
//                 )}
//               >
//                 See all activity
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//         <Grid
//           xs={12}
//           md={6}
//         >
//           <Card>
//             <CardContent>
//               <Stack
//                 alignItems="center"
//                 direction="row"
//                 spacing={2}
//               >
//                 <Chart
//                   height={160}
//                   options={chartOptions}
//                   series={chartSeries}
//                   type="radialBar"
//                   width={160}
//                 />
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Stack spacing={1}>
//                     <Typography variant="h4">
//                       {customer}
//                     </Typography>
//                     <Typography variant="subtitle2">
//                       Your private wallet
//                     </Typography>
//                   </Stack>
//                 </Box>
//                 <Avatar
//                   sx={{
//                     backgroundColor: 'error.alpha8',
//                     color: 'error.main'
//                   }}
//                   variant="rounded"
//                 >
//                   <SvgIcon>
//                     <ChevronDownIcon />
//                   </SvgIcon>
//                 </Avatar>
//               </Stack>
//             </CardContent>
//             <Divider />
//             <CardActions>
//               <Button
//                 color="inherit"
//                 endIcon={(
//                   <SvgIcon>
//                     <ArrowRightIcon />
//                   </SvgIcon>
//                 )}
//               >
//                 Withdraw money
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

