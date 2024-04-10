import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ordersApi } from "../../../api/orders";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { OrderDrawer, TaskDrawer } from "../../../sections/dashboard/order/order-drawer";
import { OrderListContainer } from "../../../sections/dashboard/order/order-list-container";
import { TaskListSearch } from "../../../sections/dashboard/tasks/order-list-search";
import { TaskListTable } from "../../../sections/dashboard/tasks/order-list-table";
import axios from "axios";
import { logs } from "../../../api/customers/data";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "createdAt",
    sortDir: "desc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useOrders = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    orders: [],
    ordersCount: 0,
  });
  const { page, rowsPerPage } = search;


  const getOrders = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: token };

    // Initialize an object to hold the API responses
    const tasks = {
      orders: [],
      ordersCount: 0,
      pending: [],
      completed: [],
      rejected: [],
    };

    try {
      const response = await axios.get(`${BASEURL}/admin/getAllTasksBoth/${page + 1}/${rowsPerPage}`, { headers });
      console.log(response.data.tasks);
      tasks.orders = response.data.tasks;
      tasks.ordersCount = response.data.count; // Assuming 'count' is directly on 'data'
    } catch (err) {
      console.error("Error fetching all tasks:", err);
    }

    try {
      const completedTasks = await axios.get(`${BASEURL}/admin/getConfirmedTasksForUser/${page + 1}/${rowsPerPage}`, { headers });
      console.log(completedTasks.data.tasks);
      tasks.completed = completedTasks.data.tasks;
    } catch (err) {
      console.error("Error fetching completed tasks:", err);
    }

    try {
      const pendingTasks = await axios.get(`${BASEURL}/admin/getPendingTasksForUser/${page + 1}/${rowsPerPage}`, { headers });
      console.log(pendingTasks.data.tasks);
      tasks.pending = pendingTasks.data.tasks;
    } catch (err) {
      console.error("Error fetching pending tasks:", err);
    }

    try {
      const rejectedTasks = await axios.get(`${BASEURL}/admin/getRejectedTasksForUser/${page + 1}/${rowsPerPage}`, { headers });
      console.log(rejectedTasks.data.tasks);
      tasks.rejected = rejectedTasks.data.tasks;
    } catch (err) {
      console.error("Error fetching rejected tasks:", err);
    }
    
    // Update state if component is still mounted
    if (isMounted()) {
      setState({
        ...tasks
      });
    }
  }, [search, isMounted]);


  useEffect(
    () => {
      getOrders();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const Page = () => {
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();
  const { orders, ordersCount, pending, completed, rejected } = useOrders(search);
  const [currentTab, setCurrentTab] = useState("all");
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined,
  });
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }
    return orders.find((order) => order.taskId === drawer.data.taskId);
  }, [drawer, orders]);

  usePageView();

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
    (sortDir) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortDir,
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
      console.log(event.target.value);
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  const handleOrderOpen = useCallback(
    (orderId) => {
      // Close drawer if is the same order
      console.log(drawer)

      if (drawer.isOpen && drawer.data === orderId) {
        setDrawer({
          isOpen: false,
          data: undefined,
        });
        return;
      }

      setDrawer({
        isOpen: true,
        data: orderId,
      });
    },
    [drawer]
  );

  const handleOrderClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: All Task | Yuva Bitcoin</title>
      </Head>
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <OrderListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">All Tasks</Typography>
                </div>
                <div>
                  {/* <Button
                      startIcon={
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      Add
                    </Button> */}
                </div>
              </Stack>
            </Box>
            <Divider />
            <TaskListSearch
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
            <Divider />
            <TaskListTable
              onOrderSelect={handleOrderOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              orders={currentTab === "all" ? orders : currentTab === "pending" ? pending : currentTab === "complete" ? completed : currentTab === "rejected" ? rejected : []}
              ordersCount={ordersCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            // customers={
            //   currentTab === "all"
            //     ? orders
            //     : currentTab === "hasAcceptedMarketing"
            //     ? pending
            //     : currentTab === "isProspect"
            //     ? completed
            //     : []
            // }
            />
          </OrderListContainer>
          <TaskDrawer
            // orders = {orders}
            container={rootRef.current}
            onClose={handleOrderClose}
            open={drawer.isOpen}
            order={currentOrder}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
