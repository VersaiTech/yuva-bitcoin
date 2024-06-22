

// import React,{useState} from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Button,
//   Divider,
//   Drawer,
//   Paper,
//   Stack,
//   Typography,
//   useMediaQuery,
//   Chip,
// } from '@mui/material';
// import { PropertyList } from '../../../../components/property-list';
// import { PropertyListItem } from '../../../../components/property-list-item';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';

// const UserDrawer = ({ open, onClose, user, onEdit }) => {
//   const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//   const { enqueueSnackbar } = useSnackbar();
//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
//   const align = lgUp ? 'horizontal' : 'vertical';

// const [orders, setOrders] = useState([]);
//   const [buyOrders, setBuyOrders] = useState([]);

//   const statusChip = user?.isActive ? (
//     <Chip label="Active" color="success" />
//   ) : (
//     <Chip label="Blocked" color="error" />
//   );

//   const handleGetOrders = async () => {
//     if (!user) return;
//      // const response = await customersApi.getCustomers(search);
//      const token = localStorage.getItem("accessToken");

//      const headers = {
//        Authorization: token,
//      };

//     const userId = user.member_user_id;
   

//     try {
//       const response = await axios.get(
//         `${BASEURL}/api/Order/getOrdersForAdminForOneUser/${userId}`,
//         { headers: headers }
//       );
// setOrders(response.data.orders); // Update state with fetched orders
//       console.log('Orders:', response.data.orders);
//       // Handle the data as needed
//       enqueueSnackbar('Orders fetched successfully', { variant: 'success' });
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//       enqueueSnackbar('Failed to fetch orders', { variant: 'error' });
//     }
//   };

//   const handleGetBuyOrders = async () => {
//     if (!user) return;

//     // const response = await customersApi.getCustomers(search);
//     const token = localStorage.getItem("accessToken");

//     const headers = {
//       Authorization: token,
//     };

//    const userId = user.member_user_id;

//    try {
//     const response = await axios.get(
//       `${BASEURL}/api/Order/getBuyOrdersForAdminForOneUser/${userId}`,
//       { headers: headers }
//     );
// setBuyOrders(response.data.orders);
//     console.log('Buy Orders:', response.data.orders);
//     // Handle the data as needed
//     enqueueSnackbar('Orders fetched successfully', { variant: 'success' });
//   } catch (error) {
//     console.error('Failed to fetch orders:', error);
//     enqueueSnackbar('Failed to fetch orders', { variant: 'error' });
//   }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//     >
//       <Box sx={{ px: 3, py: 2 }}>
//         <Stack
//           alignItems="center"
//           direction="row"
//           justifyContent="space-between"
//         >
//           <Typography variant="h6">User Details</Typography>
//         </Stack>
//       </Box>
//       <Divider />
//       <Box sx={{ p: 3 }}>
//         {user ? (
//           <Paper elevation={2} sx={{ p: 2 }}>
//             <PropertyList>
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Name"
//                 value={user.member_name.charAt(0).toUpperCase() + user.member_name.slice(1)}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="User Id"
//                 value={user.member_user_id}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Contact No"
//                 value={user.contactNo}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Email"
//                 value={user.email}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Registered Date"
//                 value={new Date(user.registration_date).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                 })}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Wallet"
//                 value={user.wallet_address}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Coins"
//                 value={(user.coins || 0).toFixed(4)}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="User Type"
//                 value={user.userType}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Twitter"
//                 value={user.twitterId}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="State"
//                 value={statusChip}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Referral Code"
//                 value={user.referralCode}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Deposited USDT"
//                 value={(user.deposit_usdt || 0).toFixed(4)}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Deposited BNB"
//                 value={(user.deposit_bnb || 0).toFixed(4)}
//               />
//               <PropertyListItem
//                 align={align}
//                 disableGutters
//                 divider
//                 label="Deposited MATIC"
//                 value={(user.deposit_matic || 0).toFixed(4)}
//               />
//             </PropertyList>
//           </Paper>
//         ) : (
//           <Typography variant="body1">No user selected</Typography>
//         )}
//       </Box>
//       <Box sx={{ p: 3, pt: 0 }}>
//         <Button
//           sx={{ mb: 2 }}
//           fullWidth
//           variant="contained"
//           onClick={handleGetOrders}
//         >
//           Get Orders
//         </Button>
//         <Button
//           fullWidth
//           variant="contained"
//           onClick={handleGetBuyOrders}
//         >
//           Get Buy Orders
//         </Button>
//       </Box>
//     </Drawer>
//   );
// };

// UserDrawer.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   user: PropTypes.object,
//   onEdit: PropTypes.func,
// };

// export default UserDrawer;




// src/components/UserDrawer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { PropertyList } from '../../../../components/property-list';
import { PropertyListItem } from '../../../../components/property-list-item';
import { useRouter } from 'next/router';

const UserDrawer = ({ open, onClose, user, onEdit }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const align = lgUp ? 'horizontal' : 'vertical';
  const router = useRouter();

  const statusChip = user?.isActive ? (
    <Chip label="Active" color="success" />
  ) : (
    <Chip label="Blocked" color="error" />
  );

  const handleNavigateToOrders = (type) => {
    if (!user) return;
    router.push({
      pathname: '/ordersPage',
      query: { type, userId: user.member_user_id }
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ px: 3, py: 2 }}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Typography variant="h6">User Details</Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        {user ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <PropertyList>
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Name"
                value={user.member_name.charAt(0).toUpperCase() + user.member_name.slice(1)}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="User Id"
                value={user.member_user_id}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Contact No"
                value={user.contactNo}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Email"
                value={user.email}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Registered Date"
                value={new Date(user.registration_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Wallet"
                value={user.wallet_address}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Coins"
                value={(user.coins || 0).toFixed(4)}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="User Type"
                value={user.userType}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Twitter"
                value={user.twitterId}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="State"
                value={statusChip}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Referral Code"
                value={user.referralCode}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Deposited USDT"
                value={(user.deposit_usdt || 0).toFixed(4)}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Deposited BNB"
                value={(user.deposit_bnb || 0).toFixed(4)}
              />
              <PropertyListItem
                align={align}
                disableGutters
                divider
                label="Deposited MATIC"
                value={(user.deposit_matic || 0).toFixed(4)}
              />
            </PropertyList>
          </Paper>
        ) : (
          <Typography variant="body1">No user selected</Typography>
        )}
      </Box>
      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          sx={{ mb: 2 }}
          fullWidth
          variant="contained"
          onClick={() => handleNavigateToOrders('orders')}
        >
          Get Orders
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleNavigateToOrders('buy')}
        >
          Get Buy Orders
        </Button>
      </Box>
    </Drawer>
  );
};

UserDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onEdit: PropTypes.func,
};

export default UserDrawer;
