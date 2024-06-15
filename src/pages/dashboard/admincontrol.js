import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
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
import SetCoin from "./setCoin";

const permissions = [
  "setCoinValueMarketUsdt",
  "setMinimumAmountMarketUsdt",
  "setCoinValueMarketYUVA",
  "setMinimumAmountMarketYUVA",
  "setMinimumWithdrawal",
  "setMaximumWithdrawal",
  "setMinimumWithdrawalusdt",
  "setMaximumWithdrawalusdt",
  "setRegisterCoinValue",
  "setReferralCoinValue",
  "setMinimumReferralamount",
  "setStakeMonth1",
  "setStakeMonth2",
  "setStakeMonth3",
  "setStakePercent1",
  "setStakePercent2",
  "setStakePercent3",
  "setCreateBlog",
  "setWithdrawalApprove",
  "setTaskApprove",
  "setTaskCreate",
  "setUserBlock",
  "setAllTaskApprove",
  "setMinimumReferralamount",
];

const permissionNames = {
  setCoinValueMarketUsdt: "Set USDT Market Coin Value",
  setMinimumAmountMarketUsdt: "Set Minimum Amount for USDT Market",
  setCoinValueMarketYUVA: "Set YUVA Market Coin Value",
  setMinimumAmountMarketYUVA: "Set Minimum Amount for YUVA Market",
  setMinimumWithdrawal: "Set Minimum Withdrawal Amount",
  setMaximumWithdrawal: "Set Maximum Withdrawal Amount",
  setMinimumWithdrawalusdt: "Set Minimum Withdrawal Amount for USDT",
  setMaximumWithdrawalusdt: "Set Maximum Withdrawal Amount for USDT",
  setRegisterCoinValue: "Set Coin Value for Registration",
  setReferralCoinValue: "Set Coin Value for Referral",
  setMinimumReferralamount: "Set Minimum Referral Amount",
  setStakeMonth1: "Set Stake for Month 1",
  setStakeMonth2: "Set Stake for Month 2",
  setStakeMonth3: "Set Stake for Month 3",
  setStakePercent1: "Set Stake Percentage for Month 1",
  setStakePercent2: "Set Stake Percentage for Month 2",
  setStakePercent3: "Set Stake Percentage for Month 3",
  setCreateBlog: "Set Create Blog",
  setWithdrawalApprove: "Set Withdrawal Approval",
  setTaskApprove: "Set Task Approval",
  setTaskCreate: "Set Task Creation",
  setUserBlock: "Set User Block",
  setAllTaskApprove: "Set All Task Approvals",
  setMinimumReferralamount: "Set Minimum Amount For Referral Reward",
};

const PermissionSettingsPage = () => {
  const initialState = permissions.reduce((acc, permission) => {
    acc[permission] = false; // Initialize each permission to false or another default value
    return acc;
  }, {});

  const [state, setState] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        const adminUserId = user.data.data.admin_user_id;
        const headers = { Authorization: token };

        const response = await axios.get(`${BASEURL}/api/Permission/getPermission`, { headers });

        if (response.status === 200) {
          const permissionsData = response.data.data.find(item => item.admin_user_id === adminUserId);
          const initialPermissions = permissions.reduce((acc, permission) => {
            acc[permission] = permissionsData[permission] || false;
            return acc;
          }, {});
          
          setState({
            admin_user_id: adminUserId,
            ...initialPermissions,
          });
        } else {
          enqueueSnackbar("Failed to fetch permissions", { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar("Error fetching permissions", { variant: "error" });
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
        setIsChanged(false);
      } else {
        enqueueSnackbar("Failed to update permissions", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to update permissions", { variant: "error" });
      console.error("Error updating permissions", error);
    }
  };

  const half = Math.ceil(permissions.length / 2);

  const getReadablePermissionName = (permission) => {
    return permissionNames[permission] || permission;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {user?.data?.data?.userType === "admin" ? (
        <Card sx={{ maxWidth: 800 }}>
          <Typography variant="h5" align="center" sx={{ marginY: 3 }}>
            Set Permission
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={2}>
                {permissions.slice(0, half).map((permission) => (
                  <Grid item key={permission}>
                    <Paper elevation={3} sx={{ padding: "10px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {getReadablePermissionName(permission)}
                        </Typography>
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
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={2}>
                {permissions.slice(half).map((permission) => (
                  <Grid item key={permission}>
                    <Paper elevation={3} sx={{ padding: "10px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {getReadablePermissionName(permission)}
                        </Typography>
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
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Button
              onClick={handleApplyChanges}
              variant="contained"
              sx={{
                bgcolor: isChanged ? "#00ff00" : "#d5e8d4",
                color: isChanged ? "black" : "grey",
                "&:hover": {
                  bgcolor: isChanged ? "#00cc00" : "#c5e5c4",
                },
              }}
              disabled={!isChanged}
            >
              APPLY CHANGES
            </Button>
          </Box>
          <Grid item xs={12}>
            <SetCoin />
          </Grid>
        </Card>
      ) : (
        <Typography variant="h5" align="center" sx={{ marginY: 3 }}>
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
