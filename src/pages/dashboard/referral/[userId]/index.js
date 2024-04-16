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
// } from "@mui/material";
// // import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
// import axios from "axios";
// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const ReferralRecordPage = () => {
//   const router = useRouter();
//   const { userId } = router.query; // Extract userId from the URL params
//   const [referralRecord, setReferralRecord] = useState(null); // State to hold the referral record data

//   useEffect(() => {
//     const fetchReferralRecord = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };

//         const response = await axios.get(
//           `${BASEURL}/api/Referral/getUserReferral/${userId}`,
//           {
//             headers: headers,
//           }
//         );
//         setReferralRecord(response.data);
//         console.log(response.data); // Set the fetched referral record data to state
//       } catch (error) {
//         console.error("Error fetching referral record:", error);
//       }
//     };

//     if (userId) {
//       fetchReferralRecord(); // Fetch referral record only when userId is available
//     }
//   }, [userId]); // Re-run effect when userId changes

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   return (
//     <>
//       <Head>
//         <title>Referral Record | Yuva Bitcoin</title>
//       </Head>
//       <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
//         <Container maxWidth="xl">
//           <Stack spacing={4}>
//             <Typography variant="h4">Referral Record</Typography>
//             {referralRecord ? (
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Referral Code</TableCell>
//                       <TableCell>User ID</TableCell>
//                       <TableCell>User Name</TableCell>
//                       <TableCell>Reward Received</TableCell>
//                       <TableCell>Referral User</TableCell>
//                       <TableCell>Referral User Name</TableCell>
//                       <TableCell>Referral Status</TableCell>
//                       <TableCell>Created At</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell>{referralRecord.referral_code}</TableCell>
//                       <TableCell>{referralRecord.user_id}</TableCell>
//                       <TableCell>{referralRecord.user_name}</TableCell>
//                       <TableCell>
//                         {referralRecord.user_earned !== undefined ? (
//                           referralRecord.user_earned > 1 ? (
//                             <Chip label="Received" color="success" />
//                           ) : (
//                             <Chip label="Not Received" color="error" />
//                           )
//                         ) : (
//                           <Chip label="Pending" color="warning" />
//                         )}
//                       </TableCell>
//                       <TableCell>{referralRecord.referral_user}</TableCell>
//                       <TableCell>{referralRecord.referral_user_name}</TableCell>
//                       <TableCell>
//                         {referralRecord.referral_user_isRefered ? (
//                           <Chip label="Success" color="success" />
//                         ) : (
//                           <Chip label="Unsuccessful" color="error" />
//                         )}
//                       </TableCell>
//                       <TableCell>{formatDate(referralRecord.createdAt)}</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <Typography>No referral record found</Typography>
//             )}
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// ReferralRecordPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default ReferralRecordPage;

import { useRouter } from "next/router";
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
import { Layout as DashboardLayout } from "../../../../layouts/dashboard"; // Adjust the import path as per your directory structure
import axios from "axios";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const ReferralRecordPage = () => {
  const router = useRouter();
  const { userId } = router.query; // Extract userId from the URL params
  const [referralRecord, setReferralRecord] = useState(null); // State to hold the referral record data

  useEffect(() => {
    const fetchReferralRecord = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(
          `${BASEURL}/api/Referral/getUserReferral/${userId}`,
          {
            headers: headers,
          }
        );
        setReferralRecord(response.data.referrals);
        console.log(response.data.referrals); // Set the fetched referral record data to state
      } catch (error) {
        console.error("Error fetching referral record:", error);
      }
    };

    if (userId) {
      fetchReferralRecord(); // Fetch referral record only when userId is available
    }
  }, [userId]); // Re-run effect when userId changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Render null if userId is not available yet
  if (!userId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Referral Record | Yuva Bitcoin</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Typography variant="h4">Referral Records - {userId}</Typography>
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
                  {referralRecord && Array.isArray(referralRecord) && referralRecord.length > 0 ? (
                    referralRecord.map((record) => (
                      <TableRow key={record._id}>
                        <TableCell>{record.referral_code}</TableCell>
                        <TableCell>{record.user_id}</TableCell>
                        <TableCell>{record.user_name}</TableCell>
                        <TableCell>
                          {record.user_earned !== undefined ? (
                            record.user_earned > 1 ? (
                              <Chip label="Received" color="success" />
                            ) : (
                              <Chip label="Not Received" color="error" />
                            )
                          ) : (
                            <Chip label="Pending" color="warning" />
                          )}
                        </TableCell>
                        <TableCell>{record.referral_user}</TableCell>
                        <TableCell>{record.referral_user_name}</TableCell>
                        <TableCell>
                          {record.referral_user_isRefered ? (
                            <Chip label="Success" color="success" />
                          ) : (
                            <Chip label="Unsuccessful" color="error" />
                          )}
                        </TableCell>
                        <TableCell>{formatDate(record.createdAt)}</TableCell>
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

ReferralRecordPage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ReferralRecordPage;
