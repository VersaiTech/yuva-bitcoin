// import PropTypes from 'prop-types';
// import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
// import { Box, Button, Card, Chip, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
// import Link from 'next/link';
// import { paths } from '../../../paths';

// export const OverviewCoinHolders = (props) => {
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
//             src="/assets/logos/yuvalogo.png"
//             width={56}
//           />
//         </div>
//         <Box sx={{ flexGrow: 2 }}>
//           <Typography
//             color="text.secondary"
//             variant="body2"
//           >
//             Coin Holders 
//           </Typography>
//           <Typography
//             color="text.primary"
//             variant="h4"
//           >
//             {amount}
//           </Typography>
//         </Box>
//       </Stack>
//       </Card>
//   );
// };

// OverviewCoinHolders.propTypes = {
//   amount: PropTypes.number
// };



import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, Chip, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { paths } from '../../../paths';

export const OverviewCoinHolders = (props) => {
  const { amount = 0 } = props; // Default value of 0

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
            src="/assets/logos/yuvalogo.png"
            width={56}
            alt="Yuva Logo"
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Coin Holders 
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {amount}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

OverviewCoinHolders.propTypes = {
  amount: PropTypes.number
};

OverviewCoinHolders.defaultProps = {
  amount: 0
};
