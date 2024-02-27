import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Avatar, Box,Button, Chip, Container, Link, Stack, SvgIcon, Typography, Card, CardHeader, CardContent, Divider, List } from '@mui/material';
// import { customersApi } from '../../../../api/customers';
import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { CustomerEditForm } from '../../../sections/dashboard/stake/stake-add-form';
import { getInitials } from '../../../utils/get-initials';
import axios from 'axios';
// import { useRouter } from 'next/router';


const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useCustomer = () => {

  //need to get member_user_id from params

  // const router = useRouter();
  // const {userId} = router.query;

  // console.log(userId)

  // const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const getCustomer = useCallback(async () => {
    try {
      // const response = await customersApi.getCustomer();
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': token
      }

      const response = await axios.get(`${BASEURL}/admin/getuserbalance`, {
        headers: headers
      })

      console.log(response.data)
      setCustomer(response.data.balance);

      // if (isMounted()) {
      // }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getCustomer();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return customer;
};


// const handleSubmit = async (values) => {
//   try{
//     console.log('Form values:', values);
//     const token = localStorage.getItem('token');
//     const headers = {
//       'Authorization': token
//     }

//     const response = await axios.post(`${BASEURL}/admin/updateMemberStatus/:${customer.member_user_id}`,values, { headers: headers })

//     console.log(response);
//   }
//   catch(err){
//     console.log(err);
//   }
// }

const Page = () => {
  const customer = useCustomer();

  usePageView();

  // if (!customer) {
  //   return null;
  // }

  return (
    <>
      <Head>
        <title>
          Dashboard: Stake Add | Rock34x
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.stake.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Stakes
                  </Typography>
                </Link>
              </div>
              <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'neutral.100',
        p: 3
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            subheader={(
              <Typography variant="h4">
                {"₹" + customer}
              </Typography>
            )}
            sx={{ pb: 0 }}
            title={(
              <Typography
                color="text.secondary"
                variant="overline"
              >
                Total balance
              </Typography>
            )}
          />
          <CardContent>
            <Divider sx={{ mb: 2 }} />
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Available currency
            </Typography>
            {/* <List
              disablePadding
              sx={{ pt: 2 }}
            >
              {assets.map((currency) => {
                const amount = numeral(currency.amount).format('$0,0.00');

                return (
                  <ListItem
                    disableGutters
                    key={currency.name}
                    sx={{
                      pb: 2,
                      pt: 0
                    }}
                  >
                    <ListItemText
                      disableTypography
                      primary={(
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Box
                              sx={{
                                backgroundColor: currency.color,
                                height: 8,
                                width: 8,
                                borderRadius: '50%'
                              }}
                            />
                            <Typography variant="subtitle2">
                              {currency.name}
                            </Typography>
                          </Stack>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {amount}
                          </Typography>
                        </Stack>
                      )}
                    />
                  </ListItem>
                );
              })}
            </List> */}
            <Divider />
            <Stack
              alignItems="flex-start"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Button
                color="inherit"
                endIcon={(
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                )}
              >
                Add money
              </Button>
              <Button
                color="inherit"
                endIcon={(
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                )}
              >
                Withdraw funds
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
              {/* <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(customer.member_name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {customer.email}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        user_id:
                      </Typography>
                      <Chip
                        label={customer.member_user_id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack> */}
            </Stack>
             <CustomerEditForm /> {/* handleSubmit={handleSubmit} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
