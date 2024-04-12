import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../../../components/severity-pill";

const statusMap = {
  confirmed: "success",
  pending: "info",
  canceled: "warning",
  rejected: "error",
  EXPIRED: "error",
};

export const TaskListTable = (props) => {
  const {
    onOrderSelect,
    onPageChange,
    onRowsPerPageChange,
    orders,
    ordersCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdowns();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateCountdowns = () => {
    const updatedCountdowns = orders.map((order) => {
      const completionTime = new Date(order.completionTime);
      const currentTime = new Date();
      let timeDifference = completionTime - currentTime;

      if (timeDifference <= 0) {
        return "Task Completed";
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        timeDifference -= days * (1000 * 60 * 60 * 24); // Remove days from time difference
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        timeDifference -= hours * (1000 * 60 * 60); // Remove hours from time difference
        const minutes = Math.floor(timeDifference / (1000 * 60));
        timeDifference -= minutes * (1000 * 60); // Remove minutes from time difference
        const seconds = Math.floor(timeDifference / 1000);

        if (days > 0) {
          return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        } else if (hours > 0) {
          return `${hours} hours ${minutes} minutes ${seconds} seconds`;
        } else {
          return `${minutes} minutes ${seconds} seconds`;
        }
      }
    });
    setCountdowns(updatedCountdowns);
  };

  return (
    <div {...other}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reject Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => {
            const createdAtMonth = order.createdAt
              ? format(new Date(order.createdAt), "LLL").toUpperCase()
              : "";
            const createdAtDay = order.createdAt
              ? format(new Date(order.createdAt), "d")
              : "";

            return (
              <TableRow
                hover
                key={order.id}
                onClick={() => onOrderSelect?.(order)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "neutral.800"
                            : "neutral.200",
                        borderRadius: 2,
                        maxWidth: "fit-content",
                        p: 1,
                      }}
                    >
                      <Typography align="center" variant="subtitle2">
                        {createdAtMonth}
                      </Typography>
                      <Typography align="center" variant="h6">
                        {createdAtDay}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">
                        {order.taskName}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Reward <b>{order.coins} </b> Coins
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <SeverityPill color={statusMap[order.status] || "warning"}>
                    {order.status}
                  </SeverityPill>
                </TableCell>
                <TableCell>{order.rejectReason}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TaskListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
