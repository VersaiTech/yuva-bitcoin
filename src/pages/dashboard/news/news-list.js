import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Changed import
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
  Grid // Changed import
} from '@mui/material';
// import { newsApi } from '../../../api/news';
import { newsApi } from '../../../api/news';

import { useMounted } from '../../../hooks/use-mounted';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { paths } from '../../../paths';
import { PostNewsletter } from '../../../sections/dashboard/blog/post-newsletter';
import { PostCard } from '../../../sections/dashboard/blog/post-card';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';

const useNews = () => {
  const isMounted = useMounted();
  const [news, setNews] = useState([]);

  const getNews = useCallback(async () => {
    try {
      const response = await newsApi.getNews();

      if (isMounted()) {
        setNews(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getNews();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return news;
};

const Page = () => {
  const news = useNews();

  usePageView();

  return (
    <>
      <Head>
        <title>
        Crypto News | Rock34x
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Typography variant="h3">
              Crypto News
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color="inherit" // Changed to 'inherit'
                href={paths.dashboard.index} // Changed to 'href'
                passHref // Added to ensure Next.js link behavior
                variant="subtitle2"
              >
                Dashboard
              </Link>
              {/* <Link
                color="inherit" // Changed to 'inherit'
                href={paths.dashboard.news.index} // Changed to 'href'
                // passHref // Added to ensure Next.js link behavior
                variant="subtitle2"
              >
                News
              </Link> */}
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                News
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2
            }}
          >
            <Typography variant="subtitle1">
              Hello, User
            </Typography>
            <Button
              component={Link} // Changed to 'Link'
              href={paths.dashboard.news.create} // Changed to 'href'
              variant="contained"
            >
              New Article
            </Button>
          </Card>
          <Typography variant="h4">
            Recent Articles
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
            variant="body1"
          >
            Discover the latest news, tips and user research insights from Acme.
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
          >
            You will learn about web infrastructure, design systems and devops APIs best
            practices.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Grid
            container
            spacing={4}
          >
            {news.map((newsArticle) => (
              <Grid
                key={newsArticle.title}
                item // Changed to 'item'
                xs={12}
                md={6}
              >
                <PostCard
                  href={`/dashboard/news/${newsArticle.id}`}
                  authorAvatar={newsArticle.author.avatar}
                  authorName={newsArticle.author.name}
                  category={newsArticle.category}
                  cover={newsArticle.cover}
                  publishedAt={newsArticle.publishedAt}
                  readTime={newsArticle.readTime}
                  shortDescription={newsArticle.shortDescription}
                  title={newsArticle.title}
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{
              mt: 4,
              mb: 8
            }}
          >
            <Button
              disabled
            >
              Newer
            </Button>
            <Button>
              Older news
            </Button>
          </Stack>
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
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
