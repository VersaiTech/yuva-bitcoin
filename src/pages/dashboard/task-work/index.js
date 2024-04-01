import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { paths } from "../../../paths";
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
import axios from "axios";
import { WorkTaskSearch } from "../../../sections/dashboard/work-task/work-task-list-search";
import { WorkListTable } from "../../../sections/dashboard/work-task/work-task-list-table";
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
  const isMounted = useMounted();
  const [state, setState] = useState({
    customers: [],
    customersCount: 0,
  });

  const getCustomers = useCallback(async () => {
    try {
      // const response = await customersApi.getCustomers(search);
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: token,
      };

      const PendingTasks = await axios.get(`${BASEURL}/admin/getPendingTasks`, {
        headers: headers,
      });

      const completedTasks = await axios.get(
        `${BASEURL}/admin/getCompletedTasks`,
        { headers: headers }
      );
      console.log(PendingTasks.data.tasks);
      console.log(completedTasks.data.tasks);

      if (isMounted()) {
        setState({
          pending: PendingTasks.data.tasks,
          completed: completedTasks.data.tasks,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
    console.log("calling useeffect");
    getCustomers();
  }, []);

  return state;
};

const Page = () => {

  const { search, updateSearch } = useSearch();
  const { completed, rejected, pending } = useCustomers(search);

  const [currentTab, setCurrentTab] = useState('pending');

  const [customersCount, setCustomersCount] = useState(5);

  const [currentData, setCurrentData] = useState([]);

  usePageView();

  useEffect(() => {

    if (search?.filters?.query) {
      setCurrentData(
        currentData?.filter((customer) => {
          return customer.taskName.toLowerCase().includes(search.filters.query);
        })
      );
    }

    // Set current tab with sorted and filtered data
    // setCurrentTab(currentData);
  }, [search]);

  useEffect(() => {
    const data = currentTab === "pending" ? pending : completed;
    setCurrentData(data);
  }, [currentTab, completed, pending]);

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
      console.log(sort.sortBy);
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
                <Typography variant="h4">Approve Task</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  href={paths.dashboard.newtask.create}
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
                  Add Task
                </Button>
              </Stack>
            </Stack>
            <Card>
              <WorkTaskSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
                completed={completed}
                pending={pending}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <WorkListTable
                currentTab = {currentTab}
                customers={currentData ? currentData : []}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={customersCount}
                page={5}
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
