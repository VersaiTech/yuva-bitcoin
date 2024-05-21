
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
  Grid
} from '@mui/material';
import Tooltip from '../../../components/tooltip';
import ReferralIntro from './referralIntro';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const ReferralPage = () => {
  const [invitationCode, setInvitationCode] = useState('');
  const [invitationLink, setInvitationLink] = useState(`https://yuvabitcoin.com/auth/register/modern?code=`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink + invitationCode);
  };

  const handleSharePoster = () => {
    // Logic for sharing referral poster
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const headers = {
        Authorization: token
      }

      const response = await axios.get(`${BASEURL}/api/Dashboard`, {
        headers: headers
      })

      console.log(response.data.data)
      setInvitationCode(response.data.data.member_user_id)
    } catch (error) {
      console.log(error)
      return '';
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
        p: 3,
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h2">
                  Refer friends. Earn Crypto together.
                </Typography>
                <Typography variant="subtitle2">
                  Invite your friends to trade an Bitmax and share up to 30% of trading fee for referral reward
                </Typography>
              </Stack>
              <img
                src="/referral.png"
                alt="Referral"
                style={{ width: '100%' }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} spacing={2}>
          <Card spacing={2}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h4">
                  Referral Link & Code
                </Typography>
                <Typography variant="body1">
                  Invitation Code: {invitationCode}
                  <Button onClick={handleCopyLink}>Copy</Button>
                </Typography>
                <Typography variant="body1">
                  Invitation Link: {invitationLink + invitationCode}
                  <Button onClick={handleCopyLink}>Copy</Button>
                </Typography>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button variant="outlined" onClick={handleSharePoster}>Share Referral Poster</Button>
            </CardActions>
            </Card>
            </Grid>
            

            <Grid item xs={12}>
            <ReferralIntro/>
          </Grid>

            </Grid>
            </Box>
            
  );
};

export default ReferralPage;
