import { useState } from "react";
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
// import DashboardLayout from '../layouts/DashboardLayout'; // Adjust the import according to your project structure
import { Layout as DashboardLayout } from "../../layouts/dashboard";

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
  admin_user_id: "admin123", // Replace with actual admin user ID as needed
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
  const { user } = useAuth();
  console.log(user.data.data);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setIsChanged(true);
  };

  const handleApplyChanges = async () => {
    try {
      const response = await axios.post("/api/update-permissions", state);
      console.log("Permissions updated successfully", response.data);
      setIsChanged(false);
    } catch (error) {
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
                Permisson Name
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center">
                Status
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="center">
                Permisson Name
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
