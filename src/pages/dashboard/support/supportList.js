import { formatDistanceStrict, subHours, subMinutes } from 'date-fns';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { customLocale } from '../../../utils/date-locale';
import { useMounted } from '../../../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';

const now = new Date();

const messages = [
  {
    id: 'b91cbe81ee3efefba6b915a7',
    content: 'Hello, we spoke earlier on the phone',
    createdAt: subMinutes(now, 2).getTime(),
    senderAvatar: '/assets/avatars/avatar-alcides-antonio.png',
    senderName: 'Alcides Antonio',
    senderOnline: true
  },
  {
    id: 'de0eb1ac517aae1aa57c0b7e',
    content: 'Is the job still available?',
    createdAt: subMinutes(now, 56).getTime(),
    senderAvatar: '/assets/avatars/avatar-marcus-finn.png',
    senderName: 'Marcus Finn',
    senderOnline: true
  },
  {
    id: '38e2b0942c90d0ad724e6f40',
    content: 'What is a screening task? I’d like to',
    createdAt: subHours(subMinutes(now, 23), 3).getTime(),
    senderAvatar: '/assets/avatars/avatar-carson-darrin.png',
    senderName: 'Carson Darrin',
    senderOnline: false
  },
  {
    id: '467505f3356f25a69f4c4890',
    content: 'Still waiting for feedback',
    createdAt: subHours(subMinutes(now, 6), 8).getTime(),
    senderAvatar: '/assets/avatars/avatar-fran-perez.png',
    senderName: 'Fran Perez',
    senderOnline: true
  },
  {
    id: '7e6af808e801a8361ce4cf8b',
    content: 'Need more information about current campaigns',
    createdAt: subHours(subMinutes(now, 18), 10).getTime(),
    senderAvatar: '/assets/avatars/avatar-jie-yan-song.png',
    senderName: 'Jie Yan Song',
    senderOnline: false
  }
];

const useSupport = () => {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const isMounted = useMounted();
  const [support, setSupport] = useState([]);
  console.log("Support :", support);

const getSupport = useCallback(async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
    const headers = {
      Authorization: token,
    };
    
    console.log("Token:", token);
    console.log("Headers:", headers);

    const response = await axios.get(`${BASEURL}/api/Support/getAllSupport/:page_number?/:count?`, { 
      headers: headers,
    });
    
    console.log("Response from API:", response.data);

    if (isMounted()) {
      // Assuming the response data is an array of blog posts
      setSupport(response.data); // Adjust based on actual data structure
    }
  } catch (err) {
    console.error(err);
  }
}, [isMounted]);


useEffect(() => {
  getSupport();
}, [getSupport]);

return support;
};

export const SupportList = () => {
  const support = useSupport();
  return (
    <>
    <h1>{support}</h1>
  <h1>Hello</h1>
  </>
  )
};
export default SupportList;
