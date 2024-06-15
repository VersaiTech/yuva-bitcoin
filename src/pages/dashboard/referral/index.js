
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { useMounted } from "../../../hooks/use-mounted";
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

const useReferrals = (search) => {
  const isMounted = useMounted();
  const [referrals, setReferrals] = useState({
    referrals: [],
    referralsCount: 0,
  });

  const { page, rowsPerPage } = search;

  const fetchReferrals = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${BASEURL}/api/Referral/getAllReferral/${page + 1}/${rowsPerPage}`,
        {
          headers: headers,
        }
      );

      console.log(response.data);

      if (isMounted()) {
        setReferrals({
          referrals: response.data.referrals || [],
          referralsCount: response.data.totalReferral,
          // activeUsers: activeUsersResponse.data.members,
          // blockedUsers: blockedUsersResponse.data.members,
        });
      }
      // setReferrals(response.data.referrals);
    } catch (error) {
      console.error("Error fetching referrals:", error);
    }

    // fetchReferrals();
  }, [search, isMounted]);

  useEffect(() => {
    fetchReferrals();
  }, [search]);

  return referrals;
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const { referrals, referralsCount } = useReferrals(search);
  const router = useRouter();
  // const referrals = useReferrals();

  // const handleReferralClick = (userId) => {
  //   router.push(`/dashboard/referral/${userId}`);
  // };

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

  // useEffect(() => {}, [currentTab]);

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
        <title>Dashboard: Referral History | Yuva Bitcoin</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Typography variant="h4">Referral History</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Referral Code</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Reward Received</TableCell>
                    <TableCell>Referral User</TableCell>
                    <TableCell>Referral User Name</TableCell>
                    <TableCell>Referral Status</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referrals.length > 0 ? (
                    referrals.map((referral) => (
                      <TableRow
                        key={referral._id}
                        onClick={() => handleReferralClick(referral.user_id)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{referral.referral_code}</TableCell>
                        <TableCell>{referral.user_id}</TableCell>
                        <TableCell>{referral.user_name}</TableCell>
                        <TableCell>
                          {referral.user_earned !== undefined ? (
                            referral.user_earned > 1 ? (
                              <Chip label="Received" color="success" />
                            ) : (
                              <Chip label="Not Received" color="error" />
                            )
                          ) : (
                            <Chip label="Pending" color="warning" />
                          )}
                        </TableCell>
                        <TableCell>{referral.referral_user}</TableCell>
                        <TableCell
                          onClick={(event) => event.stopPropagation()}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            {referral.referral_user_name.charAt(0).toUpperCase() +
                              referral.referral_user_name.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {referral.referral_user_isRefered ? (
                            <Chip label="Success" color="success" />
                          ) : (
                            <Chip label="Unsuccessful" color="error" />
                          )}
                        </TableCell>
                        <TableCell>{formatDate(referral.createdAt)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No referrals found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={referralsCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                rowsPerPage={search.rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableContainer>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;


// import { useRouter } from 'next/router';
// import { useEffect, useState } from "react";
// import Head from "next/head";
// import {
//   Box,
//   Container,
//   Stack,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   TablePagination,
// } from "@mui/material";
// import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import axios from "axios";
// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const useReferrals = (page, rowsPerPage) => {
//   const [state, setState] = useState({
//     referrals: [],
//     referralsCount: 0,
//   });

//   useEffect(() => {
//     const fetchReferrals = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };

//         const response = await axios.get(
//           `${BASEURL}/api/Referral/getAllReferral`,
//           {
//             headers: headers,
//             params: {
//               page: page + 1,
//               limit: rowsPerPage,
//             },
//           }
//         );

//         console.log(response.data);

//         setState({
//           referrals: response.data.referrals,
//           referralsCount: response.data.referrals.length,
//         });
//       } catch (error) {
//         console.error("Error fetching referrals:", error);
//       }
//     };

//     fetchReferrals();
//   }, [page, rowsPerPage]);

//   return state;
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   return date.toLocaleDateString(undefined, options);
// };

// const Page = () => {
//   const router = useRouter();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const { referrals, referralsCount } = useReferrals(page, rowsPerPage);

//   // const handleReferralClick = (userId) => {
//   //   router.push(`/dashboard/referral/${userId}`);
//   // };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <>
//       <Head>
//         <title>Dashboard: Referral History | Yuva Bitcoin</title>
//       </Head>
//       <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
//         <Container maxWidth="xl">
//           <Stack spacing={4}>
//             <Typography variant="h4">Referral History</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Referral Code</TableCell>
//                     <TableCell>User ID</TableCell>
//                     <TableCell>User Name</TableCell>
//                     <TableCell>Reward Received</TableCell>
//                     <TableCell>Referral User</TableCell>
//                     <TableCell>Referral User Name</TableCell>
//                     <TableCell>Referral Status</TableCell>
//                     <TableCell>Created At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {referrals.length > 0 ? (
//                     referrals.map((referral) => (
//                       <TableRow
//                         key={referral._id}
//                         onClick={() => handleReferralClick(referral.user_id)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         <TableCell>{referral.referral_code}</TableCell>
//                         <TableCell>{referral.user_id}</TableCell>
//                         <TableCell>{referral.user_name}</TableCell>
//                         <TableCell>
//                           {referral.user_earned !== undefined ? (
//                             referral.user_earned > 1 ? (
//                               <Chip label="Received" color="success" />
//                             ) : (
//                               <Chip label="Not Received" color="error" />
//                             )
//                           ) : (
//                             <Chip label="Pending" color="warning" />
//                           )}
//                         </TableCell>
//                         <TableCell>{referral.referral_user}</TableCell>
//                         <TableCell
//                           onClick={(event) => event.stopPropagation()}
//                         >
//                           <span
//                             style={{
//                               fontWeight: "bold",
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             {referral.referral_user_name.charAt(0).toUpperCase() +
//                               referral.referral_user_name.slice(1)}
//                           </span>
//                         </TableCell>
//                         <TableCell>
//                           {referral.referral_user_isRefered ? (
//                             <Chip label="Success" color="success" />
//                           ) : (
//                             <Chip label="Unsuccessful" color="error" />
//                           )}
//                         </TableCell>
//                         <TableCell>{formatDate(referral.createdAt)}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={8} align="center">
//                         No referrals found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//               <TablePagination
//                 component="div"
//                 count={referralsCount}
//                 page={page}
//                 onPageChange={handlePageChange}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//               />
//             </TableContainer>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;
