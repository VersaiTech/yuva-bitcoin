import { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import RefreshIcon from '@mui/icons-material/Refresh';
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
  TextField
} from '@mui/material';
import { useUpdateEffect } from '../../../hooks/use-update-effect';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
  {
    label: 'Pending Task',
    value: 'pending',
    key: 1
  },
  {
    label: 'Completed Task',
    value: 'completed',
    key: 2
  }
  ,
  {
    label: 'Rejected Task',
    value: 'rejected',
  }
];

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },

  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
];

export const WorkTaskSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir, setCurrentTab, currentTab, setSearchResults } = props;
  console.log(currentTab)
  const queryRef = useRef(null);
  // const [currentTab, setCurrentTab] = useState('all');

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

  useEffect(() => {
    console.log(currentTab);
  })

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback(async(event, value) => {
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

  // const handleQueryChange = useCallback((event) => {
  //   event.preventDefault();
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     query: queryRef.current?.value
  //   }));
  // }, []);

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

      const response = await axios.post(`${BASEURL}/admin/findMemberInTask`, { name: query }, { headers });

      console.log(response);
      if (response.data.status) {
        setSearchResults(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
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
            onChange={(e) => {
              setFilters((prevState) => ({
                ...prevState,
                query: e.target.value
              }));
            }}
            inputProps={{ ref: queryRef }}
            placeholder="Search Task"
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
      </Stack>
    </>
  );
};

WorkTaskSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  pending: PropTypes.array,
  completed: PropTypes.array,
};
