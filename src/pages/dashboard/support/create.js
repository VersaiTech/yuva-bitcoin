import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, TextField, Button, Stack, Grid, Paper } from '@mui/material';
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { usePageView } from '../../../hooks/use-page-view';

const SupportPage = () => {
  usePageView();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log(formData);
    // Reset form data after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
      <Head>
        <title>Support | Your Website Name</title>
      </Head>
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, mt: 1 }}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={12} md={6} >
            <Box sx={{ pr: { md: 1 }, height: "100%", pl: { md: 5 } }}>
              <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
                Customer Support
              </Typography>
              <form onSubmit={(event) => event.preventDefault()}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      User Name
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="userName"
                      required
                      placeholder="Enter your name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Email
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Contact No.
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="contactNo"
                      type="tel"
                      required
                      placeholder="Enter your contact number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Query
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      name="query"
                      multiline
                      rows={4}
                      required
                      placeholder="Enter your query"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100%", // Adjust the width as needed
                      backgroundColor: "green", // Set the background color to green
                      color: "white", // Set the text color to white
                      "&:hover": {
                        backgroundColor: "darkgreen", // Change background color on hover
                      },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                pl: { md: 1 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%", // Ensure the grid item fills the Paper's height
              }}
            >
              <img
                src="/assets/gallery/gallery-4.jpg"
                alt="Image"
                style={{ maxWidth: "100%", height: "95%" }} // Ensure the image fills the available space
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
    </>
  );
};

SupportPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SupportPage;
