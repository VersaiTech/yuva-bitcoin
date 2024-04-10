import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, Chip, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { paths } from '../../../paths';

export const OverviewTotalYuvaBuy
 = (props) => {
  const { amount } = props; 

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
            src="/assets/iconly/buy.svg"
            width={56}
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Total Yuva Buy
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

OverviewTotalYuvaBuy
.propTypes = {
  amount: PropTypes.number
};
