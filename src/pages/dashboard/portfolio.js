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
import { useTotalInvestment } from "./stake/[stakeId]";
import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  usePageView();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // If token is not available, redirect to login page
          window.location.href = "/auth/login/modern"; // Assuming login page route is "/login"
          return;
        }
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(`${BASEURL}/admin/getUserOverview`, {
          headers: headers,
        });

        console.log(response.data.overview);

        setOverview(response.data.overview);
        setLoading(false); // Data fetching completed, set loading to false
      } catch (error) {
        console.error(error);
        setLoading(false); // Error occurred, set loading to false
      }
    };

    fetchData();
  }, []);

  // Format data for CryptoCurrentBalance component
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
              <OverviewOpenTickets amount={overview.totalTasks} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewDoneTasks amount={overview.completedTasks} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewPendingIssues amount={overview.pendingTasks} />
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
                      amount={
                        overview.deposit_usdt
                          ? parseFloat(overview.deposit_usdt).toFixed(4)
                          : "0"
                      }
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
