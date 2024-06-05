

// ***********************************************************


import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { usePageView } from '../../../hooks/use-page-view';
import { useEffect, useState } from 'react';
import axios from "axios";

const Page = () => {
  usePageView();

  const [initialValues, setInitialValues] = useState({
    marketPlaceCurrentValueUSDT: '',
    marketPlaceCurrentValueYUVA: '',
    marketPlaceMinimumAmountUSDT: '',
    marketPlaceMinimumAmountYUVA: '',
    withdrawalMinimum: '',
    withdrawalMaxValue: '1000',
    setStakePercent1:'',
    setStakePercent2:'',
    setStakePercent3:'',
    registerCoinValue: '',
    referralCoinValue: '',
    setStakeMonth1:'',
    setStakeMonth2:'',
    setStakeMonth3:'',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };
    
        const response = await axios.get(`${BASEURL}/api/Permission/getSetValueLatest`, {
          headers: headers,
        });
    
        console.log('Response data:', response.data);
    
        if (response.status === 200) {
          const data = response.data;
          if (data.status === 'success') {
            console.log('Setting initial values:', data.data);
            setInitialValues({
              marketPlaceCurrentValueUSDT: data.data.setCoinValueMarketUsdt.toString(),
              marketPlaceCurrentValueYUVA: data.data.setCoinValueMarketYUVA.toString(),
              marketPlaceMinimumAmountUSDT: data.data.setMinimumAmountMarketUsdt.toString(),
              marketPlaceMinimumAmountYUVA: data.data.setMinimumAmountMarketYUVA.toString(),
              withdrawalMinimum: data.data.setMinimumWithdrawal.toString(),
              withdrawalMaxValue: '1000', // Assuming this value remains constant for now
              stakePercentage: data.data.setStakePercent1.toString(), // Assuming you want to use setStakePercent1
              setStakeMonth1: data.data.setStakeMonth1.toString(), // Assuming you want to use setStakeMonth1
              setStakeMonth2: data.data.setStakeMonth2.toString(), // Assuming you want to use setStakeMonth1
              setStakeMonth3: data.data.setStakeMonth3.toString(), // Assuming you want to use setStakeMonth1
              setStakePercent3:data.data.setStakePercent3.toString(),
              setStakePercent2:data.data.setStakePercent2.toString(),
              setStakePercent1:data.data.setStakePercent1.toString(),
              registerCoinValue: data.data.setRegisterCoinValue.toString(),
              referralCoinValue: data.data.setReferralCoinValue.toString()
            });
            setLoading(false);
          } else {
            console.error('Failed to fetch initial values:', data.message);
          }
        } else {
          console.error('Failed to fetch initial values:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching initial values:', error.message);
      }
    };
  
    fetchData();
  }, []);
  
 const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
    };

    const response = await axios.post(`${BASEURL}/api/Permission/setValue`, values, {
      headers: headers,
    });

    if (response.status === 200) {
      console.log("Values Updated");
    } else {
      console.error('Failed to update values:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating values:', error.message);
  }
  setSubmitting(false);
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Market Place Coin Value (USDT)
                  </Typography>
                  <Field
                    name="marketPlaceCurrentValue"
                    as={TextField}
                    label="Current Value"
                    fullWidth
                    margin="normal"
                    value={values.marketPlaceCurrentValueUSDT}
                    onChange={handleChange}
                  />
                  <Field
                    name="marketPlaceMinimumAmount"
                    as={TextField}
                    label="Minimum Amount"
                    fullWidth
                    margin="normal"
                    value={values.marketPlaceMinimumAmountUSDT}
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
                    Market Place Coin Value (YUVA BITCOIN)
                  </Typography>
                  <Field
                    name="marketPlaceCurrentValue"
                    as={TextField}
                    label="Current Value"
                    fullWidth
                    margin="normal"
                    value={values.marketPlaceCurrentValueYUVA}
                    onChange={handleChange}
                  />
                  <Field
                    name="marketPlaceMinimumAmount"
                    as={TextField}
                    label="Minimum Amount"
                    fullWidth
                    margin="normal"
                    value={values.marketPlaceMinimumAmountYUVA}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Set Value
                  </Button>
                </Box>
              </Grid>

              

              <Grid item xs={12} sm={12} lg={12}>
              <Box border={1} borderColor="grey.300" borderRadius={2} p={2} marginBottom={2}>
                <Typography variant="h6" gutterBottom>
                  Stake Percentage
                </Typography>
                <Grid container spacing={2}>
                  {/* First Column */}
                  <Grid item xs={12} sm={4} lg={4}>
                    <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                      <Typography variant="h6" gutterBottom>
                        Month 1
                      </Typography>
                      <InputLabel>% Value</InputLabel>
                      <TextField
                        name="setStakePercent1"
                        fullWidth
                        value={values.setStakePercent1}
                        onChange={handleChange}
                      />
                      <InputLabel>Month</InputLabel>
                      <TextField
                        name="setStakeMonth1"
                        fullWidth
                        value={values.setStakeMonth1}
                        onChange={handleChange}
                      />
                      {/* Set Value Button */}
                      <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:"15px"}}>
                        Set Value
                      </Button>
                    </Box>
                  </Grid>
          
                  {/* Second Column */}
                  <Grid item xs={12} sm={4} lg={4}>
                    <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                      <Typography variant="h6" gutterBottom>
                        Month 2
                      </Typography>
                      <InputLabel>% Value</InputLabel>
                      <TextField
                        name="setStakePercent2"
                        fullWidth
                        value={values.setStakePercent2}
                        onChange={handleChange}
                      />
                      <InputLabel>Month</InputLabel>
                      <TextField
                        name="setStakeMonth2"
                        fullWidth
                        value={values.setStakeMonth2}
                        onChange={handleChange}
                      />
                      {/* Set Value Button */}
                      <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:"15px"}}>
                        Set Value
                      </Button>
                    </Box>
                  </Grid>
          
                  {/* Third Column */}
                  <Grid item xs={12} sm={4} lg={4}>
                    <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                      <Typography variant="h6" gutterBottom>
                        Month 3
                      </Typography>
                      <InputLabel>% Value</InputLabel>
                      <TextField
                        name="setStakePercent3"
                        fullWidth
                        value={values.setStakePercent3}
                        onChange={handleChange}
                      />
                      <InputLabel>Month</InputLabel>
                      <TextField
                        name="setStakeMonth3"
                        fullWidth
                        value={values.setStakeMonth3}
                        onChange={handleChange}
                      />
                      {/* Set Value Button */}
                      <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:"15px"}}>
                        Set Value
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
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
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2} sx={{marginBottom:"30px"}}>
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