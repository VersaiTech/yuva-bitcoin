import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Stack,
  Box,
  Typography,
  SvgIcon,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export const TotalDeposits = (props) => {
  const { amount, coinType } = props;

  const coinDetails = {
    USDT: {
      title: "Total USDT Deposits",
      imageUrl: "/logo-usdt.svg",
    },
    YUVA: {
      title: "Total Yuva Bitcoin Deposits",
      imageUrl: "/yuvalogo2.png",
    },
  };

  const { title, imageUrl } = coinDetails[coinType] || coinDetails.USDT; // Default to USDT if coinType is not provided

  return (
    <Card>
      <CardHeader title={title} />

      <Stack
        display="flex"
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
          <Image
            src={imageUrl}
            alt={`Logo ${coinType}`}
            width={48}
            height={48}
            quality={100}
            priority
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

TotalDeposits.propTypes = {
  amount: PropTypes.number.isRequired,
  coinType: PropTypes.oneOf(['USDT', 'YUVA']).isRequired,
};

export default TotalDeposits;
