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
import SetDummyData from "./set-dummy-data";
import { useSnackbar } from "notistack";
import { useState } from "react";
import axios from "axios";

export const OverviewCoinHolders = (props) => {
  const { amount, fetchDummyData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
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

  // Check if amount is null or undefined before accessing totalCoinHolders
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
          <img src="/assets/logos/yuvalogo.png" width={46} />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography color="text.secondary" variant="body2">
            Coin Holders
          </Typography>
          <Typography color="text.primary" variant="h4">
            {totalCoinHolders}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
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
          Set Coin Holders
        </Button>
      </CardActions>
      {openDataForm && (
        <SetDummyData
          handleDataSubmit={handleDataSubmit}
          onClose={() => setOpenDataForm(false)}
          label="totalCoinHolders"
        />
      )}
    </Card>
  );
};

OverviewCoinHolders.propTypes = {
  amount: PropTypes.number, // Adjust the prop type accordingly
};

export default OverviewCoinHolders;
