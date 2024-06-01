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
  const { amount, fetchDummyData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
  };

  const handleExportToExcel = async () => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: token };

      const response = await axios.post(
        `${BASEURL}/api/Dummy/exportToExcel`,
        {},
        { headers, responseType: 'blob' }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'coin_holders.xlsx');
        document.body.appendChild(link);
        link.click();
        enqueueSnackbar("Excel file downloaded successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to download Excel file", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error downloading Excel file", { variant: "error" });
      console.error("Error downloading Excel file:", error);
    }
  };

  const handleDataSubmit = async (data) => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: token };

      const response = await axios.post(
        `${BASEURL}/api/Dummy/createDummyData`,
        data,
        { headers }
      );

      if (response.status === 200) {
        enqueueSnackbar("Data Set Successful", { variant: "success" });
        await fetchDummyData();
      } else {
        enqueueSnackbar(response, { variant: "error" });
      }
    } catch (error) {
      console.error("Error setting data:", error);
    }
  };

  const totalCoinHolders = amount ? amount : 0;

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
            src="/logo-usdt.svg"
            alt="Logo USDT"
            width={46}
            height={46}
            quality={100}
            priority
          />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography color="text.secondary" variant="body2">
            USDT BUYER
          </Typography>
          <Typography color="text.primary" variant="h4">
            {totalCoinHolders}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Link  color="primary" textDecoration="none" size="small" href="/dashboard/coin-holders">
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
        <Button
          color="inherit"
          size="small"
          endIcon={
            <SvgIcon>
              <DownloadIcon />
            </SvgIcon>
          }
          onClick={handleExportToExcel}
        >
          Export to Excel
        </Button>
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
  fetchDummyData: PropTypes.func.isRequired,
};

export default OverviewCoinHolders;
