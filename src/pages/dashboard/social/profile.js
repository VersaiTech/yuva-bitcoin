
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
            <Link color="text.primary"
underline="none"
variant="subtitle2">
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
                <Typography color="text.secondary"
variant="body2">
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
                <Typography color="text.secondary"
variant="body2">
                **************
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Phone</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary"
variant="body2">
                {memberData.contactNo}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Wallet Address</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary"
variant="body2">
                  {memberData.wallet_address}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Twitter Id</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary"
variant="body2">
                {memberData.twitterId}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Stack alignItems="flex-start"
spacing={1}
sx={{ p: 1 }}>
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
