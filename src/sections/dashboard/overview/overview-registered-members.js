// import PropTypes from 'prop-types';
// import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
// import { Box, Button, Card, Chip, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
// import Link from 'next/link';
// import { paths } from '../../../paths';

// export const OverviewRegisteredMembers = (props) => {
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
//             src="/assets/iconly/team.svg"
//             width={46}
//           />
//         </div>
//         <Box sx={{ flexGrow: 2 }}>
//           <Typography
//             color="text.secondary"
//             variant="body2"
//           >
//             Registered Members
//           </Typography>
//           <Typography
//             color="text.primary"
//             variant="h4"
//           >
//             {amount}
//           </Typography>
//         </Box>
//       </Stack>
//       <Divider />
//       </Card>
//   );
// };

// OverviewRegisteredMembers.propTypes = {
//   amount: PropTypes.number
// };



import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, Chip, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { paths } from '../../../paths';

export const OverviewRegisteredMembers = (props) => {
  const { amount = 0 } = props;  // Default value of 0

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
            src="/assets/iconly/team.svg"
            width={46}
            alt="Team Icon"
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Registered Members
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
    </Card>
  );
};

OverviewRegisteredMembers.propTypes = {
  amount: PropTypes.number
};

OverviewRegisteredMembers.defaultProps = {
  amount: 0
};
