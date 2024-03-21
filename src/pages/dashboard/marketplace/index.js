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
} from "@mui/material";
import { Layout as DashboardLayout } from "../../../layouts/dashboard"; // Importing the Layout component
import { GridList2 } from "../../../sections/components/grid-lists/grid-list-2";
import { Table1 } from "../../../sections/components/tables/table-1";
import { paths } from "../../../paths"; // Importing the paths
import axios from "axios";

// Placeholder data for demonstration purposes


const CryptoMarketplacePage = () => {
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState("Listed"); // Initial status is 'Listed'

  useEffect(() => {
    fetchData();
  }, [status]); // Refetch data when status changes


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
        url = `${BASEURL}/api/Order/getAllOrderForOneUSer`; // Adjust endpoint
      }

      const response = await axios.get(url, { headers });
      const data = response.data;
      console.log(data);
      setListings(data.order);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Crypto Marketplace | Your Crypto Hub</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}>
            {" "}
            {/* Increased spacing */}
            <Typography variant="h3">Crypto Marketplace</Typography>
            <Breadcrumbs separator="›">
              <Link href={paths.dashboard.index} passHref>
                <Typography color="inherit">Dashboard</Typography>
              </Link>
              <Typography color="text.primary">Crypto Marketplace</Typography>
            </Breadcrumbs>
          </Stack>
          <Typography variant="h4" sx={{ mt: 4 }}>
            {" "}
            {/* Added margin top */}
            Featured Listings
          </Typography>
          <Select
            value={status}
            onChange={handleStatusChange}
            displayEmpty
            fullWidth
            sx={{ mt: 2, width: "50%" }} // Adjust the width as needed
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
          <Divider sx={{ my: 3 }} /> {/* Increased spacing */}
          {status === "Listed" ? (
            <GridList2 projects={listings}
              key={listings} />
          ) : (
            <GridList2 projects={listings}
              key={listings} />
          )}
        </Container>
      </Box>
    </>
  );
};

// Providing the layout for the page
CryptoMarketplacePage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CryptoMarketplacePage;
