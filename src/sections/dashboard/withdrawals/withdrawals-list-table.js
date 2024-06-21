

// import { useCallback, useEffect, useMemo, useState } from "react";
// import NextLink from "next/link";
// import PropTypes from "prop-types";
// import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
// import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
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
//   Typography,
// } from "@mui/material";
// import { Scrollbar } from "../../../components/scrollbar";
// import { paths } from "../../../paths";
// import { getInitials } from "../../../utils/get-initials";
// import { SeverityPill } from "../../../components/severity-pill";

// const statusMap = {
//   complete: "Approved",
//   pending: "info",
//   canceled: "warning",
//   rejected: "error",
// };


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
//     selected,
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
//   const { deselectAll, selectAll, deselectOne, selectOne, selected } =
//     useSelectionModel(customers);


//   const handleToggleAll = useCallback(
//     (event) => {
//       const { checked } = event.target;

//       if (checked) {
//         selectAll();
//       } else {
//         deselectAll();
//       }
//     },
//     [selectAll, deselectAll]
//   );

//   const selectedAll = selected.length === customers.length;
//   const selectedSome =
//     selected.length > 0 && selected.length < customers.length;
//   const enableBulkActions = selected.length > 0;

//   return (
//     <Box sx={{ position: "relative" }} {...other}>
//       {enableBulkActions && (
//         <Stack
//           direction="row"
//           spacing={2}
//           sx={{
//             alignItems: "center",
//             backgroundColor: (theme) =>
//               theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
//             display: enableBulkActions ? "flex" : "none",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             px: 2,
//             py: 0.5,
//             zIndex: 10,
//           }}
//         >
//           <Checkbox
//             checked={selectedAll}
//             indeterminate={selectedSome}
//             onChange={handleToggleAll}
//           />
//           <Button color="inherit" size="small">
//             Delete
//           </Button>
//           <Button color="inherit" size="small">
//             Edit
//           </Button>
//         </Stack>
//       )}
//       <Scrollbar>
//         <Table sx={{ minWidth: 700 }}>
//           <TableHead>
//             <TableRow>
             
//               <TableCell>Name</TableCell>
//               <TableCell>Coin Type</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {customers.map((customer, index) => {
//               const isSelected = selected.includes(customer.member_user_id);

//               return (
//                 <TableRow
//                   hover
//                   key={customer.with_referrance}
//                   selected={isSelected}
//                 >
               
//                   <TableCell>
//                     <Stack alignItems="center" direction="row" spacing={1}>
//                       <Avatar
//                         src={customer.avatar}
//                         sx={{
//                           height: 42,
//                           width: 42,
//                         }}
//                       >
//                         {getInitials(customer.member_name)}
//                       </Avatar>
//                       <div>
                       
//                         <Typography color="text.secondary" variant="body2">
//                           {customer.member_name}
//                         </Typography>
//                         <Typography color="text.secondary" variant="body2">
//                           {customer.member_user_id}
//                         </Typography>
//                         <Typography color="text.secondary" variant="body2">
//                           <span style={{ color: 'orange' }}>Wallet Adress: </span>
//                           <span style={{ color: 'green', cursor: 'pointer' }}
//                                 onDoubleClick={() => {
//                                   navigator.clipboard.writeText(customer.wallet_address);
//                                 }}>
//                             {customer.wallet_address}
//                           </span>
//                         </Typography>
//                       </div>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>{customer.conversion_type}</TableCell>
//                   <TableCell>{new Date(customer.with_date).toLocaleDateString('en-GB', {
//                     day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
//                   })}</TableCell>
//                   <TableCell>{customer.with_amt}</TableCell>
//                  <TableCell >
//                   <SeverityPill color={statusMap[customer.status] || 'warning'}>
//                     {customer.status}
//                   </SeverityPill>
//                 </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       component={NextLink}
//                       href={`${paths.dashboard.withdrawal.edit}${customer.with_referrance}/edit`}
//                     >
//                       <SvgIcon>
//                         <Edit02Icon />
//                       </SvgIcon>
//                     </IconButton>
//                     {/* <IconButton
//                       component={NextLink}
//                       href={paths.dashboard.withdrawal.details}
//                     >
//                       <SvgIcon>
//                         <ArrowRightIcon />
//                       </SvgIcon>
//                     </IconButton> */}
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
//   rowsPerPage: PropTypes.number.isRequired,
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
    return (customers || []).map((customer) => customer.with_referrance);
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
            {(customers || []).map((customer, index) => {
              const isSelected = selected.includes(customer.with_referrance);
              // const statusColor = statusMap[customer.status] || 'warning';

              return (
                <>
                  <TableRow
                    hover
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
                            href={paths.dashboard.Stake.index}
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
                      <TableRow key={`${customer.with_referrance}-remarks`}>
                      <TableCell colSpan={3}>
                        <Typography variant="body2">
                          Reason: {customer.remarks}
                        </Typography>
                      </TableCell>
                    </TableRow>
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

WithdrawalsListTable.defaultProps = {
  customers: [],
};
