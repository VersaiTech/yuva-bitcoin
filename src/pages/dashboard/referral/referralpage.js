import { useState } from 'react';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronUpIcon from '@untitled-ui/icons-react/build/esm/ChevronUp';
// import referralImage from './assets/referral.png';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  InputAdornment ,
  SomeIcon,
  IconButton,
  FileCopyIcon,
  // InputAdornment,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../../components/chart';

const chartSeries = [83];

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false
        },
        hollow: {
          size: '50%'
        },
        track: {
          background: theme.palette.background.default
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };
};

export const ReferralPage = () => {
  const chartOptions = useChartOptions();
  const [invitationCode, setInvitationCode] = useState(generateRandomCode());
  const [invitationLink, setInvitationLink] = useState(generateRandomLink());

  function generateRandomCode() {
    // Generate random code logic here
    return 'ABC123';
  }

  function generateRandomLink() {
    // Generate random link logic here
    return 'https://yourwebsite.com/referral/ABC123';
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(invitationCode);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink);
  };

  const handleSharePoster = () => {
    // Logic for sharing referral poster
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'neutral.100',
        p: 3,
        width: '100%',
        // borderRadius:'10'
      }}
    >
      <Grid
        container
        spacing={1}
      >
        <Grid
          xs={12}
          md={6}
          // paddingTop={}
        >
          <Card>
            <CardContent>
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                
                // paddingTop={'50%'}
                // paddingBottom={''}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="h2">
                      Refer friends. Earn Crypto together.
                    </Typography>
                    <Typography variant="subtitle2">
                      Invite your friends to trade an Bitmax and share up to 30% of trading fee for referral reward
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
           <img src="/referral.png"
alt="photo not showing"
           style={{width:'100%'}} />
 
            </CardContent>
            {/* <Divider /> */}
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
          marginTop={'10%'}
        >
          <Card>
            <CardContent>
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                // marginBottom={'50%'}
                
                
                
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      Referral Link & Code
                    </Typography>
                    <Stack spacing={1}>
                    <Typography variant="body1">
                      Invitation Code: {invitationCode}
                      <Button onClick={handleCopyLink}>Copy</Button>
                    </Typography>
                
                </Stack>
                    <Typography variant="body1">
                      Invitation Link: {invitationLink}
                      <Button onClick={handleCopyLink}>Copy</Button>
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions 
             sx={{
              justifyContent: 'center',
              
              // alignItems: 'center',
              // Center align the button horizontally
            }}
            >
              <Button variant="outlined"
onClick={handleSharePoster}>Share Referral Poster</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReferralPage;
