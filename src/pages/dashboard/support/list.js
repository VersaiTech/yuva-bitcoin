// import { formatDistanceStrict, subHours, subMinutes } from 'date-fns';
// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardHeader,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Typography
// } from '@mui/material';
// import { customLocale } from '../../../utils/date-locale';
// import { useMounted } from '../../../hooks/use-mounted';
// import { useCallback, useEffect, useState } from 'react';

// const now = new Date();

// const messages = [
//   {
//     id: 'b91cbe81ee3efefba6b915a7',
//     content: 'Hello, we spoke earlier on the phone',
//     createdAt: subMinutes(now, 2).getTime(),
//     senderAvatar: '/assets/avatars/avatar-alcides-antonio.png',
//     senderName: 'Alcides Antonio',
//     senderOnline: true
//   },
//   {
//     id: 'de0eb1ac517aae1aa57c0b7e',
//     content: 'Is the job still available?',
//     createdAt: subMinutes(now, 56).getTime(),
//     senderAvatar: '/assets/avatars/avatar-marcus-finn.png',
//     senderName: 'Marcus Finn',
//     senderOnline: true
//   },
//   {
//     id: '38e2b0942c90d0ad724e6f40',
//     content: 'What is a screening task? I’d like to',
//     createdAt: subHours(subMinutes(now, 23), 3).getTime(),
//     senderAvatar: '/assets/avatars/avatar-carson-darrin.png',
//     senderName: 'Carson Darrin',
//     senderOnline: false
//   },
//   {
//     id: '467505f3356f25a69f4c4890',
//     content: 'Still waiting for feedback',
//     createdAt: subHours(subMinutes(now, 6), 8).getTime(),
//     senderAvatar: '/assets/avatars/avatar-fran-perez.png',
//     senderName: 'Fran Perez',
//     senderOnline: true
//   },
//   {
//     id: '7e6af808e801a8361ce4cf8b',
//     content: 'Need more information about current campaigns',
//     createdAt: subHours(subMinutes(now, 18), 10).getTime(),
//     senderAvatar: '/assets/avatars/avatar-jie-yan-song.png',
//     senderName: 'Jie Yan Song',
//     senderOnline: false
//   }
// ];

// const useSupport = () => {
//   const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//   const isMounted = useMounted();
//   const [support, setSupport] = useState([]);
//   console.log("Support :", support);

// const getSupport = useCallback(async () => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
//     const headers = {
//       Authorization: token,
//     };
    
//     console.log("Token:", token);
//     console.log("Headers:", headers);

    // const response = await axios.get(`${BASEURL}/api/Support/getAllSupport/:page_number?/:count?`, { 
    //   headers: headers,
    // });
    
//     console.log("Response from API:", response.data);

//     if (isMounted()) {
//       // Assuming the response data is an array of blog posts
//       setSupport(response.data); // Adjust based on actual data structure
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }, [isMounted]);


// useEffect(() => {
//   getSupport();
// }, [getSupport]);

// return support;
// };

// export const SupportList = () => {
//   const support = useSupport();
//   return (
//     <>
//     <h1>{support}</h1>
//   <h1>Hello</h1>
//   </>
//   )
// };
// export default SupportList;




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
          queriesCount: response.count,
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
  }, [search, isMounted]);

  useEffect(() => {
    getQueries();
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
           {/*   <CustomerListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
                activeUsers={activeUsers}
                blockedUsers={blockedUsers}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
      */}
         {/*     <CustomerListTable
                // customers={customers}
                // customersCount={customersCount}
                customersCount={0}
                customers={
                  currentTab === "all"
                    ? customers
                    : currentTab === "hasAcceptedMarketing"
                    ? activeUsers
                    : currentTab === "isProspect"
                    ? blockedUsers
                    : customers
                }
                // customersCount={currentTab === 'all' ? customersCount : currentTab === 'hasAcceptedMarketing' ? activeUsers.length : currentTab === 'isProspect' ? blockedUsers.length : customersCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
              />
            */}
            <QueriesListTable 
            queries={queries}
            queriesCount={0}
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
