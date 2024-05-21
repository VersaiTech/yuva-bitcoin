

import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
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
import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import SetDummyData from "./set-dummy-data";

export const OverviewTotalYuvaBuy = (props) => {
  const { amount, fetchDummyData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
  };

  const handleDataSubmit = async (data) => {
    try {
      console.log("Entered Data --> ", data);

      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        `${BASEURL}/api/Dummy/createDummyData`,
        data,
        { headers }
      );
      console.log(response.data);

      if (response.status === 200) {
        enqueueSnackbar("Data Set Successful", { variant: "success" });
        await fetchDummyData();
      } else {
        // Display error message
        console.error(response);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // Add null check before accessing amount.totalBuyTodayYuva
  const totalBuyTodayYuva = amount ? amount.totalBuyTodayYuva : 0;

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
          <img src="/assets/iconly/buy.svg" width={56} />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography color="text.secondary" variant="body2" fontSize={11}>
            Today Yuva Bitcoin Buyer
          </Typography>
          <Typography color="text.primary" variant="h4">
            {totalBuyTodayYuva}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          onClick={handleClick}
        >
          Set Yuva Buy
        </Button>
      </CardActions>
      {openDataForm && (
        <SetDummyData
          handleDataSubmit={handleDataSubmit}
          onClose={() => setOpenDataForm(false)}
          label="totalBuyTodayYuva"
        />
      )}
    </Card>
  );
};

OverviewTotalYuvaBuy.propTypes = {
  amount: PropTypes.object, // Adjust the prop type accordingly
  fetchDummyData: PropTypes.func.isRequired,
};

export default OverviewTotalYuvaBuy;
