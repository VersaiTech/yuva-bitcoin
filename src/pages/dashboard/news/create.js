


import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { QuillEditor } from '../../../components/quill-editor';
import Head from 'next/head';
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import axios from "axios";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const CreateNewsPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': token
      };
  
      // Convert HTML content to plain text
      const plainTextContent = formData.content.replace(/<[^>]+>/g, '');
  
      const response = await axios.post(`${BASEURL}/api/Blog/createBlog`, { ...formData, content: plainTextContent }, {
        headers: headers
      });
  
      console.log('News created:', response.data);
      // Reset form data after successful submission if needed
      setFormData({
        title: '',
        content: '',
      });
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Create News</title>
      </Head>
      <Typography variant="h4" gutterBottom>
        Create News
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Typography sx={{ mt: 3 }} variant="subtitle2">
          Content
        </Typography>
        <QuillEditor
          placeholder="Write something"
          sx={{ height: 400 }}
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Box sx={{ mt: 3 }}>
  <Button type="submit" variant="contained" color="primary">
    Create News
  </Button>
  
  <Button 
    variant="outlined" 
    color="primary" 
    sx={{ ml: 2 }} 
    

    
  >
    Cancel
    
  </Button>
</Box>

      </form>
    </Box>
  );
};

CreateNewsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateNewsPage;
