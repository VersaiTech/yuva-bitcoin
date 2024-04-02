// import { useCallback, useEffect, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link'; // Changed import
// import {
//   Box,
//   Breadcrumbs,
//   Button,
//   Card,
//   Container,
//   Divider,
//   Stack,
//   Typography,
//   Grid // Changed import
// } from '@mui/material';
// import { newsApi } from '../../../api/news';
// import { useMounted } from '../../../hooks/use-mounted';
// import { usePageView } from '../../../hooks/use-page-view';
// import { Layout as DashboardLayout } from '../../../layouts/dashboard';
// import { paths } from '../../../paths';
// import { PostNewsletter } from '../../../sections/dashboard/blog/post-newsletter';
// import { PostCard } from '../../../sections/dashboard/blog/post-card';
// import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
// import axios from "axios";


// const useNews = () => {
//   const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//   const isMounted = useMounted();
//   const [news, setNews] = useState([]);
//   console.log("News:", news);

// const getNews = useCallback(async () => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const headers = {
//       Authorization: token,
//     };
    
//     console.log("Token:", token);
//     console.log("Headers:", headers);
//     console.log("URL:", `${BASEURL}/api/Blog/getAllBlogs`);

//     const response = await axios.get(`${BASEURL}/api/Blog/getAllBlogs`, {
//       headers: headers,
//     });
    
//     console.log("Response from API:", response.data.blogs);

//     if (isMounted()) {
//       // Assuming the response data is an array of blog posts
//       setNews(response.data.blogs); // Adjust based on actual data structure
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }, [isMounted]);


// useEffect(() => {
//   getNews();
// }, [getNews]);

// return news;
// };

// const Page = () => {
//   const news = useNews();

//   usePageView();

//   return (
//     <>
//       <Head>
//         <title>
//         Crypto News | YuvaBitcoin
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 4
//         }}
//       >
//         <Container maxWidth="xl">
//           <Stack spacing={1}>
//             <Typography variant="h3">
//               Crypto News
//             </Typography>
//             <Breadcrumbs separator={<BreadcrumbsSeparator />}>
//               <Link
//                 color="inherit" // Changed to 'inherit'
//                 href={paths.dashboard.index} // Changed to 'href'
//                 passHref // Added to ensure Next.js link behavior
//                 variant="subtitle2"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 color="inherit" // Changed to 'inherit'
//                 href={paths.dashboard.news.index} // Changed to 'href'
//                 passHref // Added to ensure Next.js link behavior
//                 variant="subtitle2"
//               >
//                 News
//               </Link>
//               <Typography
//                 color="text.secondary"
//                 variant="subtitle2"
//               >
//                 List
//               </Typography>
//             </Breadcrumbs>
//           </Stack>
         
//           <Typography variant="h4">
//             Recent Articles
//           </Typography>
//           <Typography
//             color="text.secondary"
//             sx={{ mt: 2 }}
//             variant="body1"
//           >
//             Discover the latest news, tips and user research insights from Acme.
//           </Typography>
//           <Typography
//             color="text.secondary"
//             variant="body1"
//           >
//             You will learn about web infrastructure, design systems and devops APIs best
//             practices.
//           </Typography>
//           <Divider sx={{ my: 4 }} />
//           <Grid
//             container
//             spacing={4}
//           >
//             {news.map((newsArticle) => (
//               <Grid
//                 key={newsArticle.blogId}
//                 item // Changed to 'item'
//                 xs={12}
//                 md={6}
//               >
//               <PostCard
//               href={`/dashboard/news/${newsArticle.blogId}`}
//               authorAvatar="/assets/avatars/avatar-alcides-antonio.png" // Pass a static URL for the default avatar image
//               authorName="yuva Bitcoin" // Pass a static name for the author
//               category="Crypto" // Pass a static category
//               cover="/assets/covers/abstract-1-4x3-large.png" // Pass a static URL for the default cover image
//               publishedAt={newsArticle.createdAt} // Pass a static published date
//               readTime="5 min" // Pass a static read time
//               shortDescription={newsArticle.content} // Pass a static short description
//               title={newsArticle.title}
//               sx={{ height: '100%' }}
//             />
//               </Grid>
//             ))}
//           </Grid>
//           <Stack
//             alignItems="center"
//             direction="row"
//             justifyContent="center"
//             spacing={1}
//             sx={{
//               mt: 4,
//               mb: 8
//             }}
//           >
//             <Button
//               disabled
//             >
//               Newer
//             </Button>
//             <Button>
//               Older news
//             </Button>
//           </Stack>
//           <Box sx={{ mt: 8 }}>
//             <PostNewsletter />
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default Page;





//================================
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { paths } from '../../../paths';

import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Breadcrumbs, Button, Card, Container, Divider, Link, Stack, Typography, Grid } from '@mui/material';
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
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          {/* Card with greeting and button */}
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
          </Card>
          <Typography variant="h4">Recent Articles</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container
spacing={4}>
            {news.map((newsArticle) => (
              <Grid key={newsArticle.blogId}
item
xs={12}
md={6}>
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
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          {/* Pagination buttons */}
          {/* PostNewsletter component */}
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

