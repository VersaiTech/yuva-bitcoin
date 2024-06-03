import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import TrendUp02Icon from '@untitled-ui/icons-react/build/esm/TrendUp02';
import TrendDown02Icon from '@untitled-ui/icons-react/build/esm/TrendDown02';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SvgIcon,
  Stack,
  Divider,
  Box,
  Typography
} from '@mui/material';

export const TotalMemberCoins = (props) => {
  const { amount } = props;

  return (
    <Card>
      <CardHeader title="Total Yuva Coin in Users Wallet" />

      <Stack
        display={'flex'}
        justifyContent="space-between"
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
            src="/assets/iconly/purse.png"
            alt="User Icon"
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>

          <Typography
            color="text.primary"
            variant="h4"
          >
            {amount}
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
        >
          See all
        </Button>
      </CardActions>
    </Card>
  );
};

TotalMemberCoins.propTypes = {
  transactions: PropTypes.array.isRequired
};
