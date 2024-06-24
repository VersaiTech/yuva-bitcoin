import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
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
import { green } from "@mui/material/colors";

const useSelectionModel = (customers) => {
  const customerIds = useMemo(() => {
    return customers?.map((customer) => customer.id);
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

// Utility function to determine the display text
const getPaymentOrPurchasedCurrency = (customer) => {
  if (customer.payment_method) {
    return customer.payment_method.toUpperCase() === 'YUVA' ? 'YUVA BITCOIN' : customer.payment_method.toUpperCase();
  } else if (customer.purchasedCurrency) {
    return customer.purchasedCurrency.toUpperCase() === 'YUVA' ? 'YUVA BITCOIN' : customer.purchasedCurrency.toUpperCase();
  }
  return '';
};

export const MarketplaceListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(customers);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Box sx={{ position: "relative" }} {...other}>
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
          <Button color="inherit" size="small">
            Delete
          </Button>
          <Button color="inherit" size="small">
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Total Coin</TableCell>
              <TableCell>Coin Type</TableCell>
              <TableCell>Exchange Coin</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Total Amount</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isSelected = selected.includes(customer.member_user_id);
              const location = `${customer.city}, ${customer.state}, ${customer.country}`;
              const totalSpent = numeral(customer.totalSpent).format(
                `${customer.currency}0,0.00`
              );

              return (
                <TableRow
                  hover
                  key={customer.member_user_id}
                  selected={isSelected}
                >
                <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <div>
                      {customer.member_name}
                      <Typography color="text.secondary" variant="body2">
                      {customer.userId}
                    </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  {/*<TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                      </Avatar>
                      <div>
                        <Typography color="text.secondary" variant="body2">
                          {customer.member_name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {customer.member}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>*/}
                  <TableCell align="center">
                    <Typography variant="subtitle2" color={green[500]}>
                      {customer.transactionType === "order_sell"
                        ? "Order Sell"
                        : "Order Buy"}
                    </Typography>
                  </TableCell>

                  <TableCell>{customer.amount}</TableCell>
                  <TableCell>
                  {customer.coin.toUpperCase() === 'YUVA' ? 'YUVA BITCOIN' : customer.coin.toUpperCase()}
                </TableCell>
                  <TableCell>{customer.exchange_currency}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {formatDate(customer.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                  {getPaymentOrPurchasedCurrency(customer)}
                  </TableCell>
                  <TableCell>{customer.total}</TableCell>
                  {/* <TableCell align="right">
                    <IconButton
                      component={NextLink}
                      href={paths.dashboard.customers.edit}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={NextLink}
                      href={paths.dashboard.customers.details}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell> */}
                </TableRow>
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

MarketplaceListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
