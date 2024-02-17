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
import { OverviewAllTasks } from "../../sections/dashboard/overview/overview-all-tasks";
// import { TodayTask } from "../../sections/dashboard/overview/overview-today-task";
import { TodayTask } from "../../sections/dashboard/overview/overview-today-tasks";
import { TodayCompletedTask } from "../../sections/dashboard/overview/overview-todaydone-tasks";

const now = new Date();

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();

  usePageView();

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Rock34x</title>
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
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Overview</Typography>
                </div>
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <AllUsers amount={5043} />
            </Grid>
            <Grid xs={12} md={4}>
              <ActiveUsers amount={142} />
            </Grid>
            <Grid xs={12} md={4}>
              <BlockUsers amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <AllTask amount={1232} />
            </Grid>
            
            <Grid xs={12} md={4}>
              <OverviewDoneTasks amount={31} />
            </Grid>

            <Grid xs={12} md={4}>
              <OverviewPendingIssues amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <TodayTask amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <TodayCompletedTask amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewOpenTickets amount={5} />
            </Grid>

            <Grid xs={12} md={8}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <CryptoCurrentBalance
                  chartSeries={[16213.2, 9626.8, 10076.81]}
                  labels={["Bitcoin", "Ethereum", "US Dollars"]}
                />
                <CryptoTransactions
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
