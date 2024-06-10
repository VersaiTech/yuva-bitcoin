import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Box, Button, Card, Container, Stack, SvgIcon, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from "@mui/material";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { useAuth } from "../../hooks/use-auth";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import OrderForm from "./agent/create";
import { useSnackbar } from "notistack";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const PermissionsModal = ({ open, onClose, adminUserId }) => {
  const [permissions, setPermissions] = useState({
    setCoinValueMarketUsdt: false,
    setMinimumAmountMarketUsdt: false,
    setCoinValueMarketYUVA: false,
    setMinimumAmountMarketYUVA: false,
    setMinimumWithdrawal: false,
    setMaximumWithdrawal: false,
    setRegisterCoinValue: false,
    setReferralCoinValue: false,
    setStakeMonth1: false,
    setStakeMonth2: false,
    setStakeMonth3: false,
    setStakePercent1: false,
    setStakePercent2: false,
    setStakePercent3: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    try {
      await axios.post(
        `${BASEURL}/api/Permission/grantPermission`,
        { admin_user_id: adminUserId, ...permissions },
        { headers }
      );
      enqueueSnackbar("Permissions updated successfully", { variant: "success" });
      onClose();
    } catch (error) {
      enqueueSnackbar("Failed to update permissions", { variant: "error" });
      console.error("Failed to update permissions", error.response?.data || error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set Permission</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            {Object.keys(permissions).map((key, index) => (
              <TableRow key={index}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Switch
                    checked={permissions[key]}
                    onChange={handleSwitchChange}
                    name={key}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Apply Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Page = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
  const [selectedAdminUserId, setSelectedAdminUserId] = useState(null);
  const [agent, setAgent] = useState([]);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const Addagent = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
    };

    try {
      const response = await axios.get(`${BASEURL}/api/Auth/getAllAgent`, { headers: headers });
      setAgent(response.data.data);
      enqueueSnackbar("Agents fetched successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to fetch agents", { variant: "error" });
      console.error("Failed to fetch agents", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    Addagent();
  }, []);

  const handleAddagent = () => {
    setOpenForm(true);
  };

  const handleformclose = () => {
    setOpenForm(false);
  };

  const handleStatusChange = async (admin_user_id, currentStatus) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    try {
      await axios.post(
        `${BASEURL}/api/Permission/agentHandler/${admin_user_id}`,
        { isActive: !currentStatus }, // Send the toggled status
        { headers: headers }
      );
      setAgent((prevAgent) =>
        prevAgent.map((ag) =>
          ag.admin_user_id === admin_user_id ? { ...ag, isActive: !currentStatus } : ag
        )
      );
      enqueueSnackbar("Agent status updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to update agent status", { variant: "error" });
      console.error("Failed to update agent status", error.response?.data || error.message);
    }
  };

  const handleOpenPermissionsModal = (admin_user_id) => {
    setSelectedAdminUserId(admin_user_id);
    setOpenPermissionsModal(true);
  };

  const handleClosePermissionsModal = () => {
    setOpenPermissionsModal(false);
    setSelectedAdminUserId(null);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Task List | Yuva Bitcoin</title>
      </Head>
      {user?.data?.data?.userType === "admin" ? (
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Container maxWidth="xl">
            <Stack spacing={4}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Agent Control</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}></Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleAddagent}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      "&:hover::after": {
                        content: '""',
                        position: "absolute",
                        zIndex: 1,
                        top: "50%",
                        left: "50%",
                        width: "300%",
                        height: "300%",
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "50%",
                        transition: "all 0.6s ease",
                        transform: "translate(-50%, -50%)",
                      },
                    }}
                  >
                    Add agent
                  </Button>
                </Stack>
              </Stack>
              <OrderForm open={openForm} handleClose={handleformclose} />
              <Card>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Agent Id</TableCell>
                      <TableCell>Agent Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Registration Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agent.map((ag) => (
                      <TableRow key={ag.admin_user_id}>
                        <TableCell>{ag.admin_user_id}</TableCell>
                        <TableCell>{ag.admin_name}</TableCell>
                        <TableCell>{ag.email}</TableCell>
                        <TableCell>
                          <Switch
                            checked={ag.isActive}
                            onChange={() => handleStatusChange(ag.admin_user_id, ag.isActive)}
                          />
                        </TableCell>
                        <TableCell>{new Date(ag.registration_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleOpenPermissionsModal(ag.admin_user_id)}>Set Permissions</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Stack>
          </Container>
        </Box>
      ) : (
          
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          You are not an admin
        </Typography>
      )}
      <PermissionsModal
        open={openPermissionsModal}
        onClose={handleClosePermissionsModal}
        adminUserId={selectedAdminUserId}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
