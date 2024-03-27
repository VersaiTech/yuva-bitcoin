// import { useCallback, useEffect, useState } from 'react';
// import NextLink from 'next/link';
// import Head from 'next/head';
// import MessageChatSquareIcon from '@untitled-ui/icons-react/build/esm/MessageChatSquare';
// import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
// import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
// import UserPlus02Icon from '@untitled-ui/icons-react/build/esm/UserPlus02';
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Divider,
//   IconButton,
//   Stack,
//   SvgIcon,
//   Tab,
//   Tabs,
//   Tooltip,
//   Typography
// } from '@mui/material';
// import { blueGrey } from '@mui/material/colors';
// import { socialApi } from '../../../api/social';
// import { useMounted } from '../../../hooks/use-mounted';
// import { usePageView } from '../../../hooks/use-page-view';
// import { Layout as DashboardLayout } from '../../../layouts/dashboard';
// import { paths } from '../../../paths';
// import { SocialConnections } from '../../../sections/dashboard/social/social-connections';
// import { SocialTimeline } from '../../../sections/dashboard/social/social-timeline';

// const tabs = [
//   { label: 'Timeline', value: 'timeline' },
//   { label: 'Connections', value: 'connections' }
// ];

// const useProfile = () => {
//   const isMounted = useMounted();
//   const [profile, setProfile] = useState(null);

//   const getProfile = useCallback(async () => {
//     try {
//       const response = await socialApi.getProfile();

//       if (isMounted()) {
//         setProfile(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);

//   useEffect(() => {
//       getProfile();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []);

//   return profile;
// };

// const usePosts = () => {
//   const isMounted = useMounted();
//   const [posts, setPosts] = useState([]);

//   const getPosts = useCallback(async () => {
//     try {
//       const response = await socialApi.getPosts();

//       if (isMounted()) {
//         setPosts(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);

//   useEffect(() => {
//       getPosts();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []);

//   return posts;
// };

// const useConnections = (search = '') => {
//   const [connections, setConnections] = useState([]);
//   const isMounted = useMounted();

//   const getConnections = useCallback(async () => {
//     const response = await socialApi.getConnections();

//     if (isMounted()) {
//       setConnections(response);
//     }
//   }, [isMounted]);

//   useEffect(() => {
//       getConnections();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [search]);

//   return connections.filter((connection) => {
//     return connection.name?.toLowerCase().includes(search);
//   });
// };

// export const SocialProfile = () => {
//   const profile = useProfile();
//   const [currentTab, setCurrentTab] = useState('timeline');
//   const [status, setStatus] = useState('not_connected');
//   const posts = usePosts();
//   const [connectionsQuery, setConnectionsQuery] = useState('');
//   const connections = useConnections(connectionsQuery);

//   usePageView();

//   const handleConnectionAdd = useCallback(() => {
//     setStatus('pending');
//   }, []);

//   const handleConnectionRemove = useCallback(() => {
//     setStatus('not_connected');
//   }, []);

//   const handleTabsChange = useCallback((event, value) => {
//     setCurrentTab(value);
//   }, []);

//   const handleConnectionsQueryChange = useCallback((event) => {
//     setConnectionsQuery(event.target.value);
//   }, []);

//   if (!profile) {
//     return null;
//   }

//   const showConnect = status === 'not_connected';
//   const showPending = status === 'pending';

//   return (
//     <>
//       <Head>
//         <title>
//           Dashboard: Social Profile | YuvaBitcoin
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 4
//         }}
//       >
//         <Container maxWidth="lg">
//           <div>

//             <Stack
//               alignItems="center"
//               direction="row"
//               spacing={2}
//               sx={{ mt: 5 }}
//             >
//               <Stack
//                 alignItems="center"
//                 direction="row"
//                 spacing={2}
//               >
//                 <Avatar
//                   src={profile.avatar}
//                   sx={{
//                     height: 64,
//                     width: 64
//                   }}
//                 />
//                 <div>
//                   <Typography
//                     color="text.secondary"
//                     variant="overline"
//                   >
//                     {profile.bio}
//                   </Typography>
//                   <Typography variant="h6">
//                     {profile.name}
//                   </Typography>
//                 </div>
//               </Stack>
//               <Box sx={{ flexGrow: 1 }} />
//               <Stack
//                 alignItems="center"
//                 direction="row"
//                 spacing={2}
//                 sx={{
//                   display: {
//                     md: 'block',
//                     xs: 'none'
//                   }
//                 }}
//               >
//                 {showConnect && (
//                   <Button
//                     onClick={handleConnectionAdd}
//                     size="small"
//                     startIcon={(
//                       <SvgIcon>
//                         <UserPlus02Icon />
//                       </SvgIcon>
//                     )}
//                     variant="outlined"
//                   >
//                     Connect
//                   </Button>
//                 )}
//                 {showPending && (
//                   <Button
//                     color="primary"
//                     onClick={handleConnectionRemove}
//                     size="small"
//                     variant="outlined"
//                   >
//                     Pending
//                   </Button>
//                 )}
//                 <Button
//                   component={NextLink}
//                   href={paths.dashboard.chat}
//                   size="small"
//                   startIcon={(
//                     <SvgIcon>
//                       <MessageChatSquareIcon />
//                     </SvgIcon>
//                   )}
//                   variant="contained"
//                 >
//                   Send Message
//                 </Button>
//               </Stack>
//               <Tooltip title="More options">
//                 <IconButton>
//                   <SvgIcon>
//                     <DotsHorizontalIcon />
//                   </SvgIcon>
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           </div>
//           <Tabs
//             indicatorColor="primary"
//             onChange={handleTabsChange}
//             scrollButtons="auto"
//             sx={{ mt: 5 }}
//             textColor="primary"
//             value={currentTab}
//             variant="scrollable"
//           >
//             {tabs.map((tab) => (
//               <Tab
//                 key={tab.value}
//                 label={tab.label}
//                 value={tab.value}
//               />
//             ))}
//           </Tabs>
//           <Divider />
//           <Box sx={{ mt: 3 }}>
//             {currentTab === 'timeline' && (
//               <SocialTimeline
//                 posts={posts}
//                 profile={profile}
//               />
//             )}
//             {currentTab === 'connections' && (
//               <SocialConnections
//                 connections={connections}
//                 onQueryChange={handleConnectionsQueryChange}
//                 query={connectionsQuery}
//               />
//             )}
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// SocialProfile.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default SocialProfile;

import {
  Box,
  Avatar,
  Link,
  Button,
  Card,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Lock01Icon from "@untitled-ui/icons-react/build/esm/Lock01";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../../../hooks/use-mounted";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { Modal1 } from "../../../sections/components/modals/modal-1";
import  axios from 'axios';
import { SeverityPill } from "../../../components/severity-pill";

const useProfile = () => {
  const isMounted = useMounted();
  const [memberData, setMemberData] = useState(null);

  const getMemberDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
      const headers = {
        Authorization: token,
      };

      console.log('Token:', token);
      console.log('Headers:', headers);
      
      const response = await axios.get(`${BASEURL}/admin/getMemberDetails`, {
        headers: headers,
      });

      console.log('Response from API:', response.data);
      setMemberData(response.data.member); // Assuming the response contains member details
    } catch (err) {
      console.error('Error fetching member details:', err);
    }
  }, []);

  useEffect(() => {
    getMemberDetails();
  }, [getMemberDetails]);


  return memberData;;
};

export const SocialProfile = () => {
  const memberData = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    // Handle the click event here
    console.log("Button clicked!");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      {memberData? (
        <Card>
        <CardHeader
          avatar={<Avatar src="/assets/avatars/avatar-omar-darboe.png" />}
          disableTypography
          subheader={
            <Link color="text.primary" underline="none" variant="subtitle2">
              {memberData.member_name}
            </Link>
          }
          style={{ paddingBottom: 0 }}
          title={
            <Typography
              color="text.secondary"
              sx={{ display: "block" }}
              variant="overline"
            >
              User Details
            </Typography>
          }
        />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                {memberData.email}
                </Typography>
                <SeverityPill color="success">Email verified</SeverityPill>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Password</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                **************
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Phone</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                {memberData.contactNo}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Wallet Address</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {memberData.wallet_address}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Twitter Id</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                {memberData.twitterId}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Stack alignItems="flex-start" spacing={1} sx={{ p: 1 }}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon>
                <Lock01Icon />
              </SvgIcon>
            }
          >
            Delete Account
          </Button>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon>
                <User01Icon />
              </SvgIcon>
            }
            onClick={handleClick}
          >
            Edit Profile
          </Button>
        </Stack>
        {isModalOpen && ( 
          <Modal1
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            memberData={memberData}
          />
        )}
      </Card>
      ): (
        // Render a placeholder or loading state when memberData is null
        <Typography>Loading...</Typography>
      )}


    </Box>
  );
};
SocialProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SocialProfile;
