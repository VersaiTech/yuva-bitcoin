import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

const SetDummyData = ({ handleDataSubmit, onClose, label }) => {
  const [dataValue, setDataValue] = useState("");

  // Mapping object for label to corresponding names
  const labelNames = {
    totalRegisteredMembers: "Registered Members",
    totalCoinHolders: "Coin Holders",
    totalStakedCoins: "Staked Coins",
    totalBuyTodayYuva: "Total Yuva Bought",
  };

  // Get the corresponding name for the label
  const nameLabel = labelNames[label] || "Unknown";

  const handleSubmit = () => {
    const data = {
      [label]: dataValue,
    };
    handleDataSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    setDataValue("");
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Enter {nameLabel}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="dataValue"
          label={nameLabel}
          type="text"
          fullWidth
          value={dataValue}
          onChange={(e) => setDataValue(e.target.value)}
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

SetDummyData.propTypes = {
  handleDataSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired, // Assuming label is a string
};

export default SetDummyData;
