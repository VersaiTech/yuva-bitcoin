import { format, subDays, subHours, subMinutes, subSeconds } from 'date-fns';
import numeral from 'numeral';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { SeverityPill } from '../../../components/severity-pill';

const now = new Date();

// const orders = [
//   {
//     id: '5eff2548979e396cb4b000ba',
//     createdAt: subMinutes(subSeconds(now, 10), 7).getTime(),
//     customer: {
//       email: 'ekaterina@YuvaBitcoin.io',
//       name: 'Ekaterina Tankova'
//     },
//     currency: '$',
//     items: 7,
//     number: 'DEV-1042',
//     status: 'pending',
//     totalAmount: 524.00
//   },
//   {
//     id: '5eff254e46b753a166e7d7af',
//     createdAt: subHours(subMinutes(subSeconds(now, 50), 12), 2).getTime(),
//     customer: {
//       email: 'carson.darrin@YuvaBitcoin.io',
//       name: 'Carson Darrin'
//     },
//     currency: '$',
//     items: 8,
//     number: 'DEV-1041',
//     status: 'complete',
//     totalAmount: 693.00
//   },
//   {
//     id: '5eff2553e1c551e2e28a9205',
//     createdAt: subHours(subMinutes(subSeconds(now, 12), 39), 5).getTime(),
//     customer: {
//       email: 'fran.perez@YuvaBitcoin.io',
//       name: 'Fran Perez'
//     },
//     currency: '$',
//     items: 4,
//     number: 'DEV-1040',
//     status: 'rejected',
//     totalAmount: 215.00
//   },
//   {
//     id: '5eff25590f3e28f013c39a0e',
//     createdAt: subHours(subMinutes(subSeconds(now, 21), 46), 5).getTime(),
//     customer: {
//       email: 'anje.keiser@YuvaBitcoin.io',
//       name: 'Jie Yan Song'
//     },
//     currency: '$',
//     items: 1,
//     number: 'DEV-1039',
//     status: 'pending',
//     totalAmount: 25.00
//   },
//   {
//     id: '5eff255f57499089243805d8',
//     createdAt: subHours(subMinutes(subSeconds(now, 54), 19), 8).getTime(),
//     customer: {
//       name: 'Clarke Gillebert',
//       email: 'clarke.gillebert@YuvaBitcoin.io'
//     },
//     currency: '$',
//     items: 5,
//     number: 'DEV-1038',
//     status: 'complete',
//     totalAmount: 535.00
//   },
//   {
//     id: '5eff25658d416fc5adb96a3a',
//     createdAt: subDays(subMinutes(subSeconds(now, 12), 45), 1).getTime(),
//     customer: {
//       email: 'nasimiyu.danai@YuvaBitcoin.io',
//       name: 'Nasimiyu Danai'
//     },
//     currency: '$',
//     items: 2,
//     number: 'DEV-1037',
//     status: 'complete',
//     totalAmount: 56.00
//   }
// ];

const ordersNew = [
  {
    id: '5eff2548979e396cb4b000ba',
    Inscription: '5eff2548979e396cb4b000ba',
    Event: 'Updated',
    Quantity: 5500,
    'Total Value': '608,000 sats\n$ 440.12',
    From: 'YourAlphanumericID1',
    To: '',
    Time: '3/12/2024, 7:21:49 AM'
  },
  {
    id: '5eff254e46b753a166e7d7af',
    Inscription: '5eff254e46b753a166e7d7af',
    Event: 'Listed',
    Quantity: 2000,
    'Total Value': '300,000 sats\n$ 220.00',
    From: 'YourAlphanumericID2',
    To: '',
    Time: '3/12/2024, 8:45:32 AM'
  },
  {
    id: '5eff2553e1c551e2e28a9205',
    Inscription: '5eff2553e1c551e2e28a9205',
    Event: 'Unlisted',
    Quantity: 4000,
    'Total Value': '500,000 sats\n$ 330.00',
    From: 'YourAlphanumericID3',
    To: '',
    Time: '3/12/2024, 10:15:57 AM'
  },
  // Add more orders similarly
  {
    id: '5eff255f57499089243805d8',
    Inscription: '5eff255f57499089243805d8',
    Event: 'Updated',
    Quantity: 6200,
    'Total Value': '800,000 sats\n$ 550.00',
    From: 'YourAlphanumericID4',
    To: '',
    Time: '3/12/2024, 1:30:22 PM'
  },
  {
    id: '5eff25658d416fc5adb96a3a',
    Inscription: '5eff25658d416fc5adb96a3a',
    Event: 'Listed',
    Quantity: 8500,
    'Total Value': '1,200,000 sats\n$ 990.00',
    From: 'YourAlphanumericID5',
    To: '',
    Time: '3/12/2024, 3:45:49 PM'
  },
  // Add more orders similarly
];



const labelColors = {
  complete: 'success',
  pending: 'warning',
  rejected: 'error'
};

export const Table1 = () => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark'
        ? 'neutral.800'
        : 'neutral.100',
      p: 3
    }}
  >
    <Card>
      <CardHeader
        action={(
          <IconButton>
            <SvgIcon>
              <DotsHorizontalIcon />
            </SvgIcon>
          </IconButton>
        )}
        title="Latest Orders"
      />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Inscription
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Event
              </TableCell>
              <TableCell>
                Quanity
              </TableCell>
              <TableCell>
                Total Value
              </TableCell>
              <TableCell>
                From
              </TableCell>
              <TableCell>
                To
              </TableCell>
              <TableCell>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersNew.map((order) => {
              // const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);
              // const statusColor = labelColors[order.status];
              // const createdAt = format(order.createdAt, 'dd MMM, yyyy HH:mm:ss');

              return (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      {order.Inscription}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {order.Event}
                  </TableCell>
                  <TableCell>
                    {order.Quantity}
                  </TableCell>
                  <TableCell>
                    {order['Total Value']}
                  </TableCell>
                  <TableCell>
                      {order.From}
                  </TableCell>
                  <TableCell >
                    {order.To}
                  </TableCell>
                  <TableCell >
                    {order.Time}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ChevronRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          See All
        </Button>
      </Box>
    </Card>
  </Box>
);
