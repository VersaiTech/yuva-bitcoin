// import { useState } from 'react';
// import { Card, CardContent, CardHeader, Divider, Stack, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// function calculateInterest(amount, months) {
//   let interestRate;
//   if (months === 3) {
//     interestRate = 0.05; // 5% per annum
//   } else if (months === 6) {
//     interestRate = 0.07; // 7% per annum
//   } else if (months === 12) {
//     interestRate = 0.10; // 10% per annum
//   } else {
//     return 'Invalid number of months';
//   }

//   const monthlyInterestRate = interestRate / 12;
//   const totalInterest = amount * monthlyInterestRate * months;
//   return totalInterest.toFixed(2); // return total interest rounded to 2 decimal places
// }
// const InterestCalculator = () => {
//   const [amount, setAmount] = useState('');
//   const [months, setMonths] = useState('');
//   const [totalAmount, setTotalAmount] = useState('');
//   const [interest, setInterest] = useState('');

//   const handleCalculate = () => {
//     const principal = parseFloat(amount);
//     const calculatedInterest = calculateInterest(principal, parseInt(months));
//     const total = principal + parseFloat(calculatedInterest);
    
//     setInterest(calculatedInterest);
//     setTotalAmount(total.toFixed(2));
//   };

//   return (
//     <Card>
//       <CardHeader title="Interest Calculator" />
//       <CardContent>
//         <Stack spacing={2}>
//           <TextField
//             label="Amount (in YB)"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             fullWidth
//           />
//           <FormControl fullWidth>
//             <InputLabel style={{marginTop: '0.5rem'}}>Months</InputLabel>
//             <Select
//               value={months}
//               onChange={(e) => setMonths(e.target.value)}
//               fullWidth
//             >
//               <MenuItem value={3}>3 Months</MenuItem>
//               <MenuItem value={6}>6 Months</MenuItem>
//               <MenuItem value={12}>12 Months</MenuItem>
//             </Select>
//           </FormControl>
//           <Divider />
//           <Stack direction="row" justifyContent="space-around" alignItems="center">
//             <Typography variant="h6" gutterBottom>
//               Principal + Interest: {totalAmount ? `${totalAmount} YB` : '0 YB'}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Interest: {interest ? `${interest} YB` : '0 YB'}
//             </Typography>
//             <Button variant="contained" onClick={handleCalculate}>
//               Calculate
//             </Button>
//           </Stack>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default InterestCalculator;




import { useState } from 'react';
import { Card, CardContent, CardHeader, Divider, Stack, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, useMediaQuery } from '@mui/material';

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
  const [totalAmount, setTotalAmount] = useState('');
  const [interest, setInterest] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleCalculate = () => {
    const principal = parseFloat(amount);
    const calculatedInterest = calculateInterest(principal, parseInt(months));
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
              <MenuItem value={3}>3 Months</MenuItem>
              <MenuItem value={6}>6 Months</MenuItem>
              <MenuItem value={12}>12 Months</MenuItem>
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
