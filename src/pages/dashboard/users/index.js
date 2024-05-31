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
  Typography,
} from "@mui/material";
import { customersApi } from "../../../api/customers";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
// import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";

import axios from "axios";
import { customer } from "../../../api/customers/data";
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
    customers: [],
    customersCount: 0,
  });
  const { page, rowsPerPage } = search;
  console.log(search);

  const getCustomers = useCallback(async () => {
    try {
      console.log("called api");
      // const response = await customersApi.getCustomers(search);
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: token,
      };

      let response = await axios.get(`${BASEURL}/admin/getAllMembers/${page + 1}/${rowsPerPage}`, {
        headers: headers,
      });

      console.log(response.data)
      let activeUsersResponse = await axios.get(
        `${BASEURL}/admin/getActiveMembers/${page + 1}/${rowsPerPage}`,
        { headers: headers }
      );

      let blockedUsersResponse = await axios.get(
        `${BASEURL}/admin/getBlockedMembers/${page + 1}/${rowsPerPage}`,
        { headers: headers }
      );

      if (!response) {
        response = [];
      }
      if (!activeUsersResponse) {
        activeUsersResponse = [];
      }
      if (!blockedUsersResponse) {
        blockedUsersResponse = [];
      }
      console.log(activeUsersResponse);
      if (isMounted()) {
        setState({
          customers: response.data.members,
          customersCount: response.data.members.length,
          activeUsers: activeUsersResponse.data.members,
          blockedUsers: blockedUsersResponse.data.members,
        });

        console.log(blockedUsersResponse.data.members);
        console.log(response.data.members)
      }
    } catch (err) {
      setState({
        customers: [],
        customersCount: 0,
        activeUsers: [],
        blockedUsers: [],
      });

      console.error(err.response.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isMounted]);

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return state;
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const { customers, customersCount, activeUsers, blockedUsers } = useCustomers(search);
  const [currentTab, setCurrentTab] = useState("all");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(customers);
  }, [customers]);

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
        <title>Dashboard: Users List | Rock34x</title>
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
                <Typography variant="h4">All Users</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}></Stack>
            </Stack>
            <Card>
              <CustomerListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
                activeUsers={activeUsers}
                blockedUsers={blockedUsers}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                setSearchResults={setSearchResults}
              />
              <CustomerListTable
                customers={
                  searchResults.length > 0 ? searchResults :
                  currentTab === "all"
                    ? customers
                    : currentTab === "hasAcceptedMarketing"
                    ? activeUsers
                    : currentTab === "isProspect"
                    ? blockedUsers
                    : customers
                }
                customersCount={searchResults.length > 0 ? searchResults.length :
                  currentTab === 'all' ? customersCount : currentTab === 'hasAcceptedMarketing' ? activeUsers.length : currentTab === 'isProspect' ? blockedUsers.length : customersCount}
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

