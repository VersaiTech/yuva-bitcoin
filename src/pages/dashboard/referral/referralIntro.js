import React, { useEffect,useState } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSnackbar } from "notistack";




const ReferralIntro = ({minValues}) => {
  const { enqueueSnackbar } = useSnackbar();
  
  
  useEffect(() => {
    if (minValues.length > 0) {
      console.log("minValues populated:", minValues);
    }
  }, [minValues]);
 

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          How the Referral Program Works
        </Typography>
        <Typography variant="body1" paragraph>
          Share your unique referral code or link with your friends and earn rewards when they register & trade on our platform. Here’s how you can benefit:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Earn up to ${minValues.setReferralCoinValue} Yuva Bitcoins!.`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>a
            <ListItemText primary={`On Successful registration and ${minValues.setMinimumReferralamount} USDT deposition of your friends `} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Help your friends discover a reliable bitcoin trading platform." />
          </ListItem>
        </List>
        <Typography variant="body2" color="textSecondary">
          * Terms and conditions apply. Please refer to our referral program policy for more details.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReferralIntro;
