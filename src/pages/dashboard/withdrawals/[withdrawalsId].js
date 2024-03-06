// import { useCallback, useEffect, useState } from 'react';
// import NextLink from 'next/link';
// import Head from 'next/head';
// import { format } from 'date-fns';
// import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
// import CalendarIcon from '@untitled-ui/icons-react/build/esm/Calendar';
// import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
// import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
// import { Box, Button, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
// import { ordersApi } from '../../../api/orders';
// import { useMounted } from '../../../hooks/use-mounted';
// import { usePageView } from '../../../hooks/use-page-view';
// import { Layout as DashboardLayout } from '../../../layouts/dashboard';
// import { paths } from '../../../paths';
// import { OrderItems } from '../../../sections/dashboard/order/order-items';
// import { OrderLogs } from '../../../sections/dashboard/order/order-logs';
// import { OrderSummary } from '../../../sections/dashboard/order/order-summary';

// const useOrder = () => {
//   const isMounted = useMounted();
//   const [order, setOrder] = useState(null);

//   const getOrder = useCallback(async () => {
//     try {
//       const response = await ordersApi.getOrder();

//       if (isMounted()) {
//         setOrder(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);

//   useEffect(() => {
//       getOrder();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []);

//   return order;
// };

// const Page = () => {
//   const order = useOrder();

//   usePageView();

//   if (!order) {
//     return null;
//   }

//   const createdAt = format(order.createdAt, 'dd/MM/yyyy HH:mm');

//   return (
//     <>
//       <Head>
//         <title>
//           Dashboard: Order Details | Rock34x 
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 4
//         }}
//       >
//         <Container maxWidth="lg">
//           <Stack spacing={4}>
//             <div>
//               <Link
//                 color="text.primary"
//                 component={NextLink}
//                 href={paths.dashboard.orders.index}
//                 sx={{
//                   alignItems: 'center',
//                   display: 'inline-flex'
//                 }}
//                 underline="hover"
//               >
//                 <SvgIcon sx={{ mr: 1 }}>
//                   <ArrowLeftIcon />
//                 </SvgIcon>
//                 <Typography variant="subtitle2">
//                   Orders
//                 </Typography>
//               </Link>
//             </div>
//             <div>
//               <Stack
//                 alignItems="flex-start"
//                 direction="row"
//                 justifyContent="space-between"
//                 spacing={3}
//               >
//                 <Stack spacing={1}>
//                   <Typography variant="h4">
//                     {order.number}
//                   </Typography>
//                   <Stack
//                     alignItems="center"
//                     direction="row"
//                     spacing={1}
//                   >
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                     >
//                       Placed on
//                     </Typography>
//                     <SvgIcon color="action">
//                       <CalendarIcon />
//                     </SvgIcon>
//                     <Typography variant="body2">
//                       {createdAt}
//                     </Typography>
//                   </Stack>
//                 </Stack>
//                 <div>
//                   <Stack
//                     alignItems="center"
//                     direction="row"
//                     spacing={2}
//                   >
//                     <Button
//                       color="inherit"
//                       endIcon={(
//                         <SvgIcon>
//                           <Edit02Icon />
//                         </SvgIcon>
//                       )}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       endIcon={(
//                         <SvgIcon>
//                           <ChevronDownIcon />
//                         </SvgIcon>
//                       )}
//                       variant="contained"
//                     >
//                       Action
//                     </Button>
//                   </Stack>
//                 </div>
//               </Stack>
//             </div>
//             <OrderSummary order={order} />
//             <OrderItems items={order.items || []} />
//             <OrderLogs logs={order.logs || []} />
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default Page;

import { NextLink, Typography, Box, Container, Stack, SvgIcon, Card, CardHeader, CardContent, Divider, Button, } from '@mui/material';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import Link from 'next/link';
import { WithdrawalsCreateForm } from '../../../sections/dashboard/withdrawals/withdrawals-create-form';
import { useCustomer } from './useCustomer'; // Import the useCustomer hook from the new file
import Head from 'next/head';

const Page = () => {
  const customer = useCustomer();

  return (
    <>
      <Head>
        <title>Dashboard: Withdraw | Yuva Bitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
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
                    Withdrawals
                  </Typography>
                </Link>
              </div>
              <div>
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                  <Card>
                    <CardHeader
                      subheader={(
                        <Typography variant="h4" color="green">
                          {"₿" + customer}
                        </Typography>
                      )}
                      sx={{ pb: 0 }}
                      title={(
                        <Typography
                          color="text.secondary"
                          variant="overline"
                        >
                          Total balance
                        </Typography>
                      )}
                    />
                    <CardContent>
                      <Divider sx={{ mb: 2 }} />
                      <Typography
                        color="text.secondary"
                        variant="overline"
                      >
                        Available currency
                      </Typography>
                      <Divider />
                      <Stack
                        alignItems="flex-start"
                        spacing={1}
                        sx={{ mt: 2 }}
                      >
                        <Link component={NextLink} href={paths.dashboard.deposits.index}>
                          <Button
                            color="inherit"
                            endIcon={(
                              <SvgIcon>
                                <ArrowRightIcon />
                              </SvgIcon>
                            )}
                          >
                            Add money
                          </Button>
                        </Link>
                        <Link component={NextLink} href={paths.dashboard.withdraw.create}>
                          <Button
                            color="inherit"
                            endIcon={(
                              <SvgIcon>
                                <ArrowRightIcon />
                              </SvgIcon>
                            )}
                          >
                            Withdraw funds
                          </Button>
                        </Link>
                      </Stack>
                    </CardContent>
                  </Card>
                </Container>
              </div>
            </Stack>
            <WithdrawalsCreateForm /> {/* handleSubmit={handleSubmit} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
