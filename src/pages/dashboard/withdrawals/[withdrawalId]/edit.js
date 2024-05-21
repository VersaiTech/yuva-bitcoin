// import { useCallback, useEffect, useState } from 'react';
// import NextLink from 'next/link';
// import Head from 'next/head';
// import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
// import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
// import { customersApi } from '../../../../api/customers';
// import { useMounted } from '../../../../hooks/use-mounted';
// import { usePageView } from '../../../../hooks/use-page-view';
// import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
// import { paths } from '../../../../paths';
// import { WithdrawalEditForm } from '../../../../sections/dashboard/withdrawals/withdrawals-edit-form';
// import { getInitials } from '../../../../utils/get-initials';
// import axios from 'axios';
// import { useRouter } from 'next/router';


// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const useCustomer = () => {

//   //need to get member_user_id from params

//   const router = useRouter();
//   const {withdrawalId} = router.query;

//   console.log(withdrawalId)

//   const isMounted = useMounted();
//   const [customer, setCustomer] = useState(null);

//   const getCustomer = useCallback(async () => {
//     try {
//       // const response = await customersApi.getCustomer();
//       const token = localStorage.getItem('accessToken');
//       const headers = {
//         'Authorization': token
//       }

//       const response = await axios.get(`${BASEURL}/api/Withdraw/getWithdrawByUserId/${withdrawalId}`, {
//         headers: headers
//       })


//       console.log(response.data)

//       if (isMounted()) {
//         setCustomer(response.data);
//       }
//     } catch (err) {
//       console.error(err.response.data);
//     }
//   }, [isMounted]);

//   useEffect(() => {
//     getCustomer();
//   },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []);

//   return customer;
// };


// // const handleSubmit = async (values) => {
// //   try{
// //     console.log('Form values:', values);
// //     const token = localStorage.getItem('token');
// //     const headers = {
// //       'Authorization': token
// //     }

// //     const response = await axios.post(`${BASEURL}/admin/updateMemberStatus/:${customer.member_user_id}`,values, { headers: headers })

// //     console.log(response);
// //   }
// //   catch(err){
// //     console.log(err);
// //   }
// // }

// const Page = () => {
//   const customer = useCustomer();

//   usePageView();

//   if (!customer) {
//     return null;
//   }

//   return (
//     <>
//       <Head>
//         <title>
//           Dashboard: Customer Edit | Rock34x
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
//             <Stack spacing={4}>
//               <div>
//                 <Link
//                   color="text.primary"
//                   component={NextLink}
//                   href={paths.dashboard.users.index}
//                   sx={{
//                     alignItems: 'center',
//                     display: 'inline-flex'
//                   }}
//                   underline="hover"
//                 >
//                   <SvgIcon sx={{ mr: 1 }}>
//                     <ArrowLeftIcon />
//                   </SvgIcon>
//                   <Typography variant="subtitle2">
//                     Customers
//                   </Typography>
//                 </Link>
//               </div>
//               <Stack
//                 alignItems="flex-start"
//                 direction={{
//                   xs: 'column',
//                   md: 'row'
//                 }}
//                 justifyContent="space-between"
//                 spacing={4}
//               >
//                 <Stack
//                   alignItems="center"
//                   direction="row"
//                   spacing={2}
//                 >
//                   <Avatar
//                     src={customer.avatar}
//                     sx={{
//                       height: 64,
//                       width: 64
//                     }}
//                   >
//                     {getInitials(customer.member_name)}
//                   </Avatar>
//                   <Stack spacing={1}>
//                     <Typography variant="h4">
//                       {customer.email}
//                     </Typography>
//                     <Stack
//                       alignItems="center"
//                       direction="row"
//                       spacing={1}
//                     >
//                       <Typography variant="subtitle2">
//                         user_id:
//                       </Typography>
//                       <Chip
//                         label={customer.member_user_id}
//                         size="small"
//                       />
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </Stack>
//             </Stack>
//              <WithdrawalEditForm customer={customer} /> {/* handleSubmit={handleSubmit} */}
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
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { customersApi } from '../../../../api/customers';
import { useMounted } from '../../../../hooks/use-mounted';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { paths } from '../../../../paths';
import { WithdrawalEditForm } from '../../../../sections/dashboard/withdrawals/withdrawals-edit-form';
import { getInitials } from '../../../../utils/get-initials';
import axios from 'axios';
import { useRouter } from 'next/router';


const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useCustomer = () => {

  //need to get member_user_id from params

  const router = useRouter();
  const {withdrawalId} = router.query;

  console.log(withdrawalId)

  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const getCustomer = useCallback(async () => {
    try {
      // const response = await customersApi.getCustomer();
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': token
      }

      const response = await axios.get(`${BASEURL}/api/Withdraw/getWithdrawByUserId/${withdrawalId}`, {
        headers: headers
      })


      console.log(response.data.withdraw)

      if (isMounted()) {
        setCustomer(response.data.withdraw);
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

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

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Withdrawal Edit | YuvaBitcoin
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
                  href={paths.dashboard.withdrawal.index}
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
              <Stack
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
              </Stack>
            </Stack>
             <WithdrawalEditForm customer={customer} /> {/* handleSubmit={handleSubmit} */}
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
