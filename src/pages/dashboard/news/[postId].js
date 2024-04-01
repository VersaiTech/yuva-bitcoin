

import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Button, Chip, Typography, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useNewsDetail = () => {
  const router = useRouter();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const { postId } = router.query;
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(`${BASEURL}/api/Blog/getAllBlogs`, {
          headers: headers,
        });

        const foundArticle = response.data.blogs.find(
          (article) => article.blogId === postId
        );

        setNewsDetail(foundArticle);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    if (router.query.postId) {
      fetchNewsDetail();
    }
  }, [router.query.postId]);

  return newsDetail;
};

const NewsDetailPage = () => {
  const router = useRouter();
  const newsDetail = useNewsDetail();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const { postId } = router.query;

      const headers = {
        Authorization: token,
      };

      await axios.delete(`${BASEURL}/api/Blog/deleteBlog/${postId}`, {
        headers: headers,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting news article:", error);
    }
  };

  if (!newsDetail) {
    return null;
  }

  const formattedDate = format(new Date(newsDetail.createdAt), "MMMM d, yyyy");

  return (
    <>
      <Head>
        <title>{newsDetail.title} | Rock34x</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h2" align="center" gutterBottom>
            News Details
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Image
                src={
                  newsDetail.imageUrls && newsDetail.imageUrls.length > 0
                    ? newsDetail.imageUrls[0]
                    : "/assets/covers/abstract-1-4x3-large.png"
                }
                width={800}
                height={400}
                alt={newsDetail.title}
              />
              <Typography variant="h3">{newsDetail.title}</Typography>
              <Typography variant="body1">{newsDetail.content}</Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2">
                  By YuvaBitCoin • {formattedDate}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

NewsDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewsDetailPage;
