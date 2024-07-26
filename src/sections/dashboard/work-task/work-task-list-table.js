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
import Joi from 'joi';
import { useSnackbar } from 'notistack';
import {useRouter} from 'next/router';

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
    currentTab,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(customers);

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

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

  const getTaskIdFromCustomers = () => {
    return customers.length > 0 ? customers[0].taskId : null;
  };

  const handleBulkAction = async (status, reason) => {
    const taskId = getTaskIdFromCustomers();
    if (!taskId) {
      console.error('No taskId found for the current tab');
      return;
    }
  
    // Map selected taskIds to userIds
    const selectedUserIds = customers
      .filter(customer => selected.includes(customer.taskId))
      .map(customer => customer.userId);
  
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };
  
      const payload = {
        taskId: taskId,
        userIds: selectedUserIds,
        status: status,
        reason: reason,
      };
  
      const schema = Joi.object({
        taskId: Joi.string().required(),
        userIds: Joi.array().items(Joi.string().required()).required(),
        status: Joi.string().valid('confirmed', 'rejected').required(),
        reason: Joi.string().required(),
      });
  
      const { error } = schema.validate(payload);
      if (error) {
        console.error('Validation error:', error.details[0].message);
        enqueueSnackbar(`Validation error: ${error.details[0].message}`, { variant: 'error' });
        return;
      }
      
      const response = await axios.post(`${BASEURL}/admin/confirmMultipleTaskCompletions`, payload, {
        headers: headers,
      });
  
      if (response.status === 200) {
        console.log(response.data);
        enqueueSnackbar(`Tasks ${status} successfully.`, { variant: 'success' });
        setConfirmDeleteDialogOpen(false);
        // router.push(paths.dashboard.taskwork.index);
        window.location.reload(); 
      } else {
        console.error("Error confirming/rejecting tasks:", response.data);
        // enqueueSnackbar(`Error: ${response.data.message}`, { variant: 'error' });
      }
    } catch (err) {
      console.error("Error confirming/rejecting tasks:", err);
      const errorMessage = err.response?.data?.message ;
      console.log(errorMessage);
      enqueueSnackbar(`Error: ${errorMessage}`, { variant: 'error' });
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
            variant="contained"
            color="success"
            onClick={() => handleBulkAction('confirmed', 'Task confirmed in bulk')}
          >
            Confirm Tasks
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleBulkAction('rejected', 'Task rejected in bulk')}
          >
            Reject Tasks
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
              const isSelected = selected.includes(customer.taskId);

              return (
                <TableRow hover key={index} selected={isSelected}>
                  <TableCell padding="checkbox">
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
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <div>
                        {customer.name}
                        <Typography color="text.secondary" variant="body2">
                          {"id:" + customer.userId}
                        </Typography>
                        <Typography component="a" href={`${customer.twitterId}`} color="text.secondary" variant="body2" target="_blank">
                          <Typography sx={{ color: 'green' }}>{ customer.twitterId}</Typography>
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
