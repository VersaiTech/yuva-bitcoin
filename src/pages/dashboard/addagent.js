import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import { paths } from "../../paths";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
// import { customersApi } from "../../../api/customers";
// import { useMounted } from "../../hooks/use-mounted";
import { useMounted } from "../../hooks/use-mounted";
// import { usePageView } from "../../../hooks/use-page-view";
import { usePageView } from "../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import axios from "axios";
import OrderForm from "./agent/create";
// import { customer, customers } from "../../../api/customers/data";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;




const Page = () => {
  const [openForm , setOpenForm] = useState(false);
  

  // usePageView();

  const handleAddagent = () => { 
    setOpenForm(true);};

  const handleformclose = () => {
    setOpenForm(false);
  }  


 
  return (
    <>
      <Head>
        <title>Dashboard: Task List | Yuva Bitcoin</title>
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Agent Contorl</Typography>
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
            <OrderForm 
            open={openForm}
            handleClose={handleformclose}
            />
           
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
