
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePageView } from "../../hooks/use-page-view";
import { useSettings } from "../../hooks/use-settings";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import { OverviewDoneTasks } from "../../sections/dashboard/overview/overview-done-tasks";
import { OverviewOpenTickets } from "../../sections/dashboard/overview/overview-open-tickets";
import { OverviewPendingIssues } from "../../sections/dashboard/overview/overview-pending-issues";
import { OverviewEarnings } from "../../sections/dashboard/overview/overview-earnings";
import { CryptoCurrentBalance } from "../../sections/dashboard/crypto/crypto-current-balance";
import axios from "axios";
// import { OverviewRegisteredMembers } from "../../sections/dashboard/overview/overview-registered-members";
// import { OverviewTotalYuvaBuy } from "../../sections/dashboard/overview/overview-total-yuva-buy";
// import { OverviewCoinHolders } from "../../sections/dashboard/overview/overview-coin-holders";
// import { OverviewStakeCoins } from "../../sections/dashboard/overview/overview-stake-coins";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();
  const [overview, setOverview] = useState({});
  // const [dummy, setDummy] = useState({});
  const [loading, setLoading] = useState(true);

  usePageView();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          window.location.href = "/auth/login/modern";
          return;
        }
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(`${BASEURL}/admin/getUserOverview`, {
          headers: headers,
        });

        setOverview(response.data.overview || {});
        const deposit_usdt = response.deposit_usdt;
    // Store deposit_usdt in local storage
    localStorage.setItem('deposit_usdt', deposit_usdt);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 {/* useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          window.location.href = "/auth/login/modern";
          return;
        }
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(`${BASEURL}/api/Dummy/getDummyDataForAll`, {
          headers: headers,
        });

        setDummy(response.data || {});
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDummyData();
  }, []);*/}

  const formatChartData = () => {
    if (overview.stakingTotals) {
      const { total3months, total6months, total12months } = overview.stakingTotals;
      const chartSeries = [total3months, total6months, total12months];
      const labels = ["3 Month Investment", "6 Month Investment", "12 Month Investment"];
      return { chartSeries, labels };
    }
    return { chartSeries: [], labels: [] };
  };

  const { chartSeries, labels } = formatChartData();

  return (
    <>
      <Head>
        <title>Dashboard: Overview | YuvaBitcoin</title>
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
            disableGutters
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
          

            <Grid item xs={12}>
              <Typography variant="h4">Overview</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <OverviewOpenTickets amount={overview.totalTasks ?? 0} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewDoneTasks amount={overview.completedTasks ?? 0} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewPendingIssues amount={overview.pendingTasks ?? 0} />
            </Grid>

            <Grid item xs={12} md={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <OverviewEarnings
                      overview={overview}
                    />

                    <CryptoCurrentBalance
                      chartSeries={chartSeries}
                      labels={labels}
                    />
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
