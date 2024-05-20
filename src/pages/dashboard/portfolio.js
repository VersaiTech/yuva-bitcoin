import Head from "next/head";
import { subDays, subHours, subMinutes } from "date-fns";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePageView } from "../../hooks/use-page-view";
import { useSettings } from "../../hooks/use-settings";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import { CryptoCards } from "../../sections/dashboard/crypto/crypto-cards";
import { CryptoOperation } from "../../sections/dashboard/crypto/crypto-operation";
import { CryptoWallet } from "../../sections/dashboard/crypto/crypto-wallet";
import { CryptoTransactions } from "../../sections/dashboard/crypto/crypto-transactions";
import { CryptoUpgrade } from "../../sections/dashboard/crypto/crypto-upgrade";
import { CryptoCurrentBalance } from "../../sections/dashboard/crypto/crypto-current-balance";
import { OverviewDoneTasks } from "../../sections/dashboard/overview/overview-done-tasks";
import { OverviewOpenTickets } from "../../sections/dashboard/overview/overview-open-tickets";
import { OverviewPendingIssues } from "../../sections/dashboard/overview/overview-pending-issues";
import { AllUsers } from "../../sections/dashboard/overview/overview-all-users";
import { ActiveUsers } from "../../sections/dashboard/overview/overview-active-users";
import { BlockUsers } from "../../sections/dashboard/overview/overview-block-users";
import { AllTask } from "../../sections/dashboard/overview/overview-all-tasks";
import { OverviewRegisteredMembers } from "../../sections/dashboard/overview/overview-registered-members";
import { OverviewTotalYuvaBuy } from "../../sections/dashboard/overview/overview-total-yuva-buy";
import { OverviewCoinHolders } from "../../sections/dashboard/overview/overview-coin-holders";
import { OverviewStakeCoins } from "../../sections/dashboard/overview/overview-stake-coins";
import { OverviewAllTasks } from "../../sections/dashboard/overview/overview-all-tasks";
// import { TodayTask } from "../../sections/dashboard/overview/overview-today-task";
import { TodayTask } from "../../sections/dashboard/overview/overview-today-tasks";
import { TodayCompletedTask } from "../../sections/dashboard/overview/overview-todaydone-tasks";

import { useEffect, useState } from "react";
import axios from "axios";
import { TotalMemberCoins } from "../../sections/dashboard/crypto/totalMemberCoins";
import { TotalStakesInvestment } from "../../sections/dashboard/crypto/totalStakesInvestment";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const now = new Date();

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();

  const [loading, setLoading] = useState(true); // State to track loading status
  const [dummy, setDummy] = useState([]);
  const [overview, setOverview] = useState([]);

  usePageView();

  const OverviewData = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
    };

    const response = await axios.get(`${BASEURL}/admin/getOverview`, {
      headers: headers,
    });

    // console.log(response.data.overview);
    setOverview(response.data.overview);
  };

  useEffect(() => {
    OverviewData();
  }, []);

  const fetchDummyData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "/auth/login/modern"; // Redirect to login if token is not available
        return;
      }
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(`${BASEURL}/api/Dummy/getDummyData`, {
        headers: headers,
      });

      setDummy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Yuva Bitcoin </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid
              container
              disableGutters
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h4">
                  Yuva Bitcoin Daily Insights
                </Typography>
              </Grid>

              <Grid item xs={6} md={3}>
                <OverviewRegisteredMembers
                  amount={dummy}
                  fetchDummyData={fetchDummyData}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <OverviewCoinHolders
                  amount={dummy}
                  fetchDummyData={fetchDummyData}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <OverviewStakeCoins
                  amount={dummy}
                  fetchDummyData={fetchDummyData}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <OverviewTotalYuvaBuy
                  amount={dummy}
                  fetchDummyData={fetchDummyData}
                />
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Overview</Typography>
                </div>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <AllUsers amount={overview.allMembers} />
            </Grid>
            <Grid xs={12} md={4}>
              <ActiveUsers amount={overview.activeMembers} />
            </Grid>
            <Grid xs={12} md={4}>
              <BlockUsers amount={overview.inactiveMembers} />
            </Grid>
            <Grid xs={12} md={4}>
              <AllTask amount={overview.allTasks} />
            </Grid>

            <Grid xs={12} md={4}>
              <OverviewDoneTasks amount={overview.completedTasks} />
            </Grid>

            <Grid xs={12} md={4}>
              <OverviewPendingIssues amount={overview.pendingTasks} />
            </Grid>
            <Grid xs={12} md={4}>
              <Stack>
                <CryptoTransactions amount={overview.totalDepositAmount} />
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              <Stack>
                <TotalMemberCoins amount={overview.totalMemberCoins} />
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              <Stack>
                <TotalStakesInvestment
                  amount={overview.totalStakesInvestment}
                />
              </Stack>
            </Grid>
            {/* <Grid xs={12} md={4}>
              <TodayTask amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <TodayCompletedTask amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewOpenTickets amount={5} />
            </Grid> */}

            <Grid xs={12} md={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <CryptoCurrentBalance
                  chartSeries={[16213.2, 9626.8, 10076.81]}
                  labels={["Bitcoin", "Ethereum", "Deposit"]}
                />
              </Stack>
            </Grid>
            {/* <Grid xs={12} md={4}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <CryptoOperation />
              </Stack>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
