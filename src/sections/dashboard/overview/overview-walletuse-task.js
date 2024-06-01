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
import DownloadIcon from '@mui/icons-material/Download';

export const OverviewWalletUseTask = (props) => {
  const { amount, fetchDummyData } = props;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
  };

  const handleExportToExcel = async () => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        `${BASEURL}/api/Dummy/exportToExcel`,
        {},
        { headers, responseType: 'blob' }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'registered_members.xlsx');
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

  console.log(amount);

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
            Give in Task
          </Typography>
          <Typography color="text.primary" variant="h4">
            {amount}
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
          See Task
        </Button>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <DownloadIcon />
            </SvgIcon>
          }
          size="small"
          onClick={handleExportToExcel}
        >
          Export to Excel
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewWalletUseTask.propTypes = {
  amount: PropTypes.object, // Change the prop type according to your data structure
  fetchDummyData: PropTypes.func.isRequired,
};

export default OverviewWalletUseTask;
