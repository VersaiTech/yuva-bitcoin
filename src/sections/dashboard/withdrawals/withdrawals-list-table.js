// import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import numeral from 'numeral';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TablePagination,
//   TableRow,
//   Typography
// } from '@mui/material';
// import { SeverityPill } from '../../../components/severity-pill';

// const statusMap = {
//   complete: 'success',
//   pending: 'info',
//   canceled: 'warning',
//   rejected: 'error'
// };

// export const WithdrawalsListTable = (props) => {
//   const {
//     onOrderSelect,
//     onPageChange,
//     onRowsPerPageChange,
//     orders,
//     ordersCount,
//     page,
//     rowsPerPage,
//     ...other
//   } = props;

//   return (
//     <div {...other}>
//       <Table>
//         <TableBody>
//           {orders.map((order) => {
//             // const createdAtMonth = format(order.createdAt, 'LLL').toUpperCase();
//             // const createdAtDay = format(order.createdAt, 'd');
//             const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);
//             const statusColor = statusMap[order.status] || 'warning';

//             return (
//               <TableRow
//                 hover
//                 key={order.id}
//                 onClick={() => onOrderSelect?.(order.id)}
//                 sx={{ cursor: 'pointer' }}
//               >
//                 <TableCell
//                   sx={{
//                     alignItems: 'center',
//                     display: 'flex'
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       backgroundColor: (theme) => theme.palette.mode === 'dark'
//                         ? 'neutral.800'
//                         : 'neutral.200',
//                       borderRadius: 2,
//                       maxWidth: 'fit-content',
//                       ml: 3,
//                       p: 1
//                     }}
//                   >
//                     <Typography
//                       align="center"
//                       variant="subtitle2"
//                     >
//                       {/* {createdAtMonth} */}
//                     </Typography>
//                     <Typography
//                       align="center"
//                       variant="h6"
//                     >
//                       {/* {createdAtDay} */}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ ml: 2 }}>
//                     <Typography variant="subtitle2">
//                       {order.member_name}
//                     </Typography>
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                     >
//                       Total of
//                       {' '}
//                       {totalAmount}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell>
//                   {order.with_amt}
//                 </TableCell>
//                 <TableCell align="right">
//                   <SeverityPill color={statusColor}>
//                     {order.status}
//                   </SeverityPill>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//       <TablePagination
//         component="div"
//         count={ordersCount}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </div>
//   );
// };

// WithdrawalsListTable.propTypes = {
//   onOrderSelect: PropTypes.func,
//   onPageChange: PropTypes.func.isRequired,
//   onRowsPerPageChange: PropTypes.func,
//   orders: PropTypes.array.isRequired,
//   ordersCount: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired
// };

// import { useCallback, useEffect, useMemo, useState } from 'react';
// import NextLink from 'next/link';
// import numeral from 'numeral';
// import PropTypes from 'prop-types';
// import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
// import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   IconButton,
//   Link,
//   Stack,
//   SvgIcon,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography
// } from '@mui/material';
// import { Scrollbar } from '../../../components/scrollbar';
// import { paths } from '../../../paths';
// import { getInitials } from '../../../utils/get-initials';

// const useSelectionModel = (customers) => {
//   const customerIds = useMemo(() => {
//     return customers.map((customer) => customer.member_user_id);
//   }, [customers]);
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     setSelected([]);
//   }, [customerIds]);

//   const selectOne = useCallback((customerId) => {
//     setSelected((prevState) => [...prevState, customerId]);
//   }, []);

//   const deselectOne = useCallback((customerId) => {
//     setSelected((prevState) => {
//       return prevState.filter((id) => id !== customerId);
//     });
//   }, []);

//   const selectAll = useCallback(() => {
//     setSelected([...customerIds]);
//   }, [customerIds]);

//   const deselectAll = useCallback(() => {
//     setSelected([]);
//   }, []);

//   return {
//     deselectAll,
//     deselectOne,
//     selectAll,
//     selectOne,
//     selected
//   };
// };

// export const WithdrawalsListTable = (props) => {
//   const {
//     customers,
//     customersCount,
//     onPageChange,
//     onRowsPerPageChange,
//     page,
//     rowsPerPage,
//     ...other
//   } = props;
//   const { deselectAll, selectAll, deselectOne, selectOne, selected } = useSelectionModel(customers);

//   console.log(customers);

//   const handleToggleAll = useCallback((event) => {
//     const { checked } = event.target;

//     if (checked) {
//       selectAll();
//     } else {
//       deselectAll();
//     }
//   }, [selectAll, deselectAll]);

//   const selectedAll = selected.length === customers.length;
//   const selectedSome = selected.length > 0 && selected.length < customers.length;
//   const enableBulkActions = selected.length > 0;

//   return (
//     <Box
//       sx={{ position: 'relative' }}
//       {...other}>
//       {enableBulkActions && (
//         <Stack
//           direction="row"
//           spacing={2}
//           sx={{
//             alignItems: 'center',
//             backgroundColor: (theme) => theme.palette.mode === 'dark'
//               ? 'neutral.800'
//               : 'neutral.50',
//             display: enableBulkActions ? 'flex' : 'none',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             px: 2,
//             py: 0.5,
//             zIndex: 10
//           }}
//         >
//           <Checkbox
//             checked={selectedAll}
//             indeterminate={selectedSome}
//             onChange={handleToggleAll}
//           />
//           <Button
//             color="inherit"
//             size="small"
//           >
//             Delete
//           </Button>
//           <Button
//             color="inherit"
//             size="small"
//           >
//             Edit
//           </Button>
//         </Stack>
//       )}
//       <Scrollbar>
//         <Table sx={{ minWidth: 700 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   checked={selectedAll}
//                   indeterminate={selectedSome}
//                   onChange={handleToggleAll}
//                 />
//               </TableCell>
//               <TableCell>
//                 Name
//               </TableCell>
//               <TableCell>
//                Date
//               </TableCell>
//               <TableCell>
//               Amount
//               </TableCell>
//               <TableCell>
//               Status
//               </TableCell>
//               <TableCell align="right">
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {customers.map((customer) => {
//               const isSelected = selected.includes(customer.member_user_id);
//               // const location = `${customer.city}, ${customer.state}, ${customer.country}`;
//               // const totalSpent = numeral(customer.totalSpent).format(`${customer.currency}0,0.00`);

//               return (
//                 <TableRow
//                   hover
//                   key={customer.member_user_id}
//                   selected={isSelected}
//                 >
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       checked={isSelected}
//                       onChange={(event) => {
//                         const { checked } = event.target;

//                         if (checked) {
//                           selectOne(customer.member_user_id);
//                         } else {
//                           deselectOne(customer.member_user_id);
//                         }
//                       }}
//                       value={isSelected}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Stack
//                       alignItems="center"
//                       direction="row"
//                       spacing={1}
//                     >
//                       <Avatar
//                         src={customer.avatar}
//                         sx={{
//                           height: 42,
//                           width: 42
//                         }}
//                       >
//                         {getInitials(customer.member_name)}
//                       </Avatar>
//                       <div>
//                         <Link
//                           color="inherit"
//                           component={NextLink}
//                           href={paths.dashboard.customers.details}
//                           variant="subtitle2"
//                         >
//                           {customer.member_name}
//                         </Link>
//                         <Typography
//                           color="text.secondary"
//                           variant="body2"
//                         >
//                           {customer.email}
//                         </Typography>
//                       </div>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>
//                     {customer.with_date}
//                   </TableCell>
//                   <TableCell>
//                     {customer.with_amt}
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2">
//                       {customer.status}
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       component={NextLink}
//                       href={paths.dashboard.customers.edit}
//                     >
//                       <SvgIcon>
//                         <Edit02Icon />
//                       </SvgIcon>
//                     </IconButton>
//                     <IconButton
//                       component={NextLink}
//                       href={paths.dashboard.customers.details}
//                     >
//                       <SvgIcon>
//                         <ArrowRightIcon />
//                       </SvgIcon>
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </Scrollbar>
//       <TablePagination
//         component="div"
//         count={customersCount}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Box>
//   );
// };

// WithdrawalsListTable.propTypes = {
//   customers: PropTypes.array.isRequired,
//   customersCount: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   onRowsPerPageChange: PropTypes.func,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired
// };

import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import { SeverityPill } from "../../../components/severity-pill";
import TrendUp02Icon from "@untitled-ui/icons-react/build/esm/TrendUp02";
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import { paths } from "../../../paths";
import { getInitials } from "../../../utils/get-initials";

const statusMap = {
  Approved: "success",
  pending: "info",
  canceled: "warning",
  Rejected: "error",
};

const useSelectionModel = (customers) => {
  const customerIds = useMemo(() => {
    return customers.map((customer) => customer.with_referrance);
  }, [customers]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [customerIds]);

  const selectOne = useCallback((customerId) => {
    setSelected((prevState) => [...prevState, customerId]);
  }, []);

  const deselectOne = useCallback((customerId) => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== customerId);
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected([...customerIds]);
  }, [customerIds]);

  const deselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    deselectAll,
    deselectOne,
    selectAll,
    selectOne,
    selected,
  };
};

export const WithdrawalsListTable = (props) => {
  const {
    customers = [],
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(customers);

  console.log(customers);

  const handleToggleAll = useCallback(
    (event) => {
      const { checked } = event.target;

      if (checked) {
        selectAll();
      } else {
        deselectAll();
      }
    },
    [selectAll, deselectAll]
  );

  const selectedAll = selected.length === customers.length;
  const selectedSome =
    selected.length > 0 && selected.length < customers.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: "relative" }}
      {...other}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={handleToggleAll}
          />
          <Button color="inherit"
            size="small">
            Delete
          </Button>
          <Button color="inherit"
            size="small">
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => {
              const isSelected = selected.includes(customer.with_referrance);
              // const statusColor = statusMap[customer.status] || 'warning';

              return (
                <>
                  <TableRow
                    hover
                    key={customer.with_referrance}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack alignItems="center"
                        direction="row"
                        spacing={1}>
                        <Avatar
                          src={customer.avatar}
                          sx={{
                            height: 42,
                            width: 42,
                          }}
                        >
                          <div>
                            {/* Icon wrapped in a container with green color */}
                            <span style={{ color: "green" }}>
                              <TrendUp02Icon />
                            </span>
                          </div>
                          {/* {getInitials(customer.member_name)} */}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            component={NextLink}
                            href={paths.dashboard.stake.index}
                            variant="subtitle2"
                          >
                            <h3>  {customer.with_amt}</h3>
                          </Link>
                          {/* <Typography color="text.secondary" variant="body2">
                          {customer.member_user_id}
                        </Typography> */}
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={statusMap[customer.status] || "warning"}
                      >
                        {customer.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{format(new Date(customer.with_date), 'MMMM dd, yyyy hh:mm a')}</TableCell>
                    
                  </TableRow>
                  {customer.status === "Rejected" && customer.remarks && (
                      <TableCell colSpan={3}>
                    <TableRow key={`${customer.with_referrance}-remarks`}>
                        <Typography variant="body2">
                          Reason: {customer.remarks}
                        </Typography>
                    </TableRow>
                      </TableCell>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

WithdrawalsListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
