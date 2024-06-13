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
import { useSnackbar } from 'notistack';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
  {
    label: 'All Task',
    value: 'all',
  },
  // {
  //   label: 'Pending Task',
  //   value: 'hasAcceptedMarketing'
  // },
  // {
  //   label: 'Completed Task',
  //   value: 'isProspect'
  // }
  // ,
  // {
  //   label: 'Returning',
  //   value: 'isReturning'
  // }
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
  // {
  //   label: 'Total orders (highest)',
  //   value: 'totalOrders|desc'
  // },
  // {
  //   label: 'Total orders (lowest)',
  //   value: 'totalOrders|asc'
  // }
];

export const NewtaskListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir, setCurrentTab, currentTab, setSearchResults } = props;
  const queryRef = useRef(null);
  const [filters, setFilters] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const urlParams = new URLSearchParams(window.location.search);
  const sturl = urlParams.get('status');
  console.log(sturl);

  useEffect(() => {
    if (sturl) {
      setCurrentTab(sturl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sturl]);

  useEffect(() => {
    console.log(currentTab);
  })

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
      enqueueSnackbar("Minimum 3 characters required", { variant: 'warning' });
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(`${BASEURL}/admin/findTasbyNameAdmin`, { taskName: query }, { headers });

      if (response.data.status) {
        setSearchResults(response.data.data);
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar( error.response.data.message, { variant: 'error' });
    }
  }, [setSearchResults, enqueueSnackbar]);

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

NewtaskListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  pending: PropTypes.array,
  completed: PropTypes.array,
};
