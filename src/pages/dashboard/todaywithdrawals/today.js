

import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, TextField } from "@mui/material";
import axios from "axios";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { TodayWithdrawalsListSearch } from "../../../sections/dashboard/todaywithdrawal/today-withdrawals-list-search";
import { TodayWithdrawalsListTable } from "../../../sections/dashboard/todaywithdrawal/today-withdrawals-list-table";


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
  const [state, setState] = useState({
    customers: [],
    rejected: [],
    completed: [],
    pending: [],
    customersCount: 0,
  });

  const { page, rowsPerPage } = search;




  const fetchData = async (endpoint) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: token };
      const response = await axios.get(`${BASEURL}${endpoint}`, { headers });
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      const promises = [
        // fetchData(`/api/Withdraw/getWithdrawRequests/${page + 1}/${rowsPerPage}`),
        fetchData(`/admin/withdrawRToday/${page + 1}/${rowsPerPage}`),
        fetchData(`/admin/withdrawSToday/${page + 1}/${rowsPerPage}`),
        fetchData(`/admin/withdrawPToday/${page + 1}/${rowsPerPage}`),
      ];

      const [ rejected, completed, pending] = await Promise.all(promises);

      setState({
        
        rejected,
        completed,
        pending,
        customersCount: rejected.length,
      });
    };

    fetchDataAndUpdateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return state;
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const {  customersCount, completed, rejected, pending } = useCustomers(search);
  const [currentTab, setCurrentTab] = useState("pending");
  // const [search2, setSearch2] = useState("");
  // const [searchedCustomers, setSearchedCustomers] = useState([]);
  // const [searchedCustomersCount, setSearchedCustomersCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);



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
        <title>Dashboard: Withdrawals List | Yuva Bitcoin</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">All Today Withdrawals</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                {/* <Button
                  startIcon={<SvgIcon><PlusIcon /></SvgIcon>}
                  variant="contained"
                >
                  Add
                </Button> */}
                {/* <Stack className="form-group d-flex align-items-center">
                <TextField
                  type="text"
                  label="Type to search..."
                  value={search2}
                  onChange={(e) => setSearch2(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  sx={{ ml: 1, height: "54px" }}
                >
                  Search
                </Button>
                {search2 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearSearch}
                    sx={{ ml: 1, height: "54px" }}
                  >
                    Clear
                  </Button>
                )}
              </Stack> */}
              </Stack>
            </Stack>
            <Card>
              <TodayWithdrawalsListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
                completed={completed}
                pending={pending}
                rejected={rejected}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                setSearchResults={setSearchResults}
              />
              <TodayWithdrawalsListTable
                customers={
                  searchResults.length > 0 ? searchResults :
                  currentTab === "pending"
                    ? pending
                    : currentTab === "hasAcceptedMarketing"
                    ? rejected
                    : currentTab === "isProspect"
                    ? completed
                    : []
                }
                customersCount={searchResults.length > 0 ? searchResults.length : currentTab === "all" ? customersCount :  currentTab === "pending" ? pending.length :  currentTab === "hasAcceptedMarketing" ? rejected.length : currentTab === "isProspect" ? completed.length : customersCount}
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
