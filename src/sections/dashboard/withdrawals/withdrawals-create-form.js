


import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import GenderSelector from "../../../pages/components/withdrawSelect";
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
  FormControlLabel,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { paths } from "../../../paths";
import { wait } from "../../../utils/wait";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import OtpForm from "./withdrawal-otp-form";
import { useState } from "react";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const WithdrawalsCreateForm = (props) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openOtpForm, setOpenOtpForm] = useState(false);

  const { ...other } = props;
  const formik = useFormik({
    initialValues: {
      amount: "",
      conversion_type: "usdt", // Default to USDT
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };
    
        // Include conversion_type in the payload
        const payload = {
          amount: values.amount,
          conversion_type: values.conversion_type,
        };
    
        const response = await axios.post(
          `${BASEURL}/api/Withdraw/Request`,
          payload, // Send payload instead of values
          { headers: headers }
        );
    
        console.log(response.data.data);
    
        if (response.status === 200) {
          enqueueSnackbar("Request sent successfully", { variant: "success" });
          console.log(response);
          setOpenOtpForm(true); // Open the OTP input form
        } else {
          enqueueSnackbar(response, { variant: "error" });
        }
      } catch (err) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        console.log(err.response.data.message);
      }
    },
  });

  const handleOtpSubmit = async (otpValue) => {
    try {
      console.log("Entered otp --> ", otpValue);
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(`${BASEURL}/api/Withdraw/verifyOTP`, otpValue, { headers });
      console.log(response.data);

      if (response.status === 200) {
        enqueueSnackbar("Withdraw Successful", { variant: "success" });
        router.push(paths.dashboard.withdraw.index);
      } else {
        enqueueSnackbar(response, { variant: "error" });
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} {...other}>
        <Card>
          <CardHeader title="Withdraw Request" />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.amount && formik.errors.amount)}
                  fullWidth
                  helperText={formik.touched.amount && formik.errors.amount}
                  label="Amount"
                  name="amount"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.amount}
                />
              </Grid>
              <Grid xs={12} md={6}>
              <FormControlLabel
              control={
                <Switch
                  checked={formik.values.conversion_type === "yuva"}
                  onChange={(event) =>
                    formik.setFieldValue("conversion_type", event.target.checked ? "yuva" : "usdt")
                  }
                />
              }
              label={formik.values.conversion_type === "yuva" ? "Yuva" : "USDT"}
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
              type="submit"
              variant="contained"
            >
              Withdraw
            </Button>
            <Button
              color="inherit"
              component={NextLink}
              disabled={formik.isSubmitting}
              href={paths.dashboard.withdraw.index}
            >
              Cancel
            </Button>
          </Stack>
        </Card>
      </form>
      {/* OTP input form */}
      {openOtpForm && (
        <OtpForm
          handleOtpSubmit={handleOtpSubmit}
          onClose={() => setOpenOtpForm(false)}
        />
      )}
    </>
  );
};

WithdrawalsCreateForm.propTypes = {
  customer: PropTypes.object.isRequired,
};

