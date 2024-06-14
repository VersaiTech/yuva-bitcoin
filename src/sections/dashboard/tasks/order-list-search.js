import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  IconButton,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { useUpdateEffect } from '../../../hooks/use-update-effect';

import axios from 'axios';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tabOptions = [
  {
    label: 'All',
    value: 'all'
  },
  // {
  //   label: 'Canceled',
  //   value: 'canceled'
  // },
  {
    label: 'Completed',
    value: 'complete'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Rejected',
    value: 'rejected'
  }
];

const sortOptions = [
  {
    label: 'Newest',
    value: 'desc'
  },
  {
    label: 'Oldest',
    value: 'asc'
  }
];

export const TaskListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc',  currentTab, setCurrentTab, setSearchResults } = props;
  const queryRef = useRef(null);
  // const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    query: undefined,
    status: undefined
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);
    const status = tab === 'all' ? undefined : tab;

    setFilters((prevState) => ({
      ...prevState,
      status
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleQueryChange = useCallback((event) => {
  //   event.preventDefault();
  //   const query = queryRef.current?.value || '';
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     query
  //   }));
  // }, []);

  
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

      const response = await axios.post(`${BASEURL}/admin/findTaskByName`, { taskName: query }, { headers });

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
    const sortDir = event.target.value;
    onSortChange?.(sortDir);
  }, [onSortChange]);

  return (
    <div>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={filters.status || 'all'}
        variant="scrollable"
      >
        {tabOptions.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
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
            name="orderNumber"
            placeholder="Search Task by Name"
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
          value={sortDir}
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
    </div>
  );
};

TaskListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  pending: PropTypes.array,
  completed: PropTypes.array,
  rejected: PropTypes.array,
  setCurrentTab: PropTypes.func.isRequired
};