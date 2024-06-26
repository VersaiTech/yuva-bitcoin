import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import YuvaLogo from "../../../../public/output-onlinepngtools.png";
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
import { useRouter } from "next/router";

const useSelectionModel = (customers) => {
  const customerIds = useMemo(() => {
    return customers.map((customer) => customer.member_user_id);
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

export const NewtaskListTable = (props) => {
  const router = useRouter();
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
              <TableCell></TableCell>
              <TableCell>Coins</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell> Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isSelected = selected.includes(customer.taskId);
              // const location = `${customer.city}, ${customer.state}, ${customer.country}`;
              // const totalSpent = numeral(customer.totalSpent).format(`${customer.currency}0,0.00`);

              return (
                <TableRow hover
key={customer.taskId + 1}
selected={isSelected}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(customer.taskId);
                        } else {
                          deselectOne(customer.taskId);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Avatar
                      src={customer.taskName}
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      {/* {getInitials(customer.taskName)} */}
                      {/* <YuvaLogo/> */}
                      <img src="/yuvalogo2 - copy.png"
alt="Yuva Logo" />
                    </Avatar>
                  </TableCell>
                  <TableCell >
                    <Stack alignItems="center"
direction="row"
spacing={1} >
                      {customer.coins}

                      <Typography color="text.secondary"
variant="body2">
                        {customer.email}
                      </Typography>
                    </Stack>
                  </TableCell>
                  {/* <TableCell>{customer.taskId}</TableCell> */}

                  <TableCell>{customer.taskName}</TableCell>

                  <TableCell>{customer.description}</TableCell>
                  <TableCell>
                    {customer.link ? (
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
                        {customer.link.length > 20 ? customer.link.substring(0, 20) + '...' : customer.link}
                      </Link>
                    ) : (
                      <Typography variant="subtitle2">N/A</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>

                  <TableCell align="right">
                    {/* <IconButton
                      component={NextLink}
                      href={`${paths.dashboard.users.edit}${customer.member_user_id}/edit`}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton> */}
                    {/* <IconButton
                      component={NextLink}
                      href={paths.dashboard.customers.details}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton> */}
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

NewtaskListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
