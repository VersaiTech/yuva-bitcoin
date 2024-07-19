import React from "react";
import { useState } from "react";
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
  const [currentdata2, setCurrentData] = useState(currentdata);
  // console.log(currentdata);

  const handleChange = (event) => {
    const value = event.target.value;
    setCurrentData({
      ...currentdata,
      amount: value,
    });

    console.log(currentdata2);
  };

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
          type="number"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button onClick={handleCloseBuyForm} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => handleBuyOrder(currentdata2)}
          color="primary"
          variant="contained"
        >
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Buyform;
