import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Paper,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { PropertyList } from '../../../../components/property-list';
import { PropertyListItem } from '../../../../components/property-list-item';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Chip from '@mui/material/Chip';


const UserDrawer = ({ open, onClose, user, onEdit }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const align = lgUp ? 'horizontal' : 'vertical';

  const statusChip = user?.isActive ? (
    <Chip label="Active" color="success" />
  ) : (
    <Chip label="Blocked" color="error" />
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
    <Box sx={{ px: 3, py: 2 }}>
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
    >
      <Typography variant="h6">User Details</Typography>
    </Stack>
  </Box>
  <Divider />
  <Box sx={{ p: 3 }}>
    {user ? (
      <Paper elevation={2} sx={{ p: 2 }}>
      <PropertyList>
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Name"
        value={user.member_name.charAt(0).toUpperCase() + user.member_name.slice(1)}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="User Id "
        value={user.member_user_id}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Contact No"
        value={user.contactNo}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Email"
        value={user.email}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Registered Date"
        value={user.registration_date}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Wallet"
        value={user.wallet_address}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Coins"
        value={user.coins.toFixed(4)}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="User Type"
        value={user.userType}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Twitter"
        value={user.twitterId}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="State"
        value={statusChip}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Referral Code"
        value={user.referralCode}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Deposited USDT"
        value={user.deposit_usdt.toFixed(4)}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Deposited BTC"
        value={user.deposit_btc.toFixed(4)}
      />
      <PropertyListItem
        align={align}
        disableGutters
        divider
        label="Deposited ETHEREUM"
        value={user.deposit_ethereum.toFixed(4)}
      />
    </PropertyList>
      </Paper>
    ) : (
      <Typography variant="body1">No user selected</Typography>
    )}
  </Box>
    </Drawer>
  );
};

UserDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onEdit: PropTypes.func,
};

export default UserDrawer;



