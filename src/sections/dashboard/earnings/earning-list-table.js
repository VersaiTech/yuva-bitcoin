// import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import numeral from 'numeral';
// import {
//   Box,
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TablePagination,
//   TableRow,
//   Typography,
//   Checkbox
// } from '@mui/material';
// import { SeverityPill } from '../../../components/severity-pill';

// const statusMap = {
//   complete: 'success',
//   pending: 'info',
//   canceled: 'warning',
//   rejected: 'error'
// };

// export const EarningListTable = (props) => {
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
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               Name
//             </TableCell>
//             <TableCell>
//               Description
//             </TableCell>
//             <TableCell>
//               Link
//             </TableCell>
//             <TableCell>
//               Coins
//             </TableCell>
//             <TableCell>
//               Status
//             </TableCell>
//             </TableRow>
//         </TableHead>
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
//                     alignItems: 'left',
//                     display: 'flex'
//                   }}
//                 >
//                   {/* <Box
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
//                     {/* </Typography>
//                     <Typography
//                       align="center"
//                       variant="h6"
//                     > */}
//                       {/* {createdAtDay} */}
//                     {/* </Typography>
//                   </Box> */}
//                   <Box >
//                     <Typography variant="subtitle2">
//                       {order.name}
//                     </Typography>
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                     >
//                       {order.taskName}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">
//                     {order.description}
//                 </TableCell>
//                 <TableCell align="left">
//                     {order.link}
//                 </TableCell>
//                 <TableCell align="left">
//                     {order.coins} coins
//                 </TableCell>
//                 <TableCell align="left">
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

// EarningListTable.propTypes = {
//   onOrderSelect: PropTypes.func,
//   onPageChange: PropTypes.func.isRequired,
//   onRowsPerPageChange: PropTypes.func,
//   orders: PropTypes.array.isRequired,
//   ordersCount: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired
// };

import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import { SeverityPill } from "../../../components/severity-pill";
import { useRouter } from "next/router";

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
  complete: "success",
  pending: "info",
  canceled: "warning",
  rejected: "error",
};

const useSelectionModel = (orders) => {
  const customerIds = useMemo(() => {
    return  orders.map((customer) => customer.member_user_id);
  }, [orders]);
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

export const EarningListTable = (props) => {
  const router = useRouter();


  const {
    orders,
    ordersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(orders);

  console.log(orders);

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

  const selectedAll = selected.length === orders.length;
  const selectedSome = selected.length > 0 && selected.length < orders.length;
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
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell> */}
              <TableCell>Coins</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              {/* <TableCell>Name</TableCell> */}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((customer, index) => {
              const isSelected = selected.includes(customer.member_user_id);
              const statusColor = statusMap[customer.status] || "warning";

              return (
                <TableRow
                  hover
                  key={customer.with_referrance}
                  selected={isSelected}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(customer.member_user_id);
                        } else {
                          deselectOne(customer.member_user_id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Stack alignItems="center"
direction="row"
spacing={2}>
                      <Avatar
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {/* {getInitials(customer.name)} */}
                        <img src="/yuvalogo2 - copy.png"
alt="Yuva Logo" />
                      </Avatar>
                      <div>
                        {/* <Link
                          color="inherit"
                          component={NextLink}
                          href={paths.dashboard.earnings.index}
                          variant="subtitle2"
                        >
                          {customer.name}
                        </Link> */}
                        <Typography color="text.primary"
variant="body2">
                          <h2>{customer.coins}</h2>
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.description}</TableCell>
                  <TableCell>{customer.link ? (
                      <Link
                        color="inherit"
                        href={customer.link}
                        target="_blank"
                        variant="subtitle2"
                        onClick={(e) => {
                          e.preventDefault(); 
                          router.push(customer.link); 
                        }}
                      >
                        {customer.link}
                      </Link>
                    ) : (
                      <Typography variant="subtitle2">N/A</Typography>
                    )}</TableCell>
                  {/* <TableCell>{customer.name}</TableCell> */}

                  <TableCell>
                    <Typography variant="subtitle2">
                      <SeverityPill color={statusColor}>
                        {customer.status}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

EarningListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
