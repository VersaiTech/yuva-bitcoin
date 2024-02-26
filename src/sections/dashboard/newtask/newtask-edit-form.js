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
  Switch,
  TextField,
  Typography,
  MenuItem,
  Select,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { paths } from '../../../paths';
import { wait } from '../../../utils/wait';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;



export const NewTaskEditForm = (props) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      // address1: customer.address1 || '',
      // address2: customer.address2 || '',
      taskId: customer.taskId || '',
      // email: customer.email || '',
      description: customer.description || '',
      coins: customer.coins || '',
      // hasDiscount: customer.hasDiscount || false,
      // isVerified: customer.isVerified || false,
      taskName: customer.taskName || '',
      // contactNo: customer.contactNo || '',
      link: customer.link || '',
      submit: null,
      // status: customer.status,
    },
    validationSchema: Yup.object({
      // address1: Yup.string().max(255),
      // address2: Yup.string().max(255),
      // country: Yup.string().max(255),
      // email: Yup
      //   .string()
      //   .email('Must be a valid email')
      //   .max(255)
      //   .required('Email is required'),
      // hasDiscount: Yup.bool(),
      // isVerified: Yup.bool(),
      // name: Yup
      //   .string()
      //   .max(255)
      //   .required('Name is required'),
      // phone: Yup.string().max(15),
      // twitterId: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try{
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const headers = {
          'Authorization': token
        }

        console.log('Form values:', values);
        const response = await axios.post(`${BASEURL}/admin/editTask/${customer.taskId}`, values, { headers: headers })

        
        if (response.status === 200) {
          console.log(response.data);
          enqueueSnackbar('Withrdrawal updated successfully', { variant: 'success' });
          router.push(paths.dashboard.newtask.index); 
        }
        else{
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      }
      catch(err){
        enqueueSnackbar(err, { variant: 'error' });
        console.log(err);
      }

      // try {
      //   // NOTE: Make API request
      //   await wait(500);
      //   helpers.setStatus({ success: true });
      //   helpers.setSubmitting(false);
      //   toast.success('Customer updated');
      // } catch (err) {
      //   console.error(err);
      //   toast.error('Something went wrong!');
      //   helpers.setStatus({ success: false });
      //   helpers.setErrors({ submit: err.message });
      //   helpers.setSubmitting(false);
      // }
    }
  });


  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Edit Customer" />
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
                error={!!(formik.touched.taskName && formik.errors.taskName)}
                fullWidth
                helperText={formik.touched.taskName && formik.errors.taskName}
                label="Task Name"
                name="taskName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.taskName}
              />
            </Grid>
            {/* <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid> */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.taskId && formik.errors.taskId)}
                fullWidth
                helperText={formik.touched.taskId && formik.errors.taskId}
                label="Task Id"
                name="taskId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.taskId}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.link && formik.errors.link)}
                fullWidth
                helperText={formik.touched.link && formik.errors.link}
                label="Link"
                name="link"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.link}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.coins && formik.errors.coins)}
                fullWidth
                helperText={formik.touched.coins && formik.errors.coins}
                label="Coins"
                name="coins"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.coins}
              />
            </Grid>
            {/* <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                error={!!(formik.touched.contactNo && formik.errors.contactNo)}
                fullWidth
                helperText={formik.touched.contactNo && formik.errors.contactNo}
                label="Phone number"
                name="contactNo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.contactNo}
              />
            </Grid> */}
            {/* <Grid
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
                helperText={formik.touched.status && formik.errors.status}
                error={!!(formik.touched.status && formik.errors.status)}
              >
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </Grid> */}

            {/*  <Grid
              xs={12}
              md={6}
            >
             <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Address 1"
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label="Address 2"
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
            </Grid> */}
          </Grid>
          {/* <Stack
            divider={<Divider />}
            spacing={3}
            sx={{ mt: 3 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                >
                  Make Contact Info Public
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Means that anyone viewing your profile will be able to see your contacts
                  details
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isVerified}
                color="primary"
                edge="start"
                name="isVerified"
                onChange={formik.handleChange}
                value={formik.values.isVerified}
              />
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                >
                  Available to hire
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Toggling this will let your teammates know that you are available for
                  acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.hasDiscount}
                color="primary"
                edge="start"
                name="hasDiscount"
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
              />
            </Stack>
          </Stack> */}
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
            // disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.newtask.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

NewTaskEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired
};
