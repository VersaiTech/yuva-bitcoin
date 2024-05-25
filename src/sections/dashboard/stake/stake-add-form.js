import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Chip,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Unstable_Grid2 as Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmStake = () => {
    setOpen(false);
    formik.submitForm();
  };

  const formik = useFormik({
    initialValues: {
      investment: "",
      stakingDuration: "",
    },
    validationSchema: Yup.object({
      investment: Yup.string().required("Investment is required"),
      stakingDuration: Yup.string().required("Staking Duration is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

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
              <FormControl fullWidth>
                <InputLabel id="staking-duration-label">Staking Duration</InputLabel>
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
                  name="stakingDuration"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.stakingDuration}
                >
                  <MenuItem value="3">3 Month</MenuItem>
                  <MenuItem value="6">6 Month</MenuItem>
                  <MenuItem value="12">12 Month</MenuItem>
                </Select>
              </FormControl>
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
          <Button type="button" variant="contained" onClick={handleOpen}>
            Add Stake
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            href={paths.dashboard.stake.index}
            variant="outlined"
          >
            Cancel
          </Button>
          
        </Stack>
        <Alert severity="warning" sx={{ p: 3 }}>
          <Typography variant="body2">
            Warning: Please stake coins carefully. Once you stake coins, you cannot
            withdraw them until the staking duration ends.
          </Typography>
        </Alert>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Stake</DialogTitle>
        <DialogContent> 
          <DialogContentText style={{ color: "red" }}>
            Please stake coins carefully. Once you stake coins, you cannot
            withdraw them until the staking duration ends.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined" >
            Cancel
          </Button>
          <Button onClick={handleConfirmStake} color="primary" autoFocus variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
};
