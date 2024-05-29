
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { ConvertOperations } from "../../../sections/dashboard/web3/convertOperations";
import { OverviewEarnings } from "../../../sections/dashboard/overview/overview-earnings";
import { useRouter } from "next/router";
import axios from "axios";


const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "createdAt",
    sortDir: "desc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useOrders = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    orders: [],
    ordersCount: 0,
    loading: true,
  });

  const getOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${BASEURL}/api/Convert/getConvertsForUser`,
        { headers }
      );
      console.log(response.data);

      if (isMounted()) {
        setState({
          orders: response.data,
          ordersCount: response.data.length,
          loading: false,
        });
      }
    } catch (err) {
      console.error(err);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [search, isMounted]);

  useEffect(() => {
    getOrders();
  }, [search, getOrders]);

  return state;
};


const ConvertPage = () => {
  const rootRef = useRef(null);
  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(true);
  const { search, updateSearch } = useSearch();
  const router = useRouter();
  const { orders, ordersCount, loading: ordersLoading } = useOrders(search);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined,
  });
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }
    return orders.find((order) => order.id === drawer.data);
  }, [drawer, orders]);

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
          headers,
        });

        setOverview(response.data.overview || {});
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConversionSuccess = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      // Make the API call to update overview after conversion
      const response = await axios.get(`${BASEURL}/admin/getUserOverview`, {
        headers,
      });

      setOverview(response.data.overview || {});
      router.push('/dashboard/convert/convertHistory');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Typography variant="body1" align="center">
        Loading...
      </Typography>
    );
  }
  return (
    <>
      <Head>
        <title>Dashboard: Convert | Yuva Bitcoin</title>
      </Head>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ px: 3, py: 2 }}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
        <Stack
          spacing={{
            xs: 3,
            lg: 4,
          }}
        >
              <OverviewEarnings overview={overview} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={12} md={12}>
            <ConvertOperations onConversionSuccess={handleConversionSuccess}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

ConvertPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ConvertPage;
