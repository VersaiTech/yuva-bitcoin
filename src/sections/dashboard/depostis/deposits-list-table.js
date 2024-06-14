import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import RupeeIcon from "@mui/icons-material/MonetizationOn"; // Import Rupee icon from Material-UI Icons
import IndianRupeeIcon from "../depostis/deposits-drawer/indianRupeeIcon.svg";

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

const useSelectionModel = (customers) => {
  const customerIds = useMemo(() => {
    return Array.isArray(customers) ? customers.map((customer) => customer.member_user_id) : [];
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

export const DepositListTable = (props) => {
  const {
    customers=[],
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

  const getAvatarSrc = (depositType) => {
     let src = '/assets/logos/logo-usdt.svg';
    switch (depositType) {
      case 'usdt':
        src = '/assets/logos/logo-usdt.svg';
        break;
      case 'bnb':
        src = '/assets/logos/bnb-logo.png';
        break;
      case 'yuva':
        src = '/assets/logos/yuvalogo.png';
        break;
      case 'matic':
        src = '/assets/logos/logo-usdt.svg';
        break;
      default:
        return ;
    }
    return src;
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
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell> */}
              <TableCell>Amount</TableCell>
              {/* <TableCell>Task Id</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell> Deposit Method</TableCell>
              <TableCell>Transaction id</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(customers) && customers.map((customer) => {
            const isSelected = selected.includes(customer.member_user_id);

            return (
              <TableRow
                hover
                key={customer.member_user_id}
                selected={isSelected}
              >
                <TableCell>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Avatar
                      src={getAvatarSrc(customer.deposit_type)}
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      <h1></h1>
                    </Avatar>
                    <div>
                      {customer.amount || "N/A"}
                    </div>
                  </Stack>
                </TableCell>
                <TableCell>
                  {customer.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{(customer.deposit_type.toUpperCase())|| "N/A"}</TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {customer.transaction_hash || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {/* Actions if needed */}
                </TableCell>
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

DepositListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
