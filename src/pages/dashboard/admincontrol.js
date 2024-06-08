import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../hooks/use-auth";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import { useSnackbar } from "notistack";

const permissions = [
  "USDT Market Value",
  "setMinimumAmountMarketUsdt",
  "setCoinValueMarketYUVA",
  "setMinimumAmountMarketYUVA",
  "setMinimumWithdrawal",
  "setMaximumWithdrawal",
  "setRegisterCoinValue",
  "setReferralCoinValue",
  "setStakeMonth1",
  "setStakeMonth2",
  "setStakeMonth3",
  "setStakePercent1",
  "setStakePercent2",
  "setStakePercent3",
];

const initialState = {
  admin_user_id: '8761087',  // Replace with actual admin user ID as needed
  setCoinValueMarketUsdt: false,
  setMinimumAmountMarketUsdt: false,
  setCoinValueMarketYUVA: false,
  setMinimumAmountMarketYUVA: false,
  setMinimumWithdrawal: false,
  setMaximumWithdrawal: false,
  setRegisterCoinValue: false,
  setReferralCoinValue: false,
  setStakeMonth1: false,
  setStakeMonth2: false,
  setStakeMonth3: false,
  setStakePercent1: false,
  setStakePercent2: false,
  setStakePercent3: false,
};

const PermissionSettingsPage = () => {
  const [state, setState] = useState(initialState);
  const [isChanged, setIsChanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: token };

        const response = await axios.get(`${BASEURL}/api/Permission/getSetValue`, { headers });
        console.log('Response from fetching permissions:', response);
        if (response.status === 200) {
          const permissionsData = response.data.data;
          // Assuming the API returns an array of permissions with their statuses
          const updatedState = { ...initialState, ...permissionsData };
          setState(updatedState);
        } else {
          enqueueSnackbar("Failed to fetch permissions", { variant: "error" });
        }
      }

     
      
      catch (error) {
        enqueueSnackbar("Failed to fetch permissions", { variant: "error" });
        console.error("Error fetching permissions", error);
      }
    };

    fetchPermissions();
  }, [enqueueSnackbar]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setIsChanged(true);
  };

  const handleApplyChanges = async () => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: token };

      const response = await axios.post(`${BASEURL}/api/Permission/grantPermission`, state, { headers });
      if (response.status === 201) {
        enqueueSnackbar("Permissions Set Successfully", { variant: "success" });
        console.log('Permissions updated successfully', response.data);
      } else {
        enqueueSnackbar("Failed to update permissions", { variant: "error" });
      }
      setIsChanged(false);
    } catch (error) {
      enqueueSnackbar("Failed to update permissions", { variant: "error" });
      console.error("Error updating permissions", error);
    }
  };

  const half = Math.ceil(permissions.length / 2);
  const leftPermissions = permissions.slice(0, half);
  const rightPermissions = permissions.slice(half);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {user?.data?.data?.userType === "admin" ? (
        <Card sx={{ width: 800, padding: 4 }}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Set Permission
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center">
                Permission Name
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center">
                Status
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center">
                Permission Name
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center">
                Status
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {leftPermissions.map((permission) => (
                <Paper
                  elevation={3}
                  sx={{ padding: 2, marginBottom: 2 }}
                  key={permission}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="body2">{permission}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={state[permission]}
                            onChange={handleChange}
                            name={permission}
                            color="primary"
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>
            <Grid item xs={6}>
              {rightPermissions.map((permission) => (
                <Paper
                  elevation={3}
                  sx={{ padding: 2, marginBottom: 2 }}
                  key={permission}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="body2">{permission}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={state[permission]}
                            onChange={handleChange}
                            name={permission}
                            color="primary"
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Button
              onClick={handleApplyChanges}
              variant="contained"
              sx={{
                bgcolor: isChanged ? "#00ff00" : "#d5e8d4",
                color: isChanged ? "black" : "grey",
              }}
              disabled={!isChanged}
            >
              APPLY CHANGES
            </Button>
          </Box>
        </Card>
      ) : (
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          You are not an admin
        </Typography>
      )}
    </Box>
  );
};

PermissionSettingsPage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default PermissionSettingsPage;
