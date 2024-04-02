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
import { OverviewDoneTasks } from '../../sections/dashboard/overview/overview-done-tasks';
import { OverviewOpenTickets } from '../../sections/dashboard/overview/overview-open-tickets';
import { OverviewPendingIssues } from '../../sections/dashboard/overview/overview-pending-issues';
// import { OverviewEarnings } from "../../sections/dashboard/overview/overview-earnings";
import { OverviewEarnings } from "../../sections/dashboard/overview/overview-earnings";
import { useTotalInvestment } from "./stake/[stakeId]";
import { useEffect, useState } from 'react';
import axios from 'axios';
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;


const now = new Date();

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();
  const [overview, setOverview] = useState([]);
  const totalInvestment = useTotalInvestment();
  const chartSeries = [
     totalInvestment
  ];
  usePageView();
  const OverviewData = async () => {
    try{
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
    }

    const response = await axios.get(`${BASEURL}/admin/getUserOverview`, { headers: headers });

    console.log(response.data.overview)
    setOverview(response.data.overview)
  
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    OverviewData();
  }, []) 

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
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row"
justifyContent="space-between"
spacing={4}>
                <div>
                  <Typography variant="h4">Overview</Typography>
                </div>
              </Stack>
            </Grid>

            <Grid
              xs={12}
              md={4}
            >
              <OverviewOpenTickets amount={overview.userTasks} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewDoneTasks amount={overview.completedTasks} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewPendingIssues amount={overview.pendingTasks} />
            </Grid>


            
            <Grid xs={12}
md={12}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
            <OverviewEarnings />

                <CryptoCurrentBalance
                  chartSeries={chartSeries}
                  labels={["3 Month Investment", "6 Month Investment", "9 Month "]}
                />
                {/* <CryptoTransactions
                  transactions={[
                    {
                      id: "3cc450e88286fdd4e220c719",
                      amount: 0.1337,
                      balance: 4805,
                      coin: "BTC",
                      createdAt: subDays(
                        subHours(subMinutes(now, 43), 5),
                        3
                      ).getTime(),
                      operation: "add",
                      title: "Buy BTC",
                    },
                    {
                      id: "6442793e96a90d4e584a19f7",
                      amount: 0.2105,
                      balance: 2344,
                      coin: "BTC",
                      createdAt: subDays(
                        subHours(subMinutes(now, 32), 54),
                        6
                      ).getTime(),
                      operation: "sub",
                      title: "Sell BTC",
                    },
                  ]}
                /> */}
              </Stack>
            </Grid>
            {/* <Grid xs={12} md={4}>
                <Stack
                  spacing={{
                    xs: 3,
                    lg: 4,
                  }}
                >
                  
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
