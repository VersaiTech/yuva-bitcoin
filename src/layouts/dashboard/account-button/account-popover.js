import { useCallback } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import CreditCard01Icon from '@untitled-ui/icons-react/build/esm/CreditCard01';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';
import {
  Box,
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography
} from '@mui/material';
import { useAuth } from '../../../hooks/use-auth';
import { paths } from '../../../paths';
import { Issuer } from '../../../utils/auth';

export const AccountPopover = (props) => {
  const { profile,anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const auth = useAuth();
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  // console.log(profile)

  const handleDeleteAccount = useCallback(async () => {
    try {
      onClose?.();
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      // Check if the user making the request is an admin
      if (!auth.isAdmin) {
        throw new Error('Permission denied. Only admin can delete a user.');
      }

      const { member_user_id } = profile;

      // const response = await axios.delete(`/api/deleteUser/${member_user_id}`);
      const response = await axios.delete(`${BASEURL}/admin/deleteUser/${member_user_id}`, {
        headers: headers,
      });


      if (response.status === 200) {
        toast.success('Account deleted successfully.');
        router.push(paths.index);
      } else {
        throw new Error('Failed to delete account.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete account. Please try again later.');
    }
  }, [auth.isAdmin, profile, router, onClose]);

  const handleLogout = useCallback(async () => {
    try {
      onClose?.();

      switch (auth.issuer) {
        case Issuer.Amplify: {
          await auth.signOut();
          break;
        }

        case Issuer.Auth0: {
          await auth.logout();
          break;
        }

        case Issuer.Firebase: {
          await auth.signOut();
          break;
        }

        case Issuer.JWT: {
          await auth.signOut();
          break;
        }

        default: {
          console.warn('Using an unknown Auth Issuer, did not log out');
        }
      }

      router.push(paths.index);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, [auth, router, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          {profile.member_name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {profile.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          component={NextLink}
          href={paths.dashboard.social.profile}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <User03Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Profile
              </Typography>
            )}
          />
        </ListItemButton>
        {/* <ListItemButton
          component={NextLink}
          href={paths.dashboard.deposits.depositsHistory}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <Settings04Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Settings
              </Typography>
            )}
          />
        </ListItemButton> */}
        <ListItemButton
          component={NextLink}
          href={paths.dashboard.deposits.depositsHistory}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <CreditCard01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Billing
              </Typography>
            )}
          />
        </ListItemButton>
      </Box>
      <Divider sx={{ my: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center'
        }}
      >
        <Button
          color="inherit"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
