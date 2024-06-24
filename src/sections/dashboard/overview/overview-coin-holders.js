import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import SetDummyData from "./set-dummy-data";
import { useSnackbar } from "notistack";
import { useState } from "react";
import axios from "axios";
import Image from 'next/image';
import Link from "next/link";


export const OverviewCoinHolders = (props) => {
  const { amount, coinType } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
  };

 


  const totalCoinHolders = amount ? amount : 0;

  const coinDetails = {
    USDT: {
      label: "TODAY USDT DEPOSITS",
      imageUrl: "/logo-usdt.svg",
    },
    YUVA: {
      label: "TODAY YUVA DEPOSITS",
      imageUrl: "/yuvalogo2.png", // Replace with the correct path for YUVA logo
    },
  };

  const { label, imageUrl } = coinDetails[coinType] || coinDetails.USDT;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <Image
          src={imageUrl}
          alt={`Logo ${coinType}`}
            width={46}
            height={46}
            quality={100}
            priority
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography color="text.secondary" variant="body2">
          {label}
          </Typography>
          <Typography color="text.primary" variant="h4">
            {totalCoinHolders}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        {/* <Link  color="primary" textDecoration="none" size="small" href="/dashboard/coin-holders"> */}
        <Link href="/dashboard/deposit">
        <Button
          color="inherit"
          size="small"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={handleClick}
        >
          Today Buyer
        </Button>
        </Link>
      </CardActions>
      {/* {openDataForm && (
        <SetDummyData
          handleDataSubmit={handleDataSubmit}
          onClose={() => setOpenDataForm(false)}
          label="totalCoinHolders"
        />
      )} */}
    </Card>
  );
};

OverviewCoinHolders.propTypes = {
  amount: PropTypes.number, // Adjust the prop type accordingly
  coinType: PropTypes.oneOf(["USDT", "YUVA"]),
};

export default OverviewCoinHolders;
