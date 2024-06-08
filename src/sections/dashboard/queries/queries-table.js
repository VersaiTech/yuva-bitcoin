import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Link,
  Box,
  TablePagination,
} from "@mui/material";
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

 
  // Function to handle delete operation
 

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
             
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Twitter ID</TableCell>
              <TableCell align="center">Query</TableCell>
              <TableCell align="center">Action</TableCell>
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
                
                <TableCell align="center">
                  {query.name.charAt(0).toUpperCase() + query.name.slice(1)}
                </TableCell>
                <TableCell align="center">{query.email}</TableCell>
                <TableCell align="center">
                  <Link href={`${query.twitterId}`} target="_blank" rel="noopener noreferrer">
                    {query.twitterId}
                  </Link>
                </TableCell>
                <TableCell
                  sx={{ width: "50%", fontWeight: "500" }}
                  align="center"
                >
                  {query.message}
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      component={NextLink}
                      href={{
                        pathname: `${paths.dashboard.support.edit}${query._id}/edit`,
                        query: {
                          query: encodeURIComponent(JSON.stringify(query)),
                        },
                      }}
                    >
                      <Edit02Icon />
                    </IconButton>
                    <IconButton onClick={handleDeleteDialogOpen}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
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
        rowsPerPageOptions={[10, 15, 20]}
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
