



import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";
import {QueriesListTable} from "../../../sections/dashboard/queries/queries-table";

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
    rowsPerPage: 10,
    sortBy: "updatedAt",
    sortDir: "desc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useQueries = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    queries: [],
    queriesCount: 0,
  });
  const { page, rowsPerPage } = search;
  console.log(search);

  const getQueries = useCallback(async () => {
    try {
      console.log("called api");
      // const response = await customersApi.getCustomers(search);
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: token,
      };

      let response = await axios.get(`${BASEURL}/api/Support/getAllSupport/${page + 1}/${rowsPerPage}`, { 
        headers: headers,
      });
      console.log(response.data)

      if (!response) {
        response = [];
      }
    if (isMounted()) {
        setState({
          queries: response.data.supportMessages,
          queriesCount: response.data.totalSupport,
        });
        console.log(response.data.supportMessages)
      }
    } catch (err) {
      setState({
        queries: [],
        queriesCount: [],
      });

      console.error(err.response.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isMounted]);

  useEffect(() => {
    getQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return state;
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const { queries, queriesCount} =
    useQueries(search);

  const [currentTab, setCurrentTab] = useState("all");

  useEffect(() => {
    console.log(queries);
  }, [queries]);

  console.log(currentTab);

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
        <title>Dashboard: Queries List | Rock34x</title>
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
            <Stack direction="row" justifyContent="center" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">All Queries</Typography>
                
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
            
              </Stack>
            </Stack>
            <Card>
         
            <QueriesListTable 
            queries={queries}
            queriesCount={queriesCount}
            // queriesCount={currentTab === 'all' ? queriesCount : currentTab === 'hasAcceptedMarketing' ? activeUsers.length : currentTab === 'isProspect' ? blockedUsers.length : 0}
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
