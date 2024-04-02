// OrderForm.js

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

const OrderForm = ({ open, handleClose, handlePlaceOrder }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to create a new order.
        </DialogContentText>
        {/* Form fields */}
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
          type="number"
          fullWidth
        />
        <TextField
          margin="dense"
          id="exchange_currency"
          label="Exchange Currency"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="payment_method"
          label="Payment Method"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePlaceOrder} color="primary">
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderForm;
