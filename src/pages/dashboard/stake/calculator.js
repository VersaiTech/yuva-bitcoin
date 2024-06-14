




import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Stack, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';

function calculateInterest(amount, months,minValues) {
  let interestRate;
  if (months === minValues.setStakeMonth1) {
    interestRate = minValues.setStakePercent1 / 100; // Convert percentage to decimal
  } else if (months === minValues.setStakeMonth2) {
    interestRate = minValues.setStakePercent2 / 100; // Convert percentage to decimal
  } else if (months === minValues.setStakeMonth3) {
    interestRate = minValues.setStakePercent3 / 100; // Convert percentage to decimal
  } else {
    return 'Invalid number of months';
  }
  const monthlyInterestRate = interestRate / 12;
  const totalInterest = amount * monthlyInterestRate * months;
  return totalInterest.toFixed(2); // return total interest rounded to 2 decimal places
}

const InterestCalculator = ({minValues}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [interest, setInterest] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleCalculate = () => {
    const principal = parseFloat(amount);
    const calculatedInterest = calculateInterest(principal, parseInt(months),minValues);
    const total = principal + parseFloat(calculatedInterest);
    
    setInterest(calculatedInterest);
    setTotalAmount(total.toFixed(2));
  };




  return (
    <Card>
      <CardHeader title="Interest Calculator" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Amount (in YB)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel style={{marginTop: '0.5rem'}}>Months</InputLabel>
            <Select
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              fullWidth
            >
              <MenuItem value={minValues.setStakeMonth1}>{minValues.setStakeMonth1}</MenuItem>
              <MenuItem value={minValues.setStakeMonth2}>{minValues.setStakeMonth2}</MenuItem>
              <MenuItem value={minValues.setStakeMonth3}>{minValues.setStakeMonth3}</MenuItem>
            </Select>
          </FormControl>
          <Divider />
          <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent="space-around" alignItems={isSmallScreen ? 'stretch' : 'center'} spacing={3}>
            <Typography variant="h6" gutterBottom>
              Principal + Interest: {totalAmount ? `${totalAmount} YB` : '0 YB'}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Interest: {interest ? `${interest} YB` : '0 YB'}
            </Typography>
            <Button variant="contained" onClick={handleCalculate}>
              Calculate
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InterestCalculator;
