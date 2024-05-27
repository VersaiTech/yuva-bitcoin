import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { Box, Divider } from '@mui/material';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { ConvertOperations } from '../../../sections/dashboard/web3/convertOperations';
import axios from 'axios';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: undefined
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc'
  });

  return {
    search,
    updateSearch: setSearch
  };
};

const useOrders = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    orders: [],
    ordersCount: 0
  });

  const getOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(`${BASEURL}/api/Convert/getConvertsForUser`, { headers: headers });
      console.log(response.data);

      if (isMounted()) {
        setState({
          orders: response.data,
          ordersCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isMounted]);

  useEffect(() => {
    getOrders();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);

  return state;
};

const ConvertPage = () => {
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();
  const { orders, ordersCount } = useOrders(search);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined
  });
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return orders.find((order) => order.id === drawer.data);
  }, [drawer, orders]);

  usePageView();

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters
    }));
  }, [updateSearch]);

  const handleSortChange = useCallback((sortDir) => {
    updateSearch((prevState) => ({
      ...prevState,
      sortDir
    }));
  }, [updateSearch]);

  const handlePageChange = useCallback((event, page) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }));
  }, [updateSearch]);

  const handleRowsPerPageChange = useCallback((event) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, [updateSearch]);

  const handleOrderOpen = useCallback((orderId) => {
    if (drawer.isOpen && drawer.data === orderId) {
      setDrawer({
        isOpen: false,
        data: undefined
      });
      return;
    }

    setDrawer({
      isOpen: true,
      data: orderId
    });
  }, [drawer]);

  const handleOrderClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Convert | Yuva Bitcoin
        </title>
      </Head>
      <Divider sx={{ mb: 3 }} />
      <ConvertOperations />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {/* Add any additional content or components for the convert page here */}
        </Box>
      </Box>
    </>
  );
};

ConvertPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ConvertPage;
