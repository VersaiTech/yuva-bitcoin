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
    // Remove image field from initial state
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2 MB in bytes
      setFormData({ ...formData, image: file });
    } else {
      console.error("Image size should be no more than 2 MB");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': token
      };

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      // Append image only if it exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(`${BASEURL}/api/Blog/createBlog`, formDataToSend, {
        headers: headers
      });

      console.log('News created:', response.data);
      // Reset form data after successful submission if needed
      setFormData({
        title: '',
        content: '',
        image: null,
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
          <Typography variant="subtitle2">
            Upload Image
          </Typography>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
          </label>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Create News
          </Button>
        </Box>
      </form>
    </Box>
  );
};

CreateNewsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateNewsPage;
