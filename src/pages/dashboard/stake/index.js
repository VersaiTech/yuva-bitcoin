import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Link,
  Typography,
} from "@mui/material";
// import { customersApi } from "../../../api/customers";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
// import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";
import { StakeListSearch } from "../../../sections/dashboard/stake/stake-list-search";
import { StakeListTable } from "../../../sections/dashboard/stake/stake-list-table";
import { paths } from "../../../paths";
import NextLink from "next/link";

import axios from "axios";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "updatedAt",
    sortDir: "desc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useCustomers = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    // history: [],
    customers: [],
    customersCount: 0,
  });

  const getCustomers = useCallback(async () => {
    try {
      // First API call
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(`${BASEURL}/api/Staking/getStaked`, {
        headers: headers,
      });
      //console.log(response.data);

      const totalStaked = response.data.total || response.data.staked.length;

      // Second API call
      const history = await axios.get(`${BASEURL}/api/Staking/getUnstaked`, {
        headers: headers,
      });
      console.log(history.data.staked);

      if (isMounted()) {
        setState({
          customers: response.data.staked,
          customersCount: totalStaked,
          history: history.data.staked,
          // Add state for other data from the second API call if needed
        });
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isMounted]);

  useEffect(
    () => {
      getCustomers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const Page = () => {
  // get url status from query
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");

  const { search, updateSearch } = useSearch();
  const { customers, customersCount, completed, rejected, pending, history } =
    useCustomers(search);

  const [currentTab, setCurrentTab] = useState("all");

  usePageView();

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handleSortChange = useCallback(
    (sort) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }));
    },
    [updateSearch]
  );

  const handlePageChange = useCallback(
    (event, page) => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  return (
    <>
      <Head>
        <title>Dashboard: Stake List | Yuva Bitcoin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">All Stakes</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link
                  component={NextLink}
                  color="inherit"
                  href={paths.dashboard.stake.create}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Card>
              <StakeListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortDir={search.sortDir}
                history={history}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <StakeListTable
                customers={
                  currentTab === "all"
                    ? customers
                    : currentTab === "history"
                    ? history
                    : []
                }
                customersCount={
                  currentTab === "all"
                    ? customersCount
                    : currentTab === "history"
                    ? history.length
                    : 0
                }
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
