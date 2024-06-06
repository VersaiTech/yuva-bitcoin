
// **************************************
import { Box, Button, Container, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { usePageView } from '../../../hooks/use-page-view';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

const Page = () => {
  usePageView();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    setCoinValueMarketUsdt: Yup.number().nullable(),
    setCoinValueMarketYUVA: Yup.number().nullable(),
    setMinimumAmountMarketUsdt: Yup.number().nullable(),
    setMinimumAmountMarketYUVA: Yup.number().nullable(),
    setMinimumWithdrawal: Yup.number().nullable(),
    setMaximumWithdrawal: Yup.number().nullable(),
    setStakePercent1: Yup.number().nullable(),
    setStakePercent2: Yup.number().nullable(),
    setStakePercent3: Yup.number().nullable(),
    setRegisterCoinValue: Yup.number().nullable(),
    setReferralCoinValue: Yup.number().nullable(),
    setStakeMonth1: Yup.number().nullable(),
    setStakeMonth2: Yup.number().nullable(),
    setStakeMonth3: Yup.number().nullable(),
  });

  const [initialValues, setInitialValues] = useState({
    setCoinValueMarketUsdt: '',
    setCoinValueMarketYUVA: '',
    setMinimumAmountMarketUsdt: '',
    setMinimumAmountMarketYUVA: '',
    setMinimumWithdrawal: '',
    setMaximumWithdrawal: '',
    setStakePercent1:'',
    setStakePercent2:'',
    setStakePercent3:'',
    setRegisterCoinValue: '',
    setReferralCoinValue: '',
    setStakeMonth1:'',
    setStakeMonth2:'',
    setStakeMonth3:'',
  });

  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState('');

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
              setCoinValueMarketUsdt: data.data.setCoinValueMarketUsdt.toString(),
              setCoinValueMarketYUVA: data.data.setCoinValueMarketYUVA.toString(),
              setMinimumAmountMarketUsdt: data.data.setMinimumAmountMarketUsdt.toString(),
              setMinimumAmountMarketYUVA: data.data.setMinimumAmountMarketYUVA.toString(),
              setMinimumWithdrawal: data.data.setMinimumWithdrawal.toString(),
              setMaximumWithdrawal: data.data.setMaximumWithdrawal.toString(),
              setStakeMonth1: data.data.setStakeMonth1.toString(),
              setStakeMonth2: data.data.setStakeMonth2.toString(),
              setStakeMonth3: data.data.setStakeMonth3.toString(),
              setStakePercent3: data.data.setStakePercent3.toString(),
              setStakePercent2: data.data.setStakePercent2.toString(),
              setStakePercent1: data.data.setStakePercent1.toString(),
              setRegisterCoinValue: data.data.setRegisterCoinValue.toString(),
              setReferralCoinValue: data.data.setReferralCoinValue.toString()
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
      const admin_user_id = localStorage.getItem('admin_user_id');
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      // Filter the values based on the section
      let filteredValues = {};
      switch (section) {
        case 'marketUsdt':
          filteredValues = {
            setCoinValueMarketUsdt: values.setCoinValueMarketUsdt,
            setMinimumAmountMarketUsdt: values.setMinimumAmountMarketUsdt
          };
          break;
        case 'marketYUVA':
          filteredValues = {
            setCoinValueMarketYUVA: values.setCoinValueMarketYUVA,
            setMinimumAmountMarketYUVA: values.setMinimumAmountMarketYUVA
          };
          break;
        case 'withdrawal':
          filteredValues = {
            setMinimumWithdrawal: values.setMinimumWithdrawal,
            setMaximumWithdrawal: values.setMaximumWithdrawal
          };
          break;
        case 'registerCoin':
          filteredValues = {
            setRegisterCoinValue: values.setRegisterCoinValue
          };
          break;
        case 'referralCoin':
          filteredValues = {
            setReferralCoinValue: values.setReferralCoinValue
          };
          break;
        case 'stake1':
          filteredValues = {
            setStakePercent1: values.setStakePercent1,
            setStakeMonth1: values.setStakeMonth1
          };
          break;
        case 'stake2':
          filteredValues = {
            setStakePercent2: values.setStakePercent2,
            setStakeMonth2: values.setStakeMonth2
          };
          break;
        case 'stake3':
          filteredValues = {
            setStakePercent3: values.setStakePercent3,
            setStakeMonth3: values.setStakeMonth3
          };
          break;
        default:
          break;
      }

      // Add admin_user_id to filtered values
      filteredValues.admin_user_id = admin_user_id;

      console.log("Filtered Values Areee :",filteredValues);
      const response = await axios.post(`${BASEURL}/api/Permission/setValue`, filteredValues, {
        headers: headers,
      });

      if (response.status === 200) {
        console.log("Values Updated");
        enqueueSnackbar('Values Updated', { variant: 'success' });
      } else {
        console.error('Failed to update values:', response.statusText);
        enqueueSnackbar(response.data.error, { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating values:', error.message);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        const match = errorMessage.match(/field\(s\): (.+)/);
        const fields = match ? match[1] : 'unknown fields';
        enqueueSnackbar(`Not authorized to change this section`, { variant: 'error' });
        // enqueueSnackbar(`Not authorized to change ${fields}`, { variant: 'error' });
      
      } else {
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
      }
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, submitForm }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2}>
                  <Typography variant="h6" gutterBottom>
                    Market Place Coin Value (USDT)
                  </Typography>
                  <Field
                    name="setCoinValueMarketUsdt"
                    as={TextField}
                    label="Current Value"
                    fullWidth
                    margin="normal"
                    value={values.setCoinValueMarketUsdt}
                    onChange={handleChange}
                  />
                  <Field
                    name="setMinimumAmountMarketUsdt"
                    as={TextField}
                    label="Minimum Amount"
                    fullWidth
                    margin="normal"
                    value={values.setMinimumAmountMarketUsdt}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSection('marketUsdt');
                      submitForm();
                    }}
                  >
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
                    name="setCoinValueMarketYUVA"
                    as={TextField}
                    label="Current Value"
                    fullWidth
                    margin="normal"
                    value={values.setCoinValueMarketYUVA}
                    onChange={handleChange}
                  />
                  <Field
                    name="setMinimumAmountMarketYUVA"
                    as={TextField}
                    label="Minimum Amount"
                    fullWidth
                    margin="normal"
                    value={values.setMinimumAmountMarketYUVA}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSection('marketYUVA');
                      submitForm();
                    }}
                  >
                    Set Value
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
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
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ marginTop: "15px" }}
                          onClick={() => {
                            setSection('stake1');
                            submitForm();
                          }}
                        >
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
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ marginTop: "15px" }}
                          onClick={() => {
                            setSection('stake2');
                            submitForm();
                          }}
                        >
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
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ marginTop: "15px" }}
                          onClick={() => {
                            setSection('stake3');
                            submitForm();
                          }}
                        >
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
                    name="setMinimumWithdrawal"
                    as={TextField}
                    label="Minimum"
                    fullWidth
                    margin="normal"
                    value={values.setMinimumWithdrawal}
                    onChange={handleChange}
                  />
                  <Field
                    name="setMaximumWithdrawal"
                    as={TextField}
                    label="Max Value"
                    fullWidth
                    margin="normal"
                    value={values.setMaximumWithdrawal}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSection('withdrawal');
                      submitForm();
                    }}
                  >
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
                    name="setRegisterCoinValue"
                    as={TextField}
                    label="Current"
                    fullWidth
                    margin="normal"
                    value={values.setRegisterCoinValue}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSection('registerCoin');
                      submitForm();
                    }}
                  >
                    Set Now
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box border={1} borderColor="grey.300" borderRadius={2} p={2} sx={{ marginBottom: "30px" }}>
                  <Typography variant="h6" gutterBottom>
                    Referral Coin Value
                  </Typography>
                  <Field
                    name="setReferralCoinValue"
                    as={TextField}
                    label="Current"
                    fullWidth
                    margin="normal"
                    value={values.setReferralCoinValue}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSection('referralCoin');
                      submitForm();
                    }}
                  >
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
