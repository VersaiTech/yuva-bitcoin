import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
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
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { paths } from "../../../paths";
import { wait } from "../../../utils/wait";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const CustomerEditForm = (props) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { ...other } = props;
  const formik = useFormik({
    initialValues: {
      // address1: customer.address1 || '',
      // address2: customer.address2 || '',
      // member_name: '', // Set empty string for all fields
      // email: '',
      // coins: '',
      // contactNo: '',
      // twitterId: '',
      // isActive: false,
      investment: "",
      stakingDuration: "",
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
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        // const valuesData = {
        //   isActive: values.isActive
        // }
        const response = await axios.post(
          `${BASEURL}/api/Staking/transferToStaking`,
          values,
          { headers: headers }
        );

        if (response.status === 200) {
          enqueueSnackbar("Stake Added successfully", { variant: "success" });
          console.log(response);
          router.push("/dashboard/stake");
        } else {
          enqueueSnackbar(response, { variant: "error" });
        }
      } catch (err) {
        enqueueSnackbar(err.response.data.error, { variant: "error" });
        console.log(err.response.data.error);
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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Add Stake" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.investment && formik.errors.investment)
                }
                fullWidth
                helperText={
                  formik.touched.investment && formik.errors.investment
                }
                label="Investment"
                name="investment"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.investment}
              />
            </Grid>
            <Grid xs={12} md={6}>
              {/* <InputLabel id="staking-duration-label">
                Staking Duration
              </InputLabel> */}

              <Select
                labelId="staking-duration-label"
                error={
                  !!(
                    formik.touched.stakingDuration &&
                    formik.errors.stakingDuration
                  )
                }
                fullWidth
                helperText={
                  formik.touched.stakingDuration &&
                  formik.errors.stakingDuration
                }
                label="Staking Duration"
                name="stakingDuration"
                // placeholder="Staking Duration"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.stakingDuration}
              >
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
            </Grid>
            {/* <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                error={!!(formik.touched.coins && formik.errors.coins)}
                fullWidth
                helperText={formik.touched.coins && formik.errors.coins}
                label="Withdraw Amount"
                name="with_amt"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.coins}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                disabled
                error={!!(formik.touched.twitterId && formik.errors.twitterId)}
                fullWidth
                helperText={formik.touched.twitterId && formik.errors.twitterId}
                label="Withdraw Date"
                name="with_date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.twitterId}
              />
            </Grid>
            <Grid
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
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <Select
                fullWidth
                label="isActive"
                placeholder='isActive'
                name="isActive"
                value={formik.values.isActive}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.isActive && formik.errors.isActive}
                error={!!(formik.touched.isActive && formik.errors.isActive)}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Block</MenuItem>
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
            xs: "column",
            sm: "row",
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
            Add
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.stake.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
};
