// // ExportOptionsModal.js

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

// export const ExportOptionsModal = ({ open, onClose, onSubmit }) => {
//   const [selectedOption, setSelectedOption] = useState('all');

//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleSubmit = () => {
//     onSubmit(selectedOption);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Export Options</DialogTitle>
//       <DialogContent>
//         <FormControl component="fieldset">
//           <RadioGroup value={selectedOption} onChange={handleChange}>
//             <FormControlLabel value="all" control={<Radio />} label="All Data" />
//             <FormControlLabel value="dateRange" control={<Radio />} label="Data Within Date Range" />
//           </RadioGroup>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit}>Done</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// ExportOptionsModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

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
          <>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
              fullWidth
              sx={{ mt: 2 }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              fullWidth
              sx={{ mt: 2 }}
            />
          </>
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
