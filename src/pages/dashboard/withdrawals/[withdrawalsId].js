import {
  Typography,
  Box,
  Container,
  Stack,
  SvgIcon,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
import Link from "next/link";
import NextLink from "next/link";
import { WithdrawalsCreateForm } from "../../../sections/dashboard/withdrawals/withdrawals-create-form";
// import { useCustomer } from "./useCustomer"; // Import the useCustomer hook from the new file
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const imageURL = "/assets/logos/yuvalogo2.png";
const imageURL2 = "/assets/logos/logo-usdt.svg";

const Page = () => {
  // const customer = useCustomer();
  const [customerBalance, setCustomerBalance] = useState(null);
  const [customerUsdt, setCustomerUsdt] = useState(null);

  const getCustomerBalance = useCallback(async () => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "/auth/login/modern";
        return;
      }
      const headers = {
        Authorization: token,
      };
      console.log(
        `Making API call to ${BASEURL}/admin/getuserbalance with headers`,
        headers
      );
      const response = await axios.get(`${BASEURL}/admin/getuserbalance`, {
        headers,
      });
      console.log("API response:", response.data);
      setCustomerUsdt(response.data.usdt);
      setCustomerBalance(response.data.balance);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getCustomerBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCustomerBalance]);

  return (
    <>
      <Head>
        <title>Dashboard: Withdraw | Yuva Bitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  component={NextLink}
                  href={paths.dashboard.withdraw.index}

                  // underline="hover"
                >
                  <SvgIcon sx={{ mr: 1, color: "text.primary" }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2" color={"text.primary"}>
                    Withdrawals
                  </Typography>
                </Link>
              </div>
              <div>
              <Container maxWidth="sm" sx={{ textAlign: "center" }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader
                      subheader={
                        <Typography variant="h3" color="text.primary">
                          {imageURL && (
                            <Image
                              src={imageURL}
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          )}{" "}
                          {/* Render image if imageURL is available */}
                          {customerBalance !== null
                            ? customerBalance.toFixed(4)
                            : 0}
                        </Typography>
                      }
                      sx={{ pb: 0, marginBottom: 3 }}
                      title={
                        <>
                          <Typography color="text.primary" variant="overline">
                            Total Yuva Bitcoin
                          </Typography>
                        </>
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader
                      subheader={
                        <Typography variant="h3" color="text.primary">
                          {imageURL2 && (
                            <Image
                              src={imageURL2}
                              alt="Image"
                              width={30}
                              height={30}
                            />
                          )}{" "}
                          {/* Render image if imageURL is available */}
                          {customerUsdt !== null
                            ? customerUsdt.toFixed(4)
                            : 0}
                        </Typography>
                      }
                      sx={{ pb: 0, marginBottom: 3 }}
                      title={
                        <>
                          <Typography color="text.primary" variant="overline">
                            Total USDT
                          </Typography>
                        </>
                      }
                    />
                  </Card>
                </Grid>
              </Grid>
            </Container>
              </div>
            </Stack>
            <WithdrawalsCreateForm /> {/* handleSubmit={handleSubmit} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;



