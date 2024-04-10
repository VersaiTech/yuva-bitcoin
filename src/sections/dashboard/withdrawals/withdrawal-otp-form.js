import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

const OtpForm = ({ handleOtpSubmit, onClose }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    const otpValue={
        otp,
    }
    handleOtpSubmit(otpValue); // Call handleOtpSubmit with the OTP value
    handleClose();
  };

  const handleClose = () => {
    setOtp(""); // Clear OTP input
    onClose(); // Close the dialog and reset the parent state
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Enter OTP</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="otp"
          label="OTP"
          type="text"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpForm;
