// CryptoMarketplacePage.js

import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { GridList2 } from "../../../sections/components/grid-lists/grid-list-2";
import { paths } from "../../../paths";
import axios from "axios";
import OrderForm from "./Orderform";

const CryptoMarketplacePage = () => {
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("Listed");
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [status]);

  const fetchData = async () => {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      let url;
      if (status === "Listed") {
        url = `${BASEURL}/api/Order/getAllOrderForAll`;
      } else if (status === "Ordered") {
        url = `${BASEURL}/api/Order/getAllOrderForOneUSer`;
      }

      const response = await axios.get(url, { headers });
      const data = response.data;
      console.log(data);
      setListings(data.order);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCreateOrder = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handlePlaceOrder = async () => {
    try {
     
      // Your logic to fetch form data and post it to the backend API
      // Use axios or any preferred method for making HTTP requests
      console.log("Posting order data...");
      handleCloseForm();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Crypto Marketplace | Your Crypto Hub</title>
      </Head>
      <Box component="main"
sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <Typography variant="h3">Crypto Marketplace</Typography>
            <Breadcrumbs separator="›">
              <Link href={paths.dashboard.index}
passHref>
                <Typography color="inherit">Dashboard</Typography>
              </Link>
              <Typography color="text.primary">Crypto Marketplace</Typography>
            </Breadcrumbs>
          </Stack>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Featured Listings
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Select
              value={status}
              onChange={handleStatusChange}
              displayEmpty
              fullWidth
              sx={{ mr: 1, width: "50%" }}
              renderValue={(selected) => (
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {selected === "Listed" ? "Listed" : "Ordered"}
                </Typography>
              )}
            >
              <MenuItem value="Listed">
                <Typography variant="body1">Listed</Typography>
              </MenuItem>
              <MenuItem value="Ordered">
                <Typography variant="body1">Ordered</Typography>
              </MenuItem>
            </Select>
            <Button variant="contained" size="medium" onClick={handleCreateOrder}>
              Create Order
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <GridList2 projects={listings} key={listings} />
        </Container>
      </Box>

      <OrderForm open={openForm} handleClose={handleCloseForm} handlePlaceOrder={handlePlaceOrder} />
    </>
  );
};

CryptoMarketplacePage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CryptoMarketplacePage;
