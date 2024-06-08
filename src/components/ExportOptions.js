

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Box, // Add Box component
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const ExportOptionsModal = ({ open, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = () => {
    onSubmit(selectedOption, startDate, endDate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Export Options</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={handleChange}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All Data"
            />
            <FormControlLabel
              value="dateRange"
              control={<Radio />}
              label="Data Within Date Range"
            />
          </RadioGroup>
        </FormControl>
        {selectedOption === "dateRange" && (
          <Box display="flex" flexDirection="column"> {/* Container for alignment */}
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              fullWidth
              renderInput={(params) => <TextField {...params} />}
              sx={{ mt: 2 }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              fullWidth
              renderInput={(params) => <TextField {...params} />}
              sx={{ mt: 2 }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

ExportOptionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
