// import Head from 'next/head';
// import { addDays, subDays, subHours, subMinutes } from 'date-fns';
// import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
// import {
//   Box,
//   Button,
//   Container,
//   Stack,
//   SvgIcon,
//   Typography,
//   Unstable_Grid2 as Grid
// } from '@mui/material';
// import { usePageView } from '../../hooks/use-page-view';
// import { useSettings } from '../../hooks/use-settings';
// import { Layout as DashboardLayout } from '../../layouts/dashboard';
// import { OverviewDoneTasks } from '../../sections/dashboard/overview/overview-done-tasks';
// import { OverviewEvents } from '../../sections/dashboard/overview/overview-events';
// import { OverviewInbox } from '../../sections/dashboard/overview/overview-inbox';
// import { OverviewTransactions } from '../../sections/dashboard/overview/overview-transactions';
// import { OverviewPendingIssues } from '../../sections/dashboard/overview/overview-pending-issues';
// import { OverviewSubscriptionUsage } from '../../sections/dashboard/overview/overview-subscription-usage';
// import { OverviewHelp } from '../../sections/dashboard/overview/overview-help';
// import { OverviewJobs } from '../../sections/dashboard/overview/overview-jobs';
// import { OverviewOpenTickets } from '../../sections/dashboard/overview/overview-open-tickets';
// import { OverviewTips } from '../../sections/dashboard/overview/overview-tips';

// const now = new Date();

// const Page = () => {
//   const settings = useSettings();

//   usePageView();

//   return (
//     <>
//       <Head>
//         <title>
//           Dashboard: Overview | Rock34x
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 4
//         }}
//       >
//         <Container maxWidth={settings.stretch ? false : 'xl'}>
//           <Grid
//             container
//             disableEqualOverflow
//             spacing={{
//               xs: 3,
//               lg: 4
//             }}
//           >
//             <Grid xs={12}>
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 spacing={4}
//               >
//                 <div>
//                   <Typography variant="h4">
//                     Overview
//                   </Typography>
//                 </div>
//               </Stack>
//             </Grid>
//             <Grid
//               xs={12}
//               md={4}
//             >
//               <OverviewPendingIssues amount={12} />
//             </Grid>
//             <Grid
//               xs={12}
//               md={4}
//             >
//               <OverviewOpenTickets amount={5} />
//             </Grid>
//             <Grid
//               xs={12}
//               md={4}
//             >
//               <OverviewDoneTasks amount={31} />
//             </Grid>
//             <Grid
//               xs={12}
//               md={5}
//             >
//               <OverviewInbox
//                 messages={[
//                   {
//                     id: 'b91cbe81ee3efefba6b915a7',
//                     content: 'Hello, we spoke earlier on the phone',
//                     createdAt: subMinutes(now, 2),
//                     senderAvatar: '/assets/avatars/avatar-alcides-antonio.png',
//                     senderName: 'Alcides Antonio',
//                     senderOnline: true
//                   },
//                   {
//                     id: 'de0eb1ac517aae1aa57c0b7e',
//                     content: 'Is the job still available?',
//                     createdAt: subMinutes(now, 56),
//                     senderAvatar: '/assets/avatars/avatar-marcus-finn.png',
//                     senderName: 'Marcus Finn',
//                     senderOnline: false
//                   },
//                   {
//                     id: '38e2b0942c90d0ad724e6f40',
//                     content: 'What is a screening task? I’d like to',
//                     createdAt: subHours(subMinutes(now, 23), 3),
//                     senderAvatar: '/assets/avatars/avatar-carson-darrin.png',
//                     senderName: 'Carson Darrin',
//                     senderOnline: true
//                   },
//                   {
//                     id: '467505f3356f25a69f4c4890',
//                     content: 'Still waiting for feedback',
//                     createdAt: subHours(subMinutes(now, 6), 8),
//                     senderAvatar: '/assets/avatars/avatar-fran-perez.png',
//                     senderName: 'Fran Perez',
//                     senderOnline: true
//                   },
//                   {
//                     id: '7e6af808e801a8361ce4cf8b',
//                     content: 'Need more information about campaigns',
//                     createdAt: subHours(subMinutes(now, 18), 10),
//                     senderAvatar: '/assets/avatars/avatar-jie-yan-song.png',
//                     senderName: 'Jie Yan Song',
//                     senderOnline: false
//                   }
//                 ]}
//               />
//             </Grid>
//             <Grid
//               xs={12}
//               md={7}
//             >
//               <OverviewTransactions
//                 transactions={[
//                   {
//                     id: 'd46800328cd510a668253b45',
//                     amount: 25000,
//                     createdAt: now.getTime(),
//                     currency: 'usd',
//                     sender: 'Rock34x',
//                     status: 'on_hold',
//                     type: 'receive'
//                   },
//                   {
//                     id: 'b4b19b21656e44b487441c50',
//                     amount: 6843,
//                     createdAt: subDays(now, 1).getTime(),
//                     currency: 'usd',
//                     sender: 'Zimbru',
//                     status: 'confirmed',
//                     type: 'send'
//                   },
//                   {
//                     id: '56c09ad91f6d44cb313397db',
//                     amount: 91823,
//                     createdAt: subDays(now, 1).getTime(),
//                     currency: 'usd',
//                     sender: 'Vertical Jelly',
//                     status: 'failed',
//                     type: 'send'
//                   },
//                   {
//                     id: 'aaeb96c5a131a55d9623f44d',
//                     amount: 49550,
//                     createdAt: subDays(now, 3).getTime(),
//                     currency: 'usd',
//                     sender: 'Rock34x',
//                     status: 'confirmed',
//                     type: 'receive'
//                   }
//                 ]}
//               />
//             </Grid>
//             <Grid
//               xs={12}
//               md={5}
//             >
//               <OverviewEvents
//                 events={[
//                   {
//                     id: '3bfa0bc6cbc99bf747c94d51',
//                     createdAt: addDays(now, 1),
//                     description: '17:00 to 18:00',
//                     title: 'Meeting with Partners'
//                   },
//                   {
//                     id: 'dd6c8ce8655ac222b01f24f9',
//                     createdAt: addDays(now, 4),
//                     description: '17:00 to 18:00',
//                     title: 'Weekly Meeting'
//                   },
//                   {
//                     id: 'f274902e2bf226865b3cf947',
//                     createdAt: addDays(now, 4),
//                     description: '17:00 to 18:00',
//                     title: 'Weekly Meeting'
//                   },
//                   {
//                     id: 'd2a66e24110f52acb0cd0b9f',
//                     createdAt: addDays(now, 7),
//                     description: '17:00 to 18:00',
//                     title: 'Weekly Meeting'
//                   }
//                 ]}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default Page;

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

import { useEffect, useState } from "react";
import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const now = new Date();

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();

  const [overview, setOverview] = useState([]);

  usePageView();

  const OverviewData = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
    }

    const response = await axios.get(`${BASEURL}/admin/getOverview`, { headers: headers });

    console.log(response.data.overview)
    setOverview(response.data.overview)
  }

  useEffect(() => {
    OverviewData();
  }, []) 

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
            {/* <Grid xs={12} md={4}>
              <TodayTask amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <TodayCompletedTask amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewOpenTickets amount={5} />
            </Grid> */}

            <Grid xs={12} md={8}>
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
