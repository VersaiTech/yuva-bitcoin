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
        <DialogContentText color="text.primary">
        How many coin would you like to buy?
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
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }} >
        <Button onClick={handleCloseBuyForm} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => handleBuyOrder(currentdata)} color="primary" variant="contained">
          Place Order
        </Button>
      </DialogActions>
     
    </Dialog>
  );
};

export default Buyform;
