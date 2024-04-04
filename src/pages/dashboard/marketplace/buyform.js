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

const Buyform = ({ currentdata, open, handleCloseBuyForm, handleBuyOrder }) => {
  return (
    <Dialog open={open} onClose={handleCloseBuyForm}>
      <DialogTitle>Buy Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to Buy this order.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="coin"
          label="Coin"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseBuyForm} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleBuyOrder(currentdata)} color="primary">
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Buyform;
