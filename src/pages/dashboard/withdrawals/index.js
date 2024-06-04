// import { useCallback, useEffect, useState } from "react";
// import Head from "next/head";
// import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
// import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
// import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Stack,
//   SvgIcon,
//   Typography,
// } from "@mui/material";
// import { customersApi } from "../../../api/customers";
// import { useMounted } from "../../../hooks/use-mounted";
// import { usePageView } from "../../../hooks/use-page-view";
// import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
// import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";
// import { WithdrawalListSearch } from "../../../sections/dashboard/withdrawals/withdrawals-list-search";
// import { WithdrawalsListTable } from "../../../sections/dashboard/withdrawals/withdrawals-list-table";

// import axios from "axios";
// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
// const useSearch = () => {
//   const [search, setSearch] = useState({
//     filters: {
//       query: undefined,
//       hasAcceptedMarketing: undefined,
//       isProspect: undefined,
//       isReturning: undefined,
//     },
//     page: 0,
//     rowsPerPage: 5,
//     sortBy: "updatedAt",
//     sortDir: "desc",
//   });

//   return {
//     search,
//     updateSearch: setSearch,
//   };
// };

// const useCustomers = (search) => {
//   // console.log(search);
//   const isMounted = useMounted();
//   const [state, setState] = useState({
//     customers: [],
//     rejected: [],
//     completed: [],
//     pending: [],
//     customersCount: 0,
//   });
//   const { page, rowsPerPage } = search;
//   console.log(search);

//   const getCustomers = useCallback(async () => {
//     // const response = await customersApi.getCustomers(search);
//     const token = localStorage.getItem("accessToken");

//     const headers = {
//       Authorization: token,
//     };
//     console.log(search);

//     try {
//       let response = await axios.get(
//         `${BASEURL}/api/Withdraw/getWithdrawRequests/${page + 1}/${rowsPerPage}`,
//         { headers: headers }
//       );

//       console.log(response.data.data);

//       if (isMounted()) {
//         setState((prevState) => ({
//           ...prevState,
//           customers: response.data.data,
//           customersCount: response.count,
//         }));
//       }
//     } catch (err) {
//       setState((prevState) => ({
//         ...prevState,
//         customers: [],
//       }));
//     }
//     try {
//       let rejectedWithdrawals = await axios.get(
//         `${BASEURL}/api/Withdraw/getWithdrawRejected/${page + 1}/${rowsPerPage}`,
//         { headers: headers }
//       );

//       if (isMounted()) {
//         setState((prevState) => ({
//           ...prevState,
//           rejected: rejectedWithdrawals.data.data,
//         }));
//       }
//     } catch (error) {
//       setState((prevState) => ({
//         ...prevState,
//         rejected: [],
//       }));
//     }

//     try {
//       let completedWithdrawals = await axios.get(
//         `${BASEURL}/api/Withdraw/getWithdrawApproved/${page + 1}/${rowsPerPage}`,
//         { headers: headers }
//       );

//       if (isMounted()) {
//         setState((prevState) => ({
//           ...prevState,
//           completed: completedWithdrawals.data.data,
//         }));
//       }

//       console.log(completedWithdrawals.data.data);
//     } catch (error) {
//       setState((prevState) => ({
//         ...prevState,
//         completed: [],
//       }));
//     }

//     try {
//       let PendingWithdrawals = await axios.get(
//         `${BASEURL}/api/Withdraw/getWithdrawPending/${page + 1}/${rowsPerPage}`,
//         { headers: headers }
//       );
//       console.log(PendingWithdrawals.data.data);

//       if (isMounted()) {
//         setState((prevState) => ({
//           ...prevState,
//           // customersCount: response.count,
//           pending: PendingWithdrawals.data.data || [],
//         }));
//       }
//     } catch (error) {
//       setState({
//         ...prevState,
//         pending: [],
//       });
//     }
//     // setState({
//     //   pending: [],
//     //   completed: [],
//     //   rejected: [],
//     //   customers: [],
//     // });
//   }, [search, isMounted]);

//   useEffect(() => {
//     getCustomers();
//   }, [search]);

//   return state;
// };

// const Page = () => {
//   // get url status from query
//   // const urlParams = new URLSearchParams(window.location.search);
//   // const status = urlParams.get("status");

//   const { search, updateSearch } = useSearch();
//   const { customers, customersCount, completed, rejected, pending } =
//     useCustomers(search);

//   const [currentTab, setCurrentTab] = useState("all");

//   usePageView();

//   const handleFiltersChange = useCallback(
//     (filters) => {
//       updateSearch((prevState) => ({
//         ...prevState,
//         filters,
//       }));
//     },
//     [updateSearch]
//   );

//   const handleSortChange = useCallback(
//     (sort) => {
//       updateSearch((prevState) => ({
//         ...prevState,
//         sortBy: sort.sortBy,
//         sortDir: sort.sortDir,
//       }));
//     },
//     [updateSearch]
//   );

//   const handlePageChange = useCallback(
//     (event, page) => {
//       updateSearch((prevState) => ({
//         ...prevState,
//         page,
//       }));
//     },
//     [updateSearch]
//   );

//   const handleRowsPerPageChange = useCallback(
//     (event) => {
//       updateSearch((prevState) => ({
//         ...prevState,
//         rowsPerPage: parseInt(event.target.value, 10),
//       }));
//     },
//     [updateSearch]
//   );

//   return (
//     <>
//       <Head>
//         <title>Dashboard: Withdrawals List | Yuva Bitcoin</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 4,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Stack spacing={4}>
//             <Stack direction="row" justifyContent="space-between" spacing={4}>
//               <Stack spacing={1}>
//                 <Typography variant="h4">All Withdrawals</Typography>
//                 <Stack alignItems="center" direction="row" spacing={1}>
//                   {/* <Button
//                     color="inherit"
//                     size="small"
//                     startIcon={(
//                       <SvgIcon>
//                         <Upload01Icon />
//                       </SvgIcon>
//                     )}
//                   >
//                     Import
//                   </Button>
//                   <Button
//                     color="inherit"
//                     size="small"
//                     startIcon={(
//                       <SvgIcon>
//                         <Download01Icon />
//                       </SvgIcon>
//                     )}
//                   >
//                     Export
//                   </Button> */}
//                 </Stack>
//               </Stack>
//               <Stack alignItems="center" direction="row" spacing={3}>
//                 <Button
//                   startIcon={
//                     <SvgIcon>
//                       <PlusIcon />
//                     </SvgIcon>
//                   }
//                   variant="contained"
//                 >
//                   Add
//                 </Button>
//               </Stack>
//             </Stack>
//             <Card>
//               <WithdrawalListSearch
//                 onFiltersChange={handleFiltersChange}
//                 onSortChange={handleSortChange}
//                 sortBy={search.sortBy}
//                 sortDir={search.sortDir}
//                 completed={completed}
//                 pending={pending}
//                 rejected={rejected}
//                 currentTab={currentTab}
//                 setCurrentTab={setCurrentTab}
//               />
//               <WithdrawalsListTable
//                 // customers={customers}
//                 // customersCount={customersCount}
//                 // customers={currentTab === 'all' ? customers : currentTab === 'pending' ? pending : currentTab === 'hasAcceptedMarketing' ? rejected : currentTab === 'isProspect' ? completed : customers}
//                 // customersCount={currentTab === 'all' ? customersCount : currentTab === 'pending' ? pending.length :  currentTab === 'hasAcceptedMarketing' ? rejected.length : currentTab === 'isProspect' ? completed.length : customersCount}
//                 customers={
//                   currentTab === "all"
//                     ? customers
//                     : currentTab === "pending"
//                     ? pending
//                     : currentTab === "hasAcceptedMarketing"
//                     ? rejected
//                     : currentTab === "isProspect"
//                     ? completed
//                     : []
//                 }
//                 // customersCount={
//                 //   currentTab === 'all' ? customersCount :
//                 //     currentTab === 'pending' ? pending.length :
//                 //       currentTab === 'hasAcceptedMarketing' ? rejected.length :
//                 //         currentTab === 'isProspect' ? completed.length :
//                 //           0
//                 // }
//                 onPageChange={handlePageChange}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 rowsPerPage={search.rowsPerPage}
//                 page={search.page}
//               />
//             </Card>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;

import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, TextField } from "@mui/material";
import axios from "axios";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { WithdrawalListSearch } from "../../../sections/dashboard/withdrawals/withdrawals-list-search";
import { WithdrawalsListTable } from "../../../sections/dashboard/withdrawals/withdrawals-list-table";

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
        fetchData(`/api/Withdraw/getWithdrawRequests/${page + 1}/${rowsPerPage}`),
        fetchData(`/api/Withdraw/getWithdrawRejected/${page + 1}/${rowsPerPage}`),
        fetchData(`/api/Withdraw/getWithdrawApproved/${page + 1}/${rowsPerPage}`),
        fetchData(`/api/Withdraw/getWithdrawPending/${page + 1}/${rowsPerPage}`),
      ];

      const [customers, rejected, completed, pending] = await Promise.all(promises);

      setState({
        customers,
        rejected,
        completed,
        pending,
        customersCount: customers.length,
      });
    };

    fetchDataAndUpdateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return state;
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const { customers: originalCustomers, customersCount: originalCustomersCount, completed, rejected, pending } = useCustomers(search);
  const [currentTab, setCurrentTab] = useState("all");
  const [search2, setSearch2] = useState("");
  const [searchedCustomers, setSearchedCustomers] = useState([]);
  const [searchedCustomersCount, setSearchedCustomersCount] = useState(0);


  const handleSearch = async () => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const headers = { authorization: accessToken };
      const data = { member_name: search2 };
      const response = await axios.post(`${BASEURL}/admin/findMember`, data, { headers });
      setSearchedCustomers(response.data.data || []);
      setSearchedCustomersCount(response.data.data.length);
    } catch (error) {
      console.error("Error searching data: ", error);
    }
  };

  // Function to handle clearing search
  const clearSearch = () => {
    setSearch2("");
    setSearchedCustomers([]);
    setSearchedCustomersCount(0);
  };

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
                <Typography variant="h4">All Withdrawals</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={<SvgIcon><PlusIcon /></SvgIcon>}
                  variant="contained"
                >
                  Add
                </Button>
                <Stack className="form-group d-flex align-items-center">
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
              </Stack>
              </Stack>
            </Stack>
            <Card>
              <WithdrawalListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
                completed={completed}
                pending={pending}
                rejected={rejected}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <WithdrawalsListTable
                customers={search2 ? searchedCustomers : originalCustomers}
                customersCount={search2 ? searchedCustomersCount : originalCustomersCount}
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
