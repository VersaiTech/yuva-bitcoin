import React, { useState, useEffect } from "react";
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
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [exchangeCurrency, setExchangeCurrency] = useState("");

  useEffect(() => {
    if (currentdata) {
      setCoin(currentdata.coin);
      setAmount(currentdata.amount);
      setExchangeCurrency(currentdata.exchange_currency);
    }
  }, [currentdata]);

  const handleSubmit = () => {
    const updatedData = {
      ...currentdata,
      coin,
      amount,
      exchange_currency: exchangeCurrency,
    };
    handleUpdateOrder(updatedData);
    handleCloseUpdateForm();
  };

  return (
    <Dialog open={open} onClose={handleCloseUpdateForm}>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <DialogContentText color="text.primary">
          Update Your Order
        </DialogContentText>
        <TextField
        disabled
          autoFocus
          margin="dense"
          id="coin"
          label="Coin"
          type="text"
          fullWidth
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
        />
        <TextField
          margin="dense"
          id="amount"
          label="Amount"
          type="text"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          margin="dense"
          id="exchange_currency"
          label="Exchange Currency / Coin Amount"
          type="text"
          fullWidth
          value={exchangeCurrency}
          onChange={(e) => setExchangeCurrency(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button onClick={handleCloseUpdateForm} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateForm;
