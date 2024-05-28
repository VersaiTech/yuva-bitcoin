import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
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
import { SeverityPill } from "../../../components/severity-pill";

const statusMap = {
  complete: "success",
  pending: "info",
  canceled: "warning",
  rejected: "error",
};

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useSelectionModel = (customers) => {
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

export const WorkListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    currentTab, //import from task-list-table
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
          console.log(response.data);
        } else {
          console.error("Error deleting task:", taskId, response.data);
        }
      }

      // Assuming you want to reload the data after deletion
      // Reload data or fetch the updated data
      // reloadData();
      // Close confirmation dialog
      setConfirmDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting tasks:", err);
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
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Task Id</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              {currentTab !== 'completed' && currentTab !== 'rejected' && (
                <TableCell align="right">Edit Task</TableCell>
              )}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => {
              const isSelected = selected.includes(customer.userId);

              return (
                <TableRow hover key={index} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(customer.userId);
                        } else {
                          deselectOne(customer.userId);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <div>
                        {customer.name}
                        <Typography color="text.secondary" variant="body2">
                          {"id:" + customer.userId}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {"twitter id :" + customer.twitterId}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <div>
                        {customer.taskName}
                        <Typography color="text.secondary" variant="body2">
                          {"taskId:" + customer.taskId}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {"coin:" + customer.coins}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.description}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <Link
                        href={customer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {customer.link.substring(0, 20)}{" "}
                        {customer.link.length > 20 && "..."}
                      </Link>
                    </Typography>
                  </TableCell>
                  {currentTab !== 'completed' && currentTab !== 'rejected' && (
                    <TableCell align="right">
                      <IconButton
                        component={NextLink}
                        href={`${paths.dashboard.taskwork.edit}${customer.taskId}/edit?userId=${customer.userId}`}
                      >
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  )}
                  <TableCell>
                    <SeverityPill
                      color={statusMap[customer.status] || "warning"}
                    >
                      {customer.status}
                    </SeverityPill>
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
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

WorkListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
