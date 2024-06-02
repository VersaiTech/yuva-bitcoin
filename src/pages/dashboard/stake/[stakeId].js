// import { useCallback, useEffect, useState } from "react";
// import NextLink from "next/link";
// import Head from "next/head";
// import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
// import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
// import {
//   Box,
//   Button,
//   Container,
//   Link,
//   Stack,
//   SvgIcon,
//   Typography,
//   Card,
//   Grid,
//   CardHeader,
//   CardContent,
//   Divider,
//   CardActions,
// } from "@mui/material";
// import axios from "axios";
// import { usePageView } from "../../../hooks/use-page-view";
// import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import { paths } from "../../../paths";
// import { CustomerEditForm } from "../../../sections/dashboard/stake/stake-add-form";
// import { CustomerWithdrawForm } from "../../../sections/dashboard/stake/stake-withdraw-form";
// import InterestCalculator from "./calculator";
// import { padding } from "@mui/system";
// import Image from "next/image";
// import CircularProgress from "@mui/material/CircularProgress";
// import WalletCard from "../../components/WalletCard";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
// const imageURL = "/assets/logos/yuvalogo2.png";

// export const useTotalInvestment = () => {
//   const [totalInvestment, setTotalInvestment] = useState(null);

//   const getTotalInvestment = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         // If token is not available, redirect to login page
//         window.location.href = "/auth/login/modern"; // Assuming login page route is "/login"
//         return;
//       }
//       const headers = {
//         Authorization: token,
//       };

//       const response = await axios.get(
//         `${BASEURL}/api/Staking/getTotalInvestmentByUserId`,
//         {
//           headers: headers,
//         }
//       );
//       console.log(response.data);

//       setTotalInvestment(response.data.totalInvestment);
//     } catch (err) {
//       console.error(err);
//     }
//   }, []);

//   useEffect(() => {
//     getTotalInvestment();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return totalInvestment;
// };

// const Page = () => {
//   const totalInvestment = useTotalInvestment();

//   const [overview, setOverview] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const OverviewData = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const headers = {
//         Authorization: token,
//       };

//       const response = await axios.get(`${BASEURL}/admin/getUserOverview`, {
//         headers: headers,
//       });

//       // console.log(response.data.overview)
//       setOverview(response.data.overview);
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     OverviewData();
//   }, []);

//   usePageView();

//   return (
//     <>
//       <Head>
//         <title>Dashboard: Stake Add | YuvaBitcoin</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           // py: 4,
//           pl: 0,
//           // padding: "0px",
//         }}
//       >
//         <Container
//           maxWidth="lg"
//           //want to padding 0
//           sx={{ pl: 0 }}
//         >
//           <Stack spacing={4} sx={{ pl: 0 }}>
//             <Stack spacing={4} sx={{ pl: 0 }}>
//               <div>
//                 <Link
//                   color="text.primary"
//                   href={paths.dashboard.stake.index}
//                   sx={{
//                     alignItems: "center",
//                     display: "inline-flex",
//                   }}
//                   underline="hover"
//                 >
//                   <SvgIcon sx={{ mr: 1 }}>
//                     <ArrowLeftIcon />
//                   </SvgIcon>
//                   <Typography variant="subtitle2">Stakes</Typography>
//                 </Link>
//               </div>
//               <Grid
//                 container
//                 //want to spacing top and bottom
//               >
//                 <Grid item xs={12} md={6}>
//                   <Container
//                     maxWidth="sm"
//                     sx={{ textAlign: "center", pb: 4, px: 4 }}
//                   >
//                     <Card sx={{ padding: 0 }}>
//                       {" "}
//                       {/* Remove all padding from the Card */}
//                       <Divider sx={{ mb: 2 }} />
//                       <Typography color="text.primary" variant="overline">
//                         Total Yuva Bitcoin invested
//                       </Typography>
//                       <Divider />
//                       <CardHeader
//                         subheader={
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-around",
//                             }}
//                           >
//                             <img
//                               src="/assets/logos/investment.png"
//                               style={{ width: 70 }}
//                               alt="investment"
//                             />
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               {imageURL && (
//                                 <Image
//                                   src={imageURL}
//                                   alt="Image"
//                                   width={30}
//                                   height={30}
//                                 />
//                               )}{" "}
//                               {/* Render image if imageURL is available */}
//                               <Typography
//                                 variant="h3"
//                                 sx={{ marginLeft: 1, color: "text.primary" }}
//                               >
//                                 {"" + totalInvestment || 0}
//                               </Typography>
//                             </div>
//                           </div>
//                         }
//                       />
//                       <CardContent sx={{ padding: 0 }}>
//                         {" "}
//                         {/* Remove all padding from the CardContent */}
//                         <Divider sx={{ mb: 2 }} />
//                         {/*<Card>
//                           <CardContent>
//                             <Stack
//                               direction="row"
//                               alignItems="center"
//                               justifyContent="space-around"
//                               spacing={2}
//                             >
//                               <img
//             src="/Wallet.png" // Replace with the path to your image
//             alt="Your Image"
//             style={{
//               width: 100, // Adjust the width of the image as needed
//               height: 100, // Adjust the height of the image as needed
//               objectFit: "contain", // Ensure the image covers the entire container
//               zIndex: 1, // Ensure the image is above other content
//             }}
//           />
//           <Box sx={{ flexGrow: 1 }}>
//             <Stack spacing={1} alignItems="center">
//               {loading ? (
//                 // Show a CircularProgress loader while data is loading
//                 <CircularProgress />
//               ) : (
//                 // Render user balance when data is available
//                 <Typography variant="h4">
//                   {overview
//                     ? `${parseFloat(overview.coins).toFixed(4)} Yuva Bitcoin`
//                     : "0 Yuva Bitcoin"}
//                 </Typography>
//               )}
//               <Typography variant="h6">
//                 Your Wallet Balance
//               </Typography>
//             </Stack>
//             </Box>
//                               <Grid item xs={12} md={6}>
//                                 <Box
//                                   sx={{
//                                     position: "relative",
//                                     width: "100%",
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center", // Optional: Remove if you only want horizontal centering
//                                   }}
//                                 >
//                                   <WalletCard />
//                                 </Box>
//                               </Grid>
//                             </Stack>
//                           </CardContent>
//                                 </Card>*/}
//                       </CardContent>
//                     </Card>
//                   </Container>
//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   sx={{ paddingRight: 2, paddingLeft: 2 }}
//                 >
//                   <InterestCalculator />
//                 </Grid>
//               </Grid>
//             </Stack>
//             <Grid container spacing={4} sx={{ pl: 0, mb: 4 }}>
//               {/* Add Stake Card */}
//               <Grid
//                 item
//                 xs={12}
//                 md={6}
//                 sx={{ paddingRight: 2, paddingLeft: 2 }}
//               >
//                 <CustomerEditForm /> {/* handleSubmit={handleSubmit} */}
//               </Grid>

//               {/* Withdraw Stake Card */}
//               <Grid
//                 item
//                 xs={12}
//                 md={6}
//                 sx={{ paddingRight: 2, paddingLeft: 2 }}
//               >
//                 <CustomerWithdrawForm />
//               </Grid>
//             </Grid>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Divider,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
import { CustomerEditForm } from "../../../sections/dashboard/stake/stake-add-form";
import { CustomerWithdrawForm } from "../../../sections/dashboard/stake/stake-withdraw-form";
import InterestCalculator from "./calculator";
import Image from "next/image";
import WalletCard from "../../components/WalletCard";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
const imageURL = "/assets/logos/yuvalogo2.png";

export const useTotalInvestment = () => {
  const [totalInvestment, setTotalInvestment] = useState(null);

  const getTotalInvestment = useCallback(async () => {
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

      const response = await axios.get(
        `${BASEURL}/api/Staking/getTotalInvestmentByUserId`,
        {
          headers: headers,
        }
      );
      console.log(response.data);

      setTotalInvestment(response.data.totalInvestment);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getTotalInvestment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return totalInvestment;
};

const Page = () => {
  const totalInvestment = useTotalInvestment();
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const OverviewData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(`${BASEURL}/admin/getUserOverview`, {
        headers: headers,
      });

      setOverview(response.data.overview);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    OverviewData();
  }, []);

  usePageView();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Stake Add | YuvaBitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 0,
        }}
      >
        <Container maxWidth="lg" sx={{ pl: 0 }}>
          <Stack spacing={4} sx={{ pl: 0 }}>
            <Stack spacing={4} sx={{ pl: 0 }}>
              <div>
                <Link
                  color="text.primary"
                  href={paths.dashboard.stake.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Stakes</Typography>
                </Link>
              </div>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Container
                    maxWidth="sm"
                    sx={{ textAlign: "center", pb: 4, px: 4 }}
                  >
                    <Card sx={{ padding: 0 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography color="text.primary" variant="overline">
                        Total Yuva Bitcoin
                      </Typography>
                      <Divider />
                      <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                      >
                        <Tab label="Investment" />
                        <Tab label="Wallet" />
                      </Tabs>
                      <CardContent sx={{ padding: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            paddingTop: 16,
                          }}
                        >
                          <img
                            src={
                              selectedTab === 0
                                ? "/assets/logos/investment.png"
                                : "/Wallet.png"
                            }
                            style={{ width: 70 }}
                            alt="icon"
                          />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {selectedTab === 0 && imageURL && (
                              <Image
                                src={imageURL}
                                alt="Image"
                                width={30}
                                height={30}
                              />
                            )}
                            {selectedTab === 0 ? (
                              <Typography
                                variant="h3"
                                sx={{ marginLeft: 1, color: "text.primary" }}
                              >
                                {"" + totalInvestment || 0}
                              </Typography>
                            ) : (
                              <Box sx={{ flexGrow: 1 }}>
                                <Stack spacing={1} alignItems="center">
                                  {loading ? (
                                    <CircularProgress />
                                  ) : (
                                    <Typography variant="h4">
                                      {overview
                                        ? `${parseFloat(overview.coins).toFixed(
                                            4
                                          )}`
                                        : "0"}
                                      <br />
                                      YB
                                    </Typography>
                                  )}
                                </Stack>
                              </Box>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Container>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ paddingRight: 2, paddingLeft: 2 }}
                >
                  <InterestCalculator />
                </Grid>
              </Grid>
            </Stack>
            <Grid container spacing={4} sx={{ pl: 0, mb: 4 }}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ paddingRight: 2, paddingLeft: 2 }}
              >
                <CustomerEditForm />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ paddingRight: 2, paddingLeft: 2 }}
              >
                <CustomerWithdrawForm />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
