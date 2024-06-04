import { useState } from 'react';
import { Box, Button, Card, Divider, Stack, Typography, Switch, FormControlLabel, Grid, Paper } from '@mui/material';
import axios from 'axios';

const permissions = [
  'Set Coin Value Market Usdt',
  'setMinimumAmountMarketUsdt',
  'setCoinValueMarketYUVA',
  'setMinimumAmountMarketYUVA',
  'setMinimumWithdrawal',
  'setMaximumWithdrawal',
  'setRegisterCoinValue',
  'setReferralCoinValue',
  'setStakeMonth1',
  'setStakeMonth2',
  'setStakeMonth3',
  'setStakePercent1',
  'setStakePercent2',
  'setStakePercent3',
];

const initialState = {
  admin_user_id: 'admin123',  // Replace with actual admin user ID as needed
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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setIsChanged(true);
  };

  const handleApplyChanges = async () => {
    try {
      const BASEURL = process.env.PUBLIC_NEXT_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = {
         Authorization: token 
        };

      const response = await axios.post(`${BASEURL}/api/Permission/grantPermission`, state,{headers: headers});
      console.log('Permissions updated successfully', response.data);
      setIsChanged(false);
    } catch (error) {
      console.error('Error updating permissions', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', }}>
      <Card sx={{ width: 600, padding: 4 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          SET PERMISSION
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="center">PERMISSION NAME</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="center">STATUS</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          {permissions.map((permission) => (
            <Grid item xs={12} key={permission}>
              <Paper elevation={3} sx={{ padding: 2 }}>
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
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Button
            onClick={handleApplyChanges}
            variant="contained"
            sx={{ bgcolor: isChanged ? '#00ff00' : '#d5e8d4', color: isChanged ? 'black' : 'grey' }}
            disabled={!isChanged}
          >
            Apply Changes
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default PermissionSettingsPage;
