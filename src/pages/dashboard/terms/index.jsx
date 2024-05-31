import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  SvgIcon,
  Link,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { usePageView } from "../../../hooks/use-page-view";
import Cardd from "../../components/card.jsx";

const TermsAndConditionsPage = () => {
  usePageView();
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Terms and Conditions | Yuva Bitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            py: 8,
          }}
        >
          <Container maxWidth="md" sx={{ pl: { lg: 5 } }}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                mb: 6,
                mt: 8,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                }}
                variant="rounded"
              >
                <SvgIcon>
                  <DescriptionIcon />
                </SvgIcon>
              </Avatar>
              <Typography variant="overline">Terms and Conditions</Typography>
            </Stack>
            
            <Typography sx={{ mb: 3 ,textAlign:"center"}} variant="h1">
              Welcome to Yuva Bitcoin
            </Typography>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", // Optional: Remove if you only want horizontal centering
                }}
              >
                <Cardd />
              </Box>
            </Grid>

          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            px: 6,
            py: 10,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              pr: {
                lg: 1,
              },
            }}
          >
            <Typography sx={{ pb: 3 }} variant="h6">
              Terms and Conditions
            </Typography>
            <Paper elevation={3} sx={{ p: 3, mt: 1 }}>
              <Typography variant="body1" paragraph>
                Welcome to Yuva Bitcoin. These terms and conditions outline the
                rules and regulations for the use of Yuva Bitcoin Website,
                located at https://yuvabitcoin.com.
              </Typography>
              <Typography variant="body1" paragraph>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Yuva Bitcoin if you do not
                agree to take all of the terms and conditions stated on this
                page.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Cookies
              </Typography>
              <Typography variant="body1" paragraph>
                We employ the use of cookies. By accessing Yuva Bitcoin, you
                agreed to use cookies in agreement with the Yuva Bitcoin Privacy
                Policy.
              </Typography>
              <Typography variant="h6" gutterBottom>
                License
              </Typography>
              <Typography variant="body1" paragraph>
                Unless otherwise stated, Yuva Bitcoin and/or its licensors own
                the intellectual property rights for all material on Yuva
                Bitcoin. All intellectual property rights are reserved. You may
                access this from Yuva Bitcoin for your own personal use
                subjected to restrictions set in these terms and conditions.
              </Typography>
              <Typography variant="h6" gutterBottom>
                You must not:
              </Typography>
              <Typography variant="body1" component="div">
                <ul>
                  <li>Republish material from Yuva Bitcoin</li>
                  <li>Sell, rent, or sub-license material from Yuva Bitcoin</li>
                  <li>
                    Reproduce, duplicate or copy material from Yuva Bitcoin
                  </li>
                  <li>Redistribute content from Yuva Bitcoin</li>
                </ul>
              </Typography>
              <Typography variant="body1" paragraph>
                This Agreement shall begin on the date hereof.
              </Typography>
              <Typography variant="body1" paragraph>
                ...
              </Typography>
              <Typography variant="body1" paragraph>
                [Include additional terms and conditions here]
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions or concerns about our terms and
                conditions, please contact us at support@yuvabitcoin.com.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

TermsAndConditionsPage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default TermsAndConditionsPage;
