

import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  Chip,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { paths } from "../../../paths";
import SetDummyData from "./set-dummy-data";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const OverviewRegisteredMembers = (props) => {
  const { amount} = props;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
  };

  console.log(amount)

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
        // Trigger hard refresh after displaying the snackbar
        await fetchDummyData();
      } else {
        enqueueSnackbar(response, { variant: "error" });
      }
    } catch (error) {
      // console.error("Error placing order:", error);
    }
  };

  // Check if amount is null or undefined before accessing totalRegisteredMembers
  const totalRegisteredMembers = amount ? amount.totalRegisteredMembers : 0;

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
          <img src="/assets/iconly/team.svg" width={46} />
        </div>
        <Box sx={{ flexGrow: 2 }}>
          <Typography color="text.secondary" variant="body2">
            Registered Members
          </Typography>
          <Typography color="text.primary" variant="h4">
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        {/* Use Next.js Link component */}
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
          Set Registered Members
        </Button>
      </CardActions>
      {openDataForm && (
        <SetDummyData
          handleDataSubmit={handleDataSubmit}
          onClose={() => setOpenDataForm(false)}
          label="totalRegisteredMembers"
        />
      )}
    </Card>
  );
};

OverviewRegisteredMembers.propTypes = {
  amount: PropTypes.object, // Change the prop type according to your data structure
  fetchDummyData: PropTypes.func.isRequired,
};

export default OverviewRegisteredMembers;
