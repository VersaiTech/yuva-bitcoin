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
  Box,
  Typography
} from '@mui/material';

export const CryptoTransactions = (props) => {
  const { amount } = props;

  return (
    <Card>
      <CardHeader title="All Users Deposit" />
      
       <Stack
          display={'flex'}
          justifyContent="space-between" // Added this line to create space between the image icon and the amount

        // direction="row"
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        spacing={3}
        sx={{
          px:  4,
          py: 3

        }}
      >
        <div>
          <img
            src="/assets/iconly/icon-glass-deposit-coin.svg"
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

CryptoTransactions.propTypes = {
  transactions: PropTypes.array.isRequired
};
