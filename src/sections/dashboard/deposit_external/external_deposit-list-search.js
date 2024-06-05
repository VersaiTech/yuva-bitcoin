import { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { useUpdateEffect } from '../../../hooks/use-update-effect';
import axios from 'axios';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  // {
  //   label: 'Pending',
  //   value: 'hasAcceptedMarketing'
  // },
  // {
  //   label: 'Completed',
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

export const External_DepositListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir, setCurrentTab, currentTab } = props;

  const queryRef = useRef(null);
  // const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({});

  const urlParams = new URLSearchParams(window.location.search);
  const sturl = urlParams.get('status');
  console.log(sturl);

  useEffect(() => {
    if(sturl){
      setCurrentTab(sturl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sturl]);

  useEffect(() => {
    console.log(currentTab);
  })



  // const [activeUsers, setActiveUsers] = useState([]);

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

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  }, []);

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
            placeholder="Search Deposit"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Box>
        </Stack>
    </>
  );
};

External_DepositListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  activeUsers: PropTypes.array,
  blockedUsers: PropTypes.array,
};