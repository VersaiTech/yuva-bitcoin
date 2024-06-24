import { useCallback, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  IconButton,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Button,
} from "@mui/material";
import { useUpdateEffect } from "../../../hooks/use-update-effect";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { ExportOptionsModal } from "../../../components/ExportOptions";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from 'xlsx';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
  {
    label: "Pending Task",
    value: "pending",
    key: 1,
  },
  {
    label: "Completed Task",
    value: "completed",
    key: 2,
  },
  {
    label: "Rejected Task",
    value: "rejected",
  },
];

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },

  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
];

export const WorkTaskSearch = (props) => {
  const {
    onFiltersChange,
    onSortChange,
    sortBy,
    sortDir,
    setCurrentTab,
    currentTab,
    setSearchResults,
    allCustomers
  } = props;
  const queryRef = useRef(null);
  // Export Modal Opening
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // const [activeUsers, setActiveUsers] = useState([]);
  // const urlParams = new URLSearchParams(window.location.search);
  // const sturl = urlParams.get('status');

  // useEffect(() => {
  //   console.log(sturl);
  //   if(sturl !== undefined) {
  //     setCurrentTab(sturl);
  //   }
  // }, [sturl]);



  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback(
    async (event, value) => {
      setCurrentTab(value);
      setFilters((prevState) => {
        const updatedFilters = {
          ...prevState,
          hasAcceptedMarketing: undefined,
          isProspect: undefined,
          isReturning: undefined,
        };

        if (value !== "all") {
          updatedFilters[value] = true;
        }

        return updatedFilters;
      });
    },
    [setCurrentTab]
  );

  // const handleQueryChange = useCallback((event) => {
  //   event.preventDefault();
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     query: queryRef.current?.value
  //   }));
  // }, []);

  const handleQueryChange = useCallback(
    async (event) => {
      event.preventDefault();
      const query = queryRef.current?.value;

      if (query.length < 3) {
        enqueueSnackbar("Please enter at least 3 characters", {
          variant: "warning",
        });
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const response = await axios.post(
          `${BASEURL}/admin/findMemberInTask`,
          { name: query },
          { headers }
        );

        console.log(response);
        if (response.data.status) {
          setSearchResults(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error.response.data.message);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    },
    [setSearchResults]
  );

  const handleRefresh = useCallback(() => {
    queryRef.current.value = "";
    setSearchResults([]);
    setFilters({});
    setCurrentTab("all");
  }, [setSearchResults, setFilters, setCurrentTab]);

  const handleSortChange = useCallback(
    (event) => {
      const [sortBy, sortDir] = event.target.value.split("|");

      onSortChange?.({
        sortBy,
        sortDir,
      });
    },
    [onSortChange]
  );

  // For opening the modal
  const handleExportToExcel = () => {
    // Open the export options modal
    console.log(allCustomers);
    setExportModalOpen(true);
  };

  // For handling the download logic of excel from modal option
  const handleExportOptionsSubmit = (option, startDate, endDate) => {
    console.log("Selected export option:", option);

    const formattedStartDate = startDate
      ? new Date(startDate).toISOString()
      : null;
    const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;

    let dataToExport = [];

    if (option === "all") {
      // Export all users data
  dataToExport = allCustomers.map((customer) => ({
  userId: customer.userId,
  name: customer.name,
  createdAt: customer.createdAt,
  dateCompleted: customer.dateCompleted,
  description: customer.description,
  link: customer.link,
  reason: customer.reason,
  status: customer.status,
  taskId: customer.taskId,
  taskName: customer.taskName,
  twitterId: customer.twitterId,
  updatedAt: customer.updatedAt,
  coins: customer.coins
}));
    } else {
      // Filter data based on date range
      dataToExport = allCustomers.filter((customer) => {
          // Assuming the customer object has a 'createdAt' field representing the creation date
          return (
            customer.updatedAt >= formattedStartDate &&
            customer.updatedAt <= formattedEndDate
          );
        })
        .map((customer) => ({
          userId: customer.userId,
          name: customer.name,
          createdAt: customer.createdAt,
          dateCompleted: customer.dateCompleted,
          description: customer.description,
          link: customer.link,
          reason: customer.reason,
          status: customer.status,
          taskId: customer.taskId,
          taskName: customer.taskName,
          twitterId: customer.twitterId,
          updatedAt: customer.updatedAt,
          coins: customer.coins
        }));
    }

    console.log("Data to be exported is ", dataToExport);
    handleExportToExcelDownload(dataToExport);
    setExportModalOpen(false);
  };

  // For downloading all data directly

  const handleExportToExcelDownload = (dataToExport) => {
    try {
      // Format customers data into an Excel-compatible format
      console.log(dataToExport);
      const data = dataToExport.map((customer) => ({
        "NAME": customer.name || '', 
        "MEMBER ID": customer.userId || '', 
        "TWITTER ID": customer.twitterId || '',
        "COINS": customer.coins || '',
        "DATE": customer.createdAt || '',
        "DESCRIPTION": customer.description || '',
        "LINK": customer.link || '',
        "REASON": customer.reason || '',
        "STATUS": customer.status || '',
        "TASK ID": customer.taskId || '',
        "TASK NAME": customer.taskName || '',
        "UPDATED AT": customer.updatedAt || ''
      }));
      console.log("Data now is ", data);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      // Convert the workbook to a binary Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create a Blob from the buffer
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element and initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Users.xlsx");
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);

      enqueueSnackbar("Excel file downloaded successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error exporting to Excel", { variant: "error" });
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            onChange={(e) => {
              setFilters((prevState) => ({
                ...prevState,
                query: e.target.value,
              }));
            }}
            inputProps={{ ref: queryRef }}
            placeholder="Search Task"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>

        {/* Export button */}
        <Box>
          <Button
            color="inherit"
            endIcon={
              <SvgIcon>
                <DownloadIcon />
              </SvgIcon>
            }
            size="small"
            onClick={handleExportToExcel}
          >
            Export to Excel
          </Button>
          {/* Export options modal */}
          <ExportOptionsModal
            open={exportModalOpen}
            onClose={() => setExportModalOpen(false)}
            onSubmit={handleExportOptionsSubmit}
          />
        </Box>
      </Stack>
    </>
  );
};

WorkTaskSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(["asc", "desc"]),
  pending: PropTypes.array,
  completed: PropTypes.array,
};
