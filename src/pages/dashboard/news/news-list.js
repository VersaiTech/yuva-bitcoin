
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { paths } from '../../../paths';

import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { PostCard } from '../../../sections/dashboard/blog/post-card';
import { usePageView } from '../../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(`${BASEURL}/api/Blog/getAllBlogs`, {
          headers: headers,
        });

        setNews(response.data.blogs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  return news;
};

const Page = () => {
  const news = useNews();
  usePageView();

  return (
    <>
      <Head>
        <title>Crypto News | Rock34x</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          {/* Card with greeting and button */}
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', letterSpacing: 1 }}>
              Crypto News
            </Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />} sx={{ fontFamily: 'Roboto', fontWeight: 'bold', letterSpacing: 1 }}>
              <Link
                color="inherit"
                href={paths.dashboard.index}
                passHref
                variant="subtitle2"
              >
                Dashboard
              </Link>
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
              alignItems: "center",
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
              mb: 8,
              mt: 6,
              px: 3,
              py: 2,
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              letterSpacing: 1
            }}
          >
            <Typography variant="subtitle1">Hello, User</Typography>
          </Card>
          <Typography variant="h4" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', letterSpacing: 1 }}>Recent Articles</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={4}>
            {news.map((newsArticle) => (
              <Grid key={newsArticle.blogId} item xs={12} md={6}>
                <PostCard
                  href={`/dashboard/news/${newsArticle.blogId}`}
                  authorAvatar="/assets/avatars/avatar-alcides-antonio.png"
                  authorName="Yuva Bitcoin"
                  category="Crypto"
                  cover="/assets/covers/abstract-1-4x3-large.png"
                  publishedAt={newsArticle.createdAt}
                  readTime="5 min"
                  shortDescription={newsArticle.content}
                  title={newsArticle.title}
                  sx={{ height: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
