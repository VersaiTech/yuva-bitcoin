import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link'; // Import Next.js Link

export const ActiveUsers = (props) => {
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
            src="/assets/iconly/icon-glass-activeuser.svg"
            alt='Active User Icon'
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Active Users
          </Typography>
          <Typography
            color="green"
            variant="h4"
          >
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Link href="/dashboard/users?status=hasAcceptedMarketing"> {/* Use Next.js Link component */}
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          See all active users
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

ActiveUsers.propTypes = {
  amount: PropTypes.number.isRequired
};

export default ActiveUsers;