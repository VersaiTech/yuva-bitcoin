import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Select,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { paths } from '../../../paths';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const WithdrawalEditForm = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      with_amt: customer.with_amt || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      member_name: customer.member_name || '',
      contactNo: customer.contactNo || '',
      with_date: customer.with_date || '',
      submit: null,
      status: customer.status,
      processed_by: '',
      remarks: ''
    },
    validationSchema: Yup.object({
      // Add validation schema if necessary
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          'Authorization': token
        }
        
        const valuesData = {
          status: values.status,
          processed_by: values.processed_by,
          remarks: values.remarks
        }
        
        const response = await axios.post(`${BASEURL}/api/Withdraw/updateWithdrawalStatus/${customer.with_referrance}`, valuesData, { headers: headers })

        enqueueSnackbar('Withdrawal updated successfully', { variant: 'success' });
        console.log(response.data);

        window.location.href = paths.dashboard.withdrawal.index;
      }
      catch(err) {
        enqueueSnackbar(err.response.data.error, { variant: 'error' });
        console.log(err.response.data.error);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
      <Card>
        <CardHeader title="Edit Withdrawal" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                fullWidth
                label="Full name"
                name="member_name"
                value={formik.values.member_name}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                fullWidth
                label="Withdraw Amount"
                name="with_amt"
                value={formik.values.with_amt}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                fullWidth
                label="Withdraw Date"
                name="with_date"
                value={formik.values.with_date}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <Select
                fullWidth
                label="Status"
                placeholder='status'
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Processed By"
                name="processed_by"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.processed_by}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.remarks}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            href={paths.dashboard.withdrawal.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

WithdrawalEditForm.propTypes = {
  customer: PropTypes.object.isRequired
};
