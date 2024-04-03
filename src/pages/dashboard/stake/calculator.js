import { useState } from 'react';
import { Card, CardContent, CardHeader, Divider, Stack, Button, TextField, Typography, Select, MenuItem } from '@mui/material';

function calculateInterest(amount, months) {
  let interestRate;
  if (months === 3) {
    interestRate = 0.05; // 5% per annum
  } else if (months === 6) {
    interestRate = 0.07; // 7% per annum
  } else if (months === 12) {
    interestRate = 0.10; // 10% per annum
  } else {
    return 'Invalid number of months';
  }

  const monthlyInterestRate = interestRate / 12;
  const totalInterest = amount * monthlyInterestRate * months;
  return totalInterest.toFixed(2); // return total interest rounded to 2 decimal places
}

const InterestCalculator = () => {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [interest, setInterest] = useState('');

  const handleCalculate = () => {
    const totalInterest = calculateInterest(parseFloat(amount), parseInt(months));
    setInterest(totalInterest);
  };

  return (
    <Card>
      <CardHeader title="Interest Calculator" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Amount (in BTC)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <Select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            fullWidth
            label="Months"
          >
            <MenuItem value={3}>3 Months</MenuItem>
            <MenuItem value={6}>6 Months</MenuItem>
            <MenuItem value={12}>12 Months</MenuItem>
          </Select>
          <Divider />
          <Stack direction="row"  justifyContent="space-around" alignItems={"center"}>
          <Typography variant="h6" gutterBottom>
            Total Interest: {interest ? `${interest} BTC` : '0 BTC'}
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
