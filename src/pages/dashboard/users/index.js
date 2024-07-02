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
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";
import UserDrawer from "./userDrawer/UserDrawer";

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
    activeUsersCount: 0,
    blockedUsersCount: 0,
    registeredTodayCount: 0,
    activeUsers: [],
    blockedUsers: [],
    registeredToday: [],
  });
  const { page, rowsPerPage } = search;
  console.log(search);

  const getCustomers = useCallback(async () => {
    try {
      console.log("called api");
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: token,
      };

      let response = await axios.get(`${BASEURL}/admin/getAllMembers/${page + 1}/${rowsPerPage}`, {
        headers: headers,
      });

      console.log("The users are ",response);
      let activeUsersResponse = await axios.get(
        `${BASEURL}/admin/getActiveMembers/${page + 1}/${rowsPerPage}`,
        { headers: headers }
      );

      let blockedUsersResponse = await axios.get(
        `${BASEURL}/admin/getBlockedMembers/${page + 1}/${rowsPerPage}`,
        { headers: headers }
      );

      let registeredTodayResponse = await axios.get(
        `${BASEURL}/admin/registeredToday`,
        { headers: headers }

      );

      console.log(response.data);
      console.log(activeUsersResponse.data);
      console.log(blockedUsersResponse.data);
      console.log(registeredTodayResponse.data.data);

      if (!response) response = [];
      if (!activeUsersResponse) activeUsersResponse = [];
      if (!blockedUsersResponse) blockedUsersResponse = [];
      if (!registeredTodayResponse) registeredTodayResponse = [];

      console.log(activeUsersResponse);
      if (isMounted()) {
        setState({
          customers: response.data.members,
          customersCount: response.data.count,
          activeUsersCount: activeUsersResponse.data.count,
          blockedUsersCount: blockedUsersResponse.data.count,
          registeredTodayCount: registeredTodayResponse.data.count,
          activeUsers: activeUsersResponse.data.members,
          blockedUsers: blockedUsersResponse.data.members,
          registeredToday: registeredTodayResponse.data.data,
        });

        console.log(blockedUsersResponse.data.members);
        console.log(response.data.members);
      }
    } catch (err) {
      setState({
        customers: [],
        customersCount: 0,
        activeUsers: [],
        blockedUsers: [],
        registeredToday: [],
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
  const { customers, customersCount, activeUsers, blockedUsers, registeredToday, activeUsersCount, blockedUsersCount, registeredTodayCount } = useCustomers(search);
  const [currentTab, setCurrentTab] = useState("all");
  const [drawer, setDrawer] = useState({ isOpen: false, user: null });
  const [searchResults, setSearchResults] = useState([]);
  const [allCustomers,setAllCustomers] = useState(null)
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

  const handleRowClick = (user) => {
    setDrawer({
      isOpen: true,
      user,
    });
  };

  const handleDrawerClose = () => {
    setDrawer({
      isOpen: false,
      user: null,
    });
  };


  const getCurrentTabData = () => {
    switch (currentTab) {
      case "all":
        return { data: customers, count: customersCount };
      case "hasAcceptedMarketing":
        return { data: activeUsers, count: activeUsersCount };
      case "isProspect":
        return { data: blockedUsers, count: blockedUsersCount };
      case "registeredToday":
        return { data: registeredToday, count: registeredTodayCount };
      default:
        return { data: customers, count: customersCount };
    }
  };

  const { data, count } = getCurrentTabData();

  const getAllCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: token,
      };

      const response = await axios.get(`${BASEURL}/admin/getAllMembers/1/100000`, {
        headers: headers,
      });
      console.log("All customers are ",response.data.members)

      setAllCustomers(response.data.members);
    } catch (err) {
      console.error("Error fetching all customers: ", err);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);


  return (
    <>
      <Head>
        <title>Dashboard: Users List | Yuva Bitcoin</title>
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
                registeredToday={registeredToday}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab} 
                setSearchResults={setSearchResults}
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
                allCustomers={allCustomers}
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
                    : currentTab === "registeredToday"
                    ? registeredToday
                    : customers
                    
                }
                customersCount={searchResults.length > 0 ? searchResults.length :
                  currentTab === 'all' ? customersCount : currentTab === 'hasAcceptedMarketing' ? activeUsersCount : currentTab === 'isProspect' ? blockedUsersCount : currentTab === 'isRegisteredToday' ? registeredTodayCount : customersCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
                onRowClick={handleRowClick}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <UserDrawer
        open={drawer.isOpen}
        onClose={handleDrawerClose}
        user={drawer.user}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
