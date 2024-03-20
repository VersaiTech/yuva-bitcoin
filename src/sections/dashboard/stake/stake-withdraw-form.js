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

export const CustomerWithdrawForm = (props) => {
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
      amount: "",
      // stakingDuration: "",
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
          `${BASEURL}/api/Staking/transferToWallet`,
          values,
          { headers: headers }
        );

        if (response.status === 200) {
          enqueueSnackbar("Stake Withdraw successfully", { variant: "success" });
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
        <CardHeader title="Withdraw Stake Amount" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.amount && formik.errors.amount)
                }
                fullWidth
                helperText={
                  formik.touched.amount && formik.errors.amount
                }
                label="amount"
                name="amount"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.amount}
              />
            </Grid>
          </Grid>
        
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
            Withdraw
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

CustomerWithdrawForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
};
