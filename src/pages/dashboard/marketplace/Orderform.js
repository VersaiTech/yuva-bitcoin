import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListItemIcon,
} from "@mui/material";

const OrderForm = ({ open, handleClose, handlePlaceOrder }) => {
  const [coin, setCoin] = useState(""); // State to hold the selected coin
  const [paymentMethod, setPaymentMethod] = useState(""); // State to hold the selected payment method
  const [amount, setAmount] = useState(""); // State to hold the amount
  const [exchangeCurrency, setExchangeCurrency] = useState(""); // State to hold the exchange currency

  const handleCoinChange = (event) => {
    setCoin(event.target.value);
    // Set payment method based on the selected coin
    if (event.target.value === "USDT") {
      setPaymentMethod("YUVA BITCOIN");
    } else if (event.target.value === "YUVA BITCOIN") {
      setPaymentMethod("USDT");
    }
  };

  // Function to handle when payment method changes (if you need it)
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Function to handle amount change
  const handleAmountChange = (event) => {
    const { value } = event.target;
    // Allow only positive numbers or empty string (no negative numbers)
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Function to handle exchange currency change
  const handleExchangeCurrencyChange = (event) => {
    const { value } = event.target;
    // Allow only positive numbers or empty string (no negative numbers)
    if (/^\d*\.?\d*$/.test(value)) {
      setExchangeCurrency(value);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to create a new order.
        </DialogContentText>
        {/* Select field for Coin */}
        <FormControl fullWidth>
          <InputLabel id="coin-label">Coin</InputLabel>
          <Select
            labelId="coin-label"
            id="coin"
            value={coin}
            onChange={handleCoinChange}
            fullWidth
          >
            <MenuItem value="USDT">
              <ListItemIcon>
                <img src="/assets/logos/logo-usdt.svg" alt="USDT" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              USDT
            </MenuItem>
            <MenuItem value="YUVA BITCOIN">
              <ListItemIcon>
                <img src="/yuvalogo2.png" alt="YUVA BITCOIN" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              YUVA BITCOIN
            </MenuItem>
          </Select>
        </FormControl>
        {/* Payment Method TextField */}
        <TextField
          margin="dense"
          id="payment_method"
          label="Payment Method"
          type="text"
          fullWidth
          value={paymentMethod} // Set the initial value based on the selected coin
          disabled // Disable the input field
        />
        {/* Amount TextField */}
        <TextField
          margin="dense"
          id="amount"
          label="Coin Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />
        {/* Exchange Currency TextField */}
        <TextField
          margin="dense"
          id="exchange_currency"
          label="Exchange Currency / Coin Amount"
          type="text"
          fullWidth
          value={exchangeCurrency}
          onChange={handleExchangeCurrencyChange}
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
