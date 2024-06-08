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
// import Link from "next/link";


export const OverviewWalletUseTask = (props) => {
  const { amount, } = props;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
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
          <img src="/planning.png" width={46} />
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
        <Link href="/dashboard/overview/task">
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
        </Link>
      </CardActions>
    </Card>
  );
};

OverviewWalletUseTask.propTypes = {
  amount: PropTypes.number, // Change the prop type according to your data structure
  
};

export default OverviewWalletUseTask;
