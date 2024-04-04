import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, TablePagination } from "@mui/material";
import PropTypes from "prop-types";
import { Scrollbar } from "../../../components/scrollbar";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import NextLink from "next/link";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import { paths } from "../../../paths";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const QueriesListTable = (props) => {
  const {
    queries,
    queriesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Selection hooks
  const [selected, setSelected] = useState([]);
  const isSelected = (queryId) => selected.indexOf(queryId) !== -1;

  // Function to handle selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = queries.map((query) => query.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, queryId) => {
    const selectedIndex = selected.indexOf(queryId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, queryId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Function to handle delete operation
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.delete(
        `${BASEURL}/api/Support/deleteSupportMessage/${selected.join(",")}`,
        { headers: headers }
      );

      if (response.status === 200) {
        enqueueSnackbar("Query deleted successfully", { variant: "success" });
        // You might want to refresh the queries list or handle it as required
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      console.error(err);
    }
  };

  // Handlers for delete dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirmed = () => {
    handleDelete();
    handleDeleteDialogClose();
  };

  return (
    <Box {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < queries.length}
                  checked={selected.length === queries.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all queries" }}
                />
              </TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Twitter ID</TableCell>
              <TableCell>Query</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries.map((query) => (
              <TableRow
                hover
                onClick={(event) => handleClick(event, query.id)}
                role="checkbox"
                aria-checked={isSelected(query.id)}
                tabIndex={-1}
                key={query.id}
                selected={isSelected(query.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(query.id)}
                    inputProps={{ "aria-labelledby": `query-${query.id}` }}
                  />
                </TableCell>
                <TableCell>{query.name}</TableCell>
                <TableCell>{query.email}</TableCell>
                <TableCell>{query.twitterId}</TableCell>
                <TableCell sx={{width: "50%", whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{query.message}</TableCell>
                <TableCell>
                <IconButton
                component={NextLink}
                href={{
                  pathname: `${paths.dashboard.support.edit}${query._id}/edit`,
                  query: { query: encodeURIComponent(JSON.stringify(query)) }
                }}
              >
                <Edit02Icon />
              </IconButton>
                  <IconButton onClick={handleDeleteDialogOpen}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={queriesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Query"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selected queries permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

QueriesListTable.propTypes = {
  queries: PropTypes.array.isRequired,
  queriesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
