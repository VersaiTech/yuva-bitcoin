import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Box, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { useMounted } from '../../../../hooks/use-mounted';
import { usePageView } from '../../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { paths } from '../../../../paths';
import { QueryEditForm } from '../../../../sections/dashboard/queries/query-edit-form';
import { useRouter } from 'next/router';

const QueryEditPage = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const { query } = router.query; // Fetch the query from router

  useEffect(() => {
    if (!query) {
      // If query is not passed as props, redirect to the previous page or handle it as needed
      router.back();
    }
  }, [query, router]);

  usePageView();

  if (!query) {
    // You can render a loading spinner or a message here if needed
    return null;
  }

  // Decode the query string
  const decodedQuery = decodeURIComponent(query);
  const parsedQuery = JSON.parse(decodedQuery);

  return (
    <>
      <Head>
        <title>
          Dashboard: Query Edit | YourAppName
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
                  href={paths.dashboard.support.list}
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
                    Queries
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Typography variant="h4">
                  {parsedQuery.message}
                </Typography>
              </Stack>
            </Stack>
            <QueryEditForm query={parsedQuery} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

QueryEditPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default QueryEditPage;
