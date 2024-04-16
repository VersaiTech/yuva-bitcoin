

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
// } from "@mui/material";
// import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import axios from "axios";
// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const useReferrals = () => {
//   const [referrals, setReferrals] = useState([]);

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
//           }
//         );
//         setReferrals(response.data.referrals);
//       } catch (error) {
//         console.error("Error fetching referrals:", error);
//       }
//     };

//     fetchReferrals();
//   }, []);

//   return referrals;
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   return date.toLocaleDateString(undefined, options);
// };

// const Page = () => {
//   const referrals = useReferrals();

//   return (
//     <>
//       <Head>
//         <title>Dashboard: Referral History | Yuva Bitcoin</title>
//       </Head>
//       <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
//         <Container maxWidth="xl">
//           <Stack spacing={4}>
//             <Typography variant="h4" gutterBottom>
//               Referral History
//             </Typography>
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
//                       <TableRow key={referral._id}>
//                         <TableCell>{referral.referral_code}</TableCell>
//                         <TableCell>{referral.user_id}</TableCell>
//                         <TableCell>{referral.user_name}</TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
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
//                         <TableCell>
//                           <span
//                             style={{
//                               fontWeight: "bold",
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             {referral.referral_user_name
//                               .charAt(0)
//                               .toUpperCase() +
//                               referral.referral_user_name.slice(1)}
//                           </span>
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center" }}>
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
//             </TableContainer>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;




import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
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
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import axios from "axios";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useReferrals = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(
          `${BASEURL}/api/Referral/getAllReferral`,
          {
            headers: headers,
          }
        );
        setReferrals(response.data.referrals);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    fetchReferrals();
  }, []);

  return referrals;
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const Page = () => {
  const router = useRouter();
  const referrals = useReferrals();

  const handleReferralClick = (userId) => {
    router.push(`/dashboard/referral/${userId}`);
  };

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
            </TableContainer>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
