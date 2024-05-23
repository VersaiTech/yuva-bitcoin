import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { ordersApi } from '../../../api/orders';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
// import { TaskDrawer } from '../../../sections/dashboard/order/order-drawer';
import { DepositsListSearch } from '../../../sections/dashboard/depostis/deposits-list-search';
import { DepositsListContainer } from '../../../sections/dashboard/depostis/deposits-list-container';
import { DepositsListTable } from '../../../sections/dashboard/depostis/deposits-list-table';
import { CryptoOperation } from '../../../sections/dashboard/crypto/crypto-operation';
import { DepositOperations } from '../../../sections/dashboard/web3/depositBanner'
import { ceil } from 'lodash';
import { auto } from '@popperjs/core';
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
      }

      const response = await axios.get(`${BASEURL}/api/Deposit/getDepositsForUser`, { headers: headers })
      console.log(response.data)

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

const Page = () => {
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
    // Close drawer if is the same order

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
          Dashboard: Earnings | Yuva Bitcoin
        </title>
      </Head>
      <Divider sx={{ mb: 3 }} />
      <DepositOperations />
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
          {/* <DepositsListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    All Deposits 
                  </Typography>
                </div>
                
              </Stack>
            </Box>
            <Divider />
            <DepositsListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <Divider />
            <DepositsListTable
              onOrderSelect={handleOrderOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              orders={orders}
              ordersCount={ordersCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </DepositsListContainer> */}

        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
