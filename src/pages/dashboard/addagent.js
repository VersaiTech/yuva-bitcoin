import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NextLink from "next/link";
import { Box, Button, Card, Container, Stack, SvgIcon, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import { paths } from "../../paths";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { usePageView } from "../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import OrderForm from "./agent/create";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const [openForm, setOpenForm] = useState(false);
  const [agent, setAgent] = useState([]);
  const { user } = useAuth();

  const Addagent = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: token,
    };

    const response = await axios.get(`${BASEURL}/api/Auth/getAllAgent`, { headers: headers });

    console.log(response.data.data);
    setAgent(response.data.data);
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

  const handleStatusChange = (agentId) => {
    console.log(`Agent with ID ${agentId} status changed`);
    // Implement drawer opening logic here
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agent.map((ag) => (
                      <TableRow key={ag.id}>
                        <TableCell>{ag.admin_user_id}</TableCell>
                        <TableCell>{ag.admin_name}</TableCell>
                        <TableCell>{ag.email}</TableCell>
                        <TableCell>
                          <Switch
                            checked={ag.isActive}
                            onChange={() => handleStatusChange(ag.isActive)}
                          />
                        </TableCell>
                        <TableCell>{new Date(ag.registration_date).toLocaleDateString()}</TableCell>
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
