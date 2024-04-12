// import PropTypes from 'prop-types';
// import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
// import { Box, Button, Card, Chip, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
// import Link from 'next/link';
// import { paths } from '../../../paths';

// export const OverviewStakeCoins = (props) => {
//   const { amount } = props; 

//   return (
//     <Card>
//       <Stack
//         alignItems="center"
//         direction={{
//           xs: 'column',
//           sm: 'row'
//         }}
//         spacing={3}
//         sx={{
//           px: 4,
//           py: 3
//         }}
//       >
//         <div>
//           <img
//             src="/assets/logos/staking.png"
//             width={48}
//           />
//         </div>
//         <Box sx={{ flexGrow: 2 }}>
//           <Typography
//             color="text.secondary"
//             variant="body2"
//           >
//             Staked Coins
//           </Typography>
//           <Typography
//             color="text.primary"
//             variant="h4"
//           >
//             {amount.totalStakedCoins}
//           </Typography>
//         </Box>
//         </Stack>
//         <Divider />
//         <CardActions>
//           <Link href="/dashboard/users"> {/* Use Next.js Link component */}
//             <Button
//               color="inherit"
//               endIcon={(
//                 <SvgIcon>
//                   <ArrowRightIcon />
//                 </SvgIcon>
//               )}
//               size="small"
//             >
//               Set Staked Coins
//             </Button>
//           </Link>
//         </CardActions>
//       </Card>
//   );
// };

// OverviewStakeCoins.propTypes = {
//   amount: PropTypes.number
// };





// OverviewStakeCoins.jsx

import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from "notistack";
import axios from "axios";
import SetDummyData from './set-dummy-data';

export const OverviewStakeCoins = (props) => {
  const { amount, fetchDummyData } = props; // Receive the amount and fetchStakeData function as props
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
        // Fetch updated stakeholder data
        enqueueSnackbar("Data Set Successful", { variant: "success" });
        await fetchDummyData();
      } else {
        enqueueSnackbar(response, { variant: "error" });
      }
    } catch (error) {
      console.error("Error setting data:", error);
    }
  };

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
            src="/assets/logos/staking.png"
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Staked Coins
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {amount.totalStakedCoins}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          onClick={handleClick}
        >
          Set Staked Coins
        </Button>
      </CardActions>
      {openDataForm && (
        <SetDummyData
          handleDataSubmit={handleDataSubmit}
          onClose={() => setOpenDataForm(false)}
          label="totalStakedCoins"
        />
      )}
    </Card>
  );
};

OverviewStakeCoins.propTypes = {
  amount: PropTypes.object.isRequired, // Change the prop type according to your data structure
  fetchDummyData: PropTypes.func.isRequired, // Pass the fetchStakeData function as prop
};

export default OverviewStakeCoins;
