import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { PostContent } from "../../../sections/dashboard/blog/post-content";
import axios from "axios";
import Image from "next/image";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useNewsDetail = () => {
  const router = useRouter();
  console.log(router.query.postId);
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

        console.log("API response:", response.data); // Log API response

        const foundArticle = response.data.blogs.find(
          (article) => article.blogId === postId
        );
        console.log("Found article:", foundArticle); // Log fetched news article

        setNewsDetail(foundArticle);
      } catch (error) {
        // Inside the catch block of useNewsDetail hook
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
  const newsDetail = useNewsDetail();

  if (!newsDetail) {
    return null; // Add loading indicator or error handling
  }

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
          <Stack spacing={3}>
            <Typography variant="h3">{newsDetail.title}</Typography>
            <Typography variant="subtitle1">{newsDetail.createdAt}</Typography>
            <Typography variant="body1">{newsDetail.content}</Typography>
            <Image
              src={
                newsDetail.imageUrls[0]
                  ? newsDetail.imageUrls[0]
                  : "/assets/covers/abstract-1-4x3-large.png"
              }
              width={600}
              height={300}
              alt={newsDetail.title}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

NewsDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewsDetailPage;
