import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const TodayTask = (props) => {
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
            src="/assets/iconly/icon-glass-todayalltask.svg"
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="primary"
            variant="body2"
          >
           Today All Task
          </Typography>
          <Typography
            color="text.secondery"
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
          See all task
        </Button>
      </CardActions>
    </Card>
  );
};

TodayTask.propTypes = {
  amount: PropTypes.number.isRequired
};
