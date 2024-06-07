import { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import RefreshIcon from '@mui/icons-material/Refresh';
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
  const { onFiltersChange, onSortChange, sortBy, sortDir, setCurrentTab, currentTab, setSearchResults, customers} = props;
  const queryRef = useRef(null);
  const [filters, setFilters] = useState({});

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
      alert("Minimum 3 characters required");
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
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching for members");
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

  const handleExportToExcel = () => {
    try {
      // Format customers data into an Excel-compatible format
      const data = customers.map((customer) => ({
        Name: customer.member_user_id,
        TwitterId:customer.twitterId,
        Email: customer.email,
        Coins: customer.coins,
        IsActive: customer.isActive,
        Contact: customer.contactNo,
        // Add more fields as needed
      }));
  
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
      link.setAttribute('download', 'customers.xlsx');
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
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
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
        {/* <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField> */}
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
