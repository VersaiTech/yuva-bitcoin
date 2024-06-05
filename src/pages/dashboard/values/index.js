// // pages/value.js
// import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';
// import { Layout as DashboardLayout } from '../../../layouts/dashboard';
// import { paths } from '../../../paths';
// import { usePageView } from '../../../hooks/use-page-view';


// const Page=()=> {
// usePageView();
//   return (
//     <Container maxWidth="md">
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6}>
//           <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
//             <Typography variant="h6" gutterBottom>
//               Market Place Coin Value
//             </Typography>
//             <TextField
//               label="Current Value"
//               defaultValue="0.1"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Minimum Amount"
//               defaultValue="100"
//               fullWidth
//               margin="normal"
//             />
//             <Button variant="contained" color="primary" fullWidth>
//               Set Value
//             </Button>
//           </Box>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
//             <Typography variant="h6" gutterBottom>
//               Withdrawal Value
//             </Typography>
//             <TextField
//               label="Minimum"
//               defaultValue="10"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Max Value"
//               defaultValue="1000"
//               fullWidth
//               margin="normal"
//             />
//             <Button variant="contained" color="primary" fullWidth>
//               Set Value
//             </Button>
//           </Box>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
//             <Typography variant="h6" gutterBottom>
//               Stake %
//             </Typography>
//             <InputLabel>% Value</InputLabel>
//             <Select fullWidth defaultValue="3.5">
//               <MenuItem value="3.5">3.5%</MenuItem>
//               <MenuItem value="4.5">4.5%</MenuItem>
//               <MenuItem value="6">6%</MenuItem>
//             </Select>
//             <InputLabel>Month</InputLabel>
//             <Select fullWidth defaultValue="3">
//               <MenuItem value="3">3</MenuItem>
//               <MenuItem value="6">6</MenuItem>
//               <MenuItem value="12">12</MenuItem>
//             </Select>
//             <Button variant="contained" color="primary" fullWidth>
//               Set Value
//             </Button>
//           </Box>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//         <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
//         <Typography variant="h6" gutterBottom>
//           Register Coin Value
//         </Typography>
//         <TextField
//           label="Current"
//           defaultValue="1"
//           fullWidth
//           margin="normal"
//         />
//         <Button variant="contained" color="primary" fullWidth>
//           Set Now
//         </Button>
//       </Box>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
//             <Typography variant="h6" gutterBottom>
//               Referral Coin Value
//             </Typography>
//             <TextField
//             label="Current"
//             defaultValue="5"
//             fullWidth
//             margin="normal"
//           />
//             <Button variant="contained" color="primary" fullWidth>
//               Set Now
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// Page.getLayout = (page) => (
//     <DashboardLayout>
//       {page}
//     </DashboardLayout>
//   );


// export default Page;




// pages/value.js
import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { usePageView } from '../../../hooks/use-page-view';

const Page = () => {
  usePageView();

  const initialValues = {
    marketPlaceCurrentValue: '0.1',
    marketPlaceMinimumAmount: '100',
    withdrawalMinimum: '10',
    withdrawalMaxValue: '1000',
    stakePercentage: '3.5',
    stakeMonth: '3',
    registerCoinValue: '1',
    referralCoinValue: '5'
  };

  const handleSubmit = (values) => {
    // Handle form submission, for example, call your API
    console.log(values);
  };

  return (
    <Container maxWidth="md">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Market Place Coin Value
                  </Typography>
                  <Field
                    name="marketPlaceCurrentValue"
                    as={TextField}
                    label="Current Value"
                    fullWidth
                    margin="normal"
                    value={values.marketPlaceCurrentValue}
                    onChange={handleChange}
                  />
                  <Field
                    name="marketPlaceMinimumAmount"
                    as={TextField}
                    label="Minimum Amount"
                    fullWidth
                    margin="normal"
                    value={values.marketPlaceMinimumAmount}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Set Value
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Withdrawal Value
                  </Typography>
                  <Field
                    name="withdrawalMinimum"
                    as={TextField}
                    label="Minimum"
                    fullWidth
                    margin="normal"
                    value={values.withdrawalMinimum}
                    onChange={handleChange}
                  />
                  <Field
                    name="withdrawalMaxValue"
                    as={TextField}
                    label="Max Value"
                    fullWidth
                    margin="normal"
                    value={values.withdrawalMaxValue}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Set Value
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Stake %
                  </Typography>
                  <InputLabel>% Value</InputLabel>
                  <Field
                    name="stakePercentage"
                    as={Select}
                    fullWidth
                    value={values.stakePercentage}
                    onChange={handleChange}
                  >
                    <MenuItem value="3.5">3.5%</MenuItem>
                    <MenuItem value="4.5">4.5%</MenuItem>
                    <MenuItem value="6">6%</MenuItem>
                  </Field>
                  <InputLabel>Month</InputLabel>
                  <Field
                    name="stakeMonth"
                    as={Select}
                    fullWidth
                    value={values.stakeMonth}
                    onChange={handleChange}
                  >
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Field>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Set Value
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Register Coin Value
                  </Typography>
                  <Field
                    name="registerCoinValue"
                    as={TextField}
                    label="Current"
                    fullWidth
                    margin="normal"
                    value={values.registerCoinValue}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Set Now
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Referral Coin Value
                  </Typography>
                  <Field
                    name="referralCoinValue"
                    as={TextField}
                    label="Current"
                    fullWidth
                    margin="normal"
                    value={values.referralCoinValue}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Set Now
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
