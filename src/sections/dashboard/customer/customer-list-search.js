import { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSnackbar } from 'notistack';
import { ExportOptionsModal } from '../../../components/ExportOptions';
import {
  Box,
  Divider,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';
import { useUpdateEffect } from '../../../hooks/use-update-effect';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;


const tabs = [
  {
    label: 'All Users',
    value: 'all',
  },
  {
    label: 'Active Users',
    value: 'hasAcceptedMarketing'
  },
  {
    label: 'Blocked Users',
    value: 'isProspect'
  },
  {
    label: 'Registered Today',
    value: 'registeredToday'
  }
];

export const CustomerListSearch = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { onFiltersChange, onSortChange, sortBy, sortDir, setCurrentTab, currentTab, setSearchResults, customers,allCustomers } = props;
  const queryRef = useRef(null);
  const [filters, setFilters] = useState({});
  // Export Modal Opening 
  const [exportModalOpen, setExportModalOpen] = useState(false);
  

  const urlParams = new URLSearchParams(window.location.search);
  const sturl = urlParams.get('status');
  console.log(sturl);

  useEffect(() => {
    if (sturl) {
      setCurrentTab(sturl);
    }
  }, [sturl, setCurrentTab]);

  useEffect(() => {
    console.log(currentTab);
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        hasAcceptedMarketing: undefined,
        isProspect: undefined,
        isReturning: undefined
      };

      if (value !== 'all') {
        updatedFilters[value] = true;
      }

      return updatedFilters;
    });
  }, [setCurrentTab]);

  const handleQueryChange = useCallback(async (event) => {
    event.preventDefault();
    const query = queryRef.current?.value;

    if (query.length < 3) {
      enqueueSnackbar('Please enter at least 3 characters', { variant: 'warning' });
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(`${BASEURL}/admin/findMember`, { member_name: query }, { headers });

      if (response.data.status) {
        setSearchResults(response.data.data);
      } else {
       enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }, [setSearchResults]);

  const handleRefresh = useCallback(() => {
    queryRef.current.value = "";
    setSearchResults([]);
    setFilters({});
    setCurrentTab('all');
  }, [setSearchResults, setFilters, setCurrentTab]);

  const handleSortChange = useCallback((event) => {
    const [sortBy, sortDir] = event.target.value.split('|');

    onSortChange?.({
      sortBy,
      sortDir
    });
  }, [onSortChange]);


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
    dataToExport = allCustomers.map((customer) => ({
      member_user_id: customer.member_user_id,
      member_name:customer.member_name,
      registration_date:customer.registration_date,
      wallet_address:customer.wallet_address,
      TwitterId: customer.twitterId,
      Email: customer.email,
      Coins: customer.coins,
      IsActive: customer.isActive,
      Contact: customer.contactNo,
      userType: customer.userType,
      referralCode: customer.referralCode,
      isReferred: customer.isReferred,
      deposit_usdt: customer.deposit_usdt,
      deposit_bnb: customer.deposit_bnb,
      deposit_matic: customer.deposit_matic,
    }));
  } else {
    // Filter data based on date range
    dataToExport = allCustomers
      .filter((customer) => {
        // Assuming the customer object has a 'createdAt' field representing the creation date
        return customer.createdAt >= formattedStartDate && customer.createdAt <= formattedEndDate;
      })
      .map((customer) => ({
      member_user_id: customer.member_user_id,
      member_name:customer.member_name,
      TwitterId: customer.twitterId,
      Email: customer.email,
      Coins: customer.coins,
      IsActive: customer.isActive,
      Contact: customer.contactNo,
      registration_date:customer.registration_date,
      wallet_address:customer.wallet_address,
      userType: customer.userType,
      referralCode: customer.referralCode,
      isReferred: customer.isReferred,
      deposit_usdt: customer.deposit_usdt,
      deposit_bnb: customer.deposit_bnb,
      deposit_matic: customer.deposit_matic,
      }));
  }

  console.log("Data to be exported is ",dataToExport);
  handleExportToExcelDownload(dataToExport)
  setExportModalOpen(false);
  };

// For downloading all data directly


const handleExportToExcelDownload = (dataToExport) => {
  try {
    // Format customers data into an Excel-compatible format
    console.log(dataToExport);
    const data = dataToExport.map((customer) => ({
      "NAME": customer.member_name || '', 
      "MEMBER ID": customer.member_user_id || '', 
      "TWITTER ID": customer.TwitterId || '',
      EMAIL: customer.Email || '',
      COINS: customer.Coins || '',
      "ACTIVE STATUS": customer.IsActive || '',
      CONTACT: customer.Contact || '',
      "DATE": customer.registration_date || '',
      "WALLET ADDRESS": customer.wallet_address || '',
      "USER TYPE": customer.userType || '',
      "Referral Code": customer.referralCode || '',
      "Is Referred": customer.isReferred || '',
      USDT: customer.deposit_usdt || '',
      BNB: customer.deposit_bnb || '',
      MATIC: customer.deposit_matic || '',
    }));
    console.log("Data now is ",data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    // Convert the workbook to a binary Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element and initiate the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Users.xlsx');
    document.body.appendChild(link);
    link.click();

    // Clean up by revoking the URL
    window.URL.revokeObjectURL(url);

    enqueueSnackbar("Excel file downloaded successfully", { variant: "success" });
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
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
     {/* <Stack
  alignItems="center"
  direction="row"
  flexWrap="wrap"
  justifyContent="space-between" // Add this to align items at opposite ends
  spacing={3}
  sx={{ p: 3 }}
>
  <Box
    component="form"
    onSubmit={handleQueryChange}
    sx={{ flexGrow: 1 }}
  >
    <OutlinedInput
      defaultValue=""
      fullWidth
      inputProps={{ ref: queryRef }}
      placeholder="Search Users"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon>
            <SearchMdIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  </Box>
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
  </Stack>*/}
  <Stack
  alignItems="center"
  direction="row"
  flexWrap="wrap"
  justifyContent="space-between"
  spacing={3}
  sx={{ p: 3 }}
>
  {/* Search input */}
  <Box
  component="form"
  onSubmit={handleQueryChange}
  sx={{ flexGrow: 1 }}
>
  <OutlinedInput
    defaultValue=""
    fullWidth
    inputProps={{ ref: queryRef }}
    placeholder="Search Users"
    startAdornment={(
      <InputAdornment position="start">
        <SvgIcon>
          <SearchMdIcon />
        </SvgIcon>
      </InputAdornment>
    )}
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
      // onClick={handleExportToExcelDownload}
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

CustomerListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  setCurrentTab: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  setSearchResults: PropTypes.func.isRequired,
};
