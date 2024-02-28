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



import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Avatar, Box, Button, Chip, Container, Link, Stack, SvgIcon, Typography, Card, CardHeader, CardContent, Divider, List } from '@mui/material';
// import { customersApi } from '../../../../api/customers';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { WithdrawalsCreateForm} from '../../../sections/dashboard/withdrawals/withdrawals-create-form';
import { getInitials } from '../../../utils/get-initials';
import axios from 'axios';
// import { useRouter } from 'next/router';


const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useCustomer = () => {

  //need to get member_user_id from params

  // const router = useRouter();
  // const {userId} = router.query;

  // console.log(userId)

  // const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const getCustomer = useCallback(async () => {
    try {
      // const response = await customersApi.getCustomer();
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': token
      }

      const response = await axios.get(`${BASEURL}/admin/getuserbalance`, {
        headers: headers
      })

      console.log(response.data)
      setCustomer(response.data.balance);

      // if (isMounted()) {
      // }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getCustomer();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return customer;
};


// const handleSubmit = async (values) => {
//   try{
//     console.log('Form values:', values);
//     const token = localStorage.getItem('token');
//     const headers = {
//       'Authorization': token
//     }

//     const response = await axios.post(`${BASEURL}/admin/updateMemberStatus/:${customer.member_user_id}`,values, { headers: headers })

//     console.log(response);
//   }
//   catch(err){
//     console.log(err);
//   }
// }

const Page = () => {
  const customer = useCustomer();

  usePageView();

  // if (!customer) {
  //   return null;
  // }

  return (
    <>
      <Head>
        <title>
          Dashboard: Withdraw | Rock34x
        </title>
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
                  href={paths.dashboard.withdraw.index}
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
                          {"₹" + customer}
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
                        <Link component={NextLink}  href={paths.dashboard.deposits.index}>
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
                        <Link component={NextLink}  href={paths.dashboard.withdraw.index}>
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
              {/* <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(customer.member_name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {customer.email}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        user_id:
                      </Typography>
                      <Chip
                        label={customer.member_user_id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack> */}
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
