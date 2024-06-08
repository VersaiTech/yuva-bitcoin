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
  Divider,
  Stack,
  Box,
  Typography
} from '@mui/material';
import Link from 'next/link'; // Import Next.js Link


export const CryptoTransactions = (props) => {
  const { amount } = props;

  return (
    <Card>
      <CardHeader title="Total Users Deposit Usdt " />

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
            src="/assets/iconly/deposit.png"
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
      <Link href="/dashboard/deposit">
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
      </Link>
      </CardActions>
    </Card>
  );
};

CryptoTransactions.propTypes = {
  transactions: PropTypes.array
};
