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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import axios from "axios";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useSelectionModel = (customers) => {
  // console.log(customers);
  const customerIds = useMemo(() => {
    return customers.map((customer) => customer.taskId);
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

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

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

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      // Assuming your endpoint to delete tasks is DELETE /admin/deleteTasks
      for (const taskId of selected) {
        const response = await axios.delete(
          `${BASEURL}/admin/deleteTask/${taskId}`,
          {
            headers: headers,
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
        } else {
          // console.error("Error deleting task:", taskId, response.data);
        }
      }

      // Assuming you want to reload the data after deletion
      // Reload data or fetch the updated data
      // reloadData();
      // Close confirmation dialog
      setConfirmDeleteDialogOpen(false);
    } catch (err) {
      // console.error("Error deleting tasks:", err);
    }
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
          <Button
            color="inherit"
            size="small"
            onClick={() => setConfirmDeleteDialogOpen(true)}
          >
            Delete
          </Button>
          {/* <Button color="inherit" size="small">
            Edit
          </Button> */}
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
              <TableCell>Task Name</TableCell>
              <TableCell>Task Id</TableCell>
              <TableCell>Coins</TableCell>
              <TableCell> Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell align="right">Edit Task</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isSelected = selected.includes(customer.taskId);

              return (
                <TableRow hover key={customer.taskId + 1} selected={isSelected}>
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
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        src={customer.taskName}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(customer.taskName)}
                      </Avatar>
                      <div>
                        {/* <Link
                          color="inherit"
                          component={NextLink}
                          href={`${paths.dashboard.newtask.edit}${customer.taskId}/edit`}
                          variant="subtitle2"
                        > */}
                        {customer.taskName}
                        {/* </Link> */}
                        <Typography color="text.secondary" variant="body2">
                          {customer.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.taskId}</TableCell>
                  <TableCell>{customer.coins}</TableCell>
                  <TableCell>{customer.description}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <Link
                        href={customer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {customer.link.substring(0, 20)}{" "}
                        {/* Displaying only the first 20 characters */}
                        {customer.link.length > 20 && "..."}{" "}
                        {/* Adding ellipsis if link is longer than 20 characters */}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={NextLink}
                      href={`${paths.dashboard.newtask.edit}${customer.taskId}/edit`}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    {/* <IconButton
                      component={NextLink}
                      href={`${paths.dashboard.newtask.edit}${customer.taskId}/edit`}
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

      {/* Delete confirmation dialog */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete all selected tasks?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteConfirm(customers.taskId)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
