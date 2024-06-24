
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Box,
//   Button,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Badge,
// } from '@mui/material';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';
// import { green } from "@mui/material/colors";

// const OrdersPage = () => {
//   const router = useRouter();
//   const { type, userId: userString } = router.query;
//   const { enqueueSnackbar } = useSnackbar();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

//   useEffect(() => {
//     if (!type || !userString) return;

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const headers = { Authorization: token };
//         const endpoint =
//           type === 'buy'
//             ? `${BASEURL}/api/Order/getBuyOrdersForAdminForOneUser/${userString}`
//             : `${BASEURL}/api/Order/getOrdersForAdminForOneUser/${userString}`;
//         const response = await axios.get(endpoint, { headers });
//         setOrders(response.data.orders);
//         setLoading(false);
//         enqueueSnackbar('Orders fetched successfully', { variant: 'success' });
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//         enqueueSnackbar('Failed to fetch orders', { variant: 'error' });
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [type, userString, enqueueSnackbar, BASEURL]);

//   const getStatusBadge = (isActive) => {
//     const color = isActive ? 'success' : 'error';
//     const text = isActive ? 'Active' : 'Inactive';
//     return <Badge color={color} variant="dot" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} />;
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Button onClick={() => router.back()} variant="contained" sx={{ mb: 3 }}>
//         Back
//       </Button>
//       <Typography variant="h6" sx={{ mb: 3 }}>
//         {type === 'buy' ? 'Buy Orders' : 'Orders'}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">Coin</TableCell>
//               <TableCell align="center">Exchange Currency</TableCell>
//               <TableCell align="center">Payment</TableCell>
//               <TableCell align="center">Status</TableCell>
//               <TableCell align="center">Amount</TableCell>
//               <TableCell align="center">Type</TableCell>
//               <TableCell align="center">Total</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell align="center">{order.coin.toUpperCase()}</TableCell>
//                 <TableCell align="center">{order.exchange_currency}</TableCell>
//                 <TableCell align="center">{order.payment_method.toUpperCase()}</TableCell>
//                 <TableCell align="center">{getStatusBadge(order.active)}</TableCell>
//                 <TableCell align="center">{order.amount}</TableCell>
//                 <TableCell align="center">
//                     <Typography variant="subtitle2" color={green[500]}>
//                       {order.transactionType === "order_sell"
//                         ? "Order Sell"
//                         : "Order Buy"}
//                     </Typography>
//                   </TableCell>
//                 <TableCell align="center">{order.total}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default OrdersPage;



import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Badge,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { green } from '@mui/material/colors';

const OrdersPage = () => {
  const router = useRouter();
  const { type, userId: userString } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!type || !userString) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: token };
        const endpoint =
          type === 'buy'
            ? `${BASEURL}/api/Order/getBuyOrdersForAdminForOneUser/${userString}`
            : `${BASEURL}/api/Order/getOrdersForAdminForOneUser/${userString}`;
        const response = await axios.get(endpoint, { headers });
        setOrders(response.data.orders);
        setLoading(false);
        enqueueSnackbar('Orders fetched successfully', { variant: 'success' });
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        enqueueSnackbar('Failed to fetch orders', { variant: 'error' });
        setLoading(false);
      }
    };

    fetchOrders();
  }, [type, userString, enqueueSnackbar, BASEURL]);

  const getStatusBadge = (isActive) => {
    const color = isActive ? 'success' : 'error';
    const text = isActive ? 'Active' : 'Inactive';
    return <Badge color={color} variant="dot" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} />;
  };

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button onClick={() => router.back()} variant="contained" sx={{ mb: 3 }}>
        Back
      </Button>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {type === 'buy' ? 'Buy Orders' : 'Orders'}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Coin Type</TableCell>
              <TableCell align="center">Exchange Currency</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center"l>
                  {order.coin.toUpperCase() === 'YUVA' ? 'YUVA BITCOIN' : order.coin.toUpperCase()}
                </TableCell>
                  <TableCell align="center">
                  {order.exchange_currency}
                  </TableCell>
                  <TableCell align="center">
                  {order.payment_method.toUpperCase()=== 'YUVA' ? 'YUVA BITCOIN' :order.payment_method.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">{getStatusBadge(order.active)}</TableCell>
                  <TableCell align="center">{order.amount}</TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2" color={green[500]}>
                      {order.transactionType === 'order_sell' ? 'Order Sell' : 'Order Buy'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{order.total}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
