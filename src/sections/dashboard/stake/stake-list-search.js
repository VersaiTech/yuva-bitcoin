import { useCallback, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
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
import { useSnackbar } from "notistack";
import * as XLSX from "xlsx";
import { ExportOptionsModal } from "../../../components/ExportOptions";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Today Staked",
    value: "pending",
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

export const StakeListSearch = (props) => {
  const {
    onFiltersChange,
    onSortChange,
    sortBy,
    sortDir,
    setCurrentTab,
    currentTab,
    setSearchResults,
    customers
  } = props;
  const queryRef = useRef(null);
  const {enqueueSnackbar} = useSnackbar();
  // const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({});
  // Export Modal Opening
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // const [activeUsers, setActiveUsers] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const sturl = urlParams.get("status");
  console.log(sturl);

  useEffect(() => {
    if (sturl) {
      setCurrentTab(sturl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sturl]);

  useEffect(() => {
    console.log(currentTab);
  });

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
          pending: undefined,
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
        })
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const response = await axios.post(
          `${BASEURL}/api/Staking/findMemberStake`,
          { member_name: query },
          { headers }
        );

        console.log(response);
        if (response.data.status) {
          setSearchResults(response.data.data);
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }
      } catch (error) {
        console.error(error.response.data);

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
    setExportModalOpen(true);
  };

  // For handling the download logic of excel from modal option
  const handleExportOptionsSubmit = (option,startDate,endDate) => {
  console.log('Selected export option:', option);  
  
  const formattedStartDate = startDate ? new Date(startDate).toISOString() : null;
  const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;

  
  let dataToExport = [];

  if (option === 'all') {
    // Export all users data
    dataToExport = customers.map((customer) => ({
      member_user_id: customer.member_user_id,
        member_name: customer.member_name,
        investment: customer.investment,
        transaction_id: customer.transaction_id,
        stake_type: customer.stake_type,
        stakingDuration: customer.stakingDuration,
        interestCredited: customer.interestCredited,
        sys_date: customer.sys_date,
    }));
  } else {
    // Filter data based on date range
    dataToExport = customers
      .filter((customer) => {
        // Assuming the customer object has a 'createdAt' field representing the creation date
        return customer.sys_date >= formattedStartDate && customer.sys_date <= formattedEndDate;
      })
      .map((customer) => ({
        member_user_id: customer.member_user_id,
        member_name: customer.member_name,
        investment: customer.investment,
        transaction_id: customer.transaction_id,
        stake_type: customer.stake_type,
        stakingDuration: customer.stakingDuration,
        interestCredited: customer.interestCredited,
        sys_date: customer.sys_date,
      }));
  }

  console.log("Data to be exported is ",dataToExport);
  handleExportToExcelDownload(dataToExport)
  setExportModalOpen(false);
  };

  // For downloading all data directly

  const handleExportToExcelDownload = (dataToExport) => {
    try {
      console.log("Data To export inside  is ",dataToExport);
      // Format customers data into an Excel-compatible format
      const data = dataToExport.map((customer) => ({
        "Member User ID": customer.member_user_id || '' ,
        "Member Name": customer.member_name || '' ,
        Investment: customer.investment || '' ,
        "Transaction ID": customer.transaction_id || '' ,
        "Stake Type": customer.stake_type || '' ,
        "Staking Duration": customer.stakingDuration || '' ,
        "Interest Credited": customer.interestCredited || '' ,
        "System Date": customer.sys_date || '' ,
      }));

      console.log("Data now is ",data);


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
      link.setAttribute("download", "Stakes.xlsx");
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
            inputProps={{ ref: queryRef }}
            placeholder="Search Deposit"
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

StakeListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(["asc", "desc"]),
  // pending: PropTypes.array,
  // completed: PropTypes.array,
  // rejected: PropTypes.array,
};
