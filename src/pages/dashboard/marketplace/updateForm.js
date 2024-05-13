import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const UpdateForm = ({ currentdata, open, handleCloseUpdateForm, handleUpdateOrder }) => {
  return (
    <Dialog open={open} onClose={handleCloseUpdateForm}>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <DialogContentText color="text.primary">
        Update Your Order 
        </DialogContentText>
      
        <TextField
          autoFocus
          margin="dense"
          id="coin"
          label="Coin"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="amount"
          label="Amount"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }} >
        <Button onClick={handleCloseUpdateForm} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => handleUpdateOrder(currentdata)} color="primary" variant="contained">
          Update Order
        </Button>
      </DialogActions>
     
    </Dialog>
  );
};

export default UpdateForm;
