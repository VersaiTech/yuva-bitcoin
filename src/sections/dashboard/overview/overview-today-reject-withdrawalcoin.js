import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from "notistack";
import axios from "axios";
import SetDummyData from './set-dummy-data';
import Link from "next/link";
import { paths } from '../../../paths';


export const OverviewWithdrawRejectToday = (props) => {
  const { amount,  } = props; // Receive the amount and fetchDummyData function as props
  const [openDataForm, setOpenDataForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    setOpenDataForm(true);
  };



  const handleDataSubmit = async (data) => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: token };

      const response = await axios.post(`${BASEURL}/api/Dummy/createDummyData`, data, { headers });
      
      if (response.status === 200) {
        enqueueSnackbar("Data Set Successful", { variant: "success" });
        await fetchDummyData();
      } else {
        enqueueSnackbar(response, { variant: "error" });
      }
    } catch (error) {
      console.error("Error setting data:", error);
    }
  };

  const totalCoinHolders = amount ? amount : 0;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3
        }}
      >
        <div>
          <img
            src="/assets/reject.png"
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
             Request Reject
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {totalCoinHolders}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        {/* <Link href="/dashboard/withdrawal-reject" passHref> */}
        <Link href={paths.dashboard.withdrawal.pending}>

        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          // onClick={handleClick}
        >
           Withdrawal Reject 
        </Button>
        </Link>
      </CardActions>
      {openDataForm && (
        <SetDummyData
          handleDataSubmit={handleDataSubmit}
          onClose={() => setOpenDataForm(false)}
          label="totalCoinHolders"
        />
      )}
    </Card>
  );
};

OverviewWithdrawRejectToday.propTypes = {
  amount: PropTypes.number, // Adjust the prop type accordingly
  
};

export default OverviewWithdrawRejectToday;
