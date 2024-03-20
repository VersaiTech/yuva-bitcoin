import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Container, Link, Stack, SvgIcon, Typography, Card, CardHeader, CardContent, Divider } from '@mui/material';
import axios from 'axios';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { CustomerEditForm } from '../../../sections/dashboard/stake/stake-add-form';
import { CustomerWithdrawForm } from '../../../sections/dashboard/stake/stake-withdraw-form';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const useTotalInvestment = () => {
  const [totalInvestment, setTotalInvestment] = useState(null);

  const getTotalInvestment = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': token
      }

      const response = await axios.get(`${BASEURL}/api/Staking/getTotalInvestmentByUserId`, {
        headers: headers
      })
      console.log(response.data);

      setTotalInvestment(response.data.totalInvestment);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getTotalInvestment();
  }, []);

  return totalInvestment;
};

const Page = () => {
  const totalInvestment = useTotalInvestment();

  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Stake Add | YuvaBitcoin
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
              <div>
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                  <Card>
                    <CardHeader
                      subheader={(
                        <Typography variant="h4" color="green">
                          {"₿ " + totalInvestment}
                        </Typography>
                      )}
                      sx={{ pb: 0 }}
                      title={(
                        <Typography
                          color="text.secondary"
                          variant="overline"
                        >
                          Total Stake balance
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
                      <Divider />
                      <Stack
                        alignItems="flex-start"
                        spacing={1}
                        sx={{ mt: 2 }}
                      >
                        <Link href={paths.dashboard.deposits.index}>
                          <Button
                            color="inherit"
                            endIcon={<ArrowRightIcon />}
                          >
                            Add money
                          </Button>
                        </Link>
                        <Link href={paths.dashboard.withdraw.create}>
                          <Button
                            color="inherit"
                            endIcon={<ArrowRightIcon />}
                          >
                            Withdraw funds
                          </Button>
                        </Link>
                      </Stack>
                    </CardContent>
                  </Card>
                </Container>
              </div>
            
            </Stack>
            <CustomerEditForm /> {/* handleSubmit={handleSubmit} */}
            <CustomerWithdrawForm />
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
