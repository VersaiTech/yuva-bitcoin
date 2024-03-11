import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { QuillEditor } from '../../../components/quill-editor';
import Head from 'next/head';
import { Layout as DashboardLayout } from "../../../layouts/dashboard";

const CreateNewsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
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
      // Show an error message or take appropriate action
      console.error("Image size should be no more than 2 MB");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Typography sx={{ mt: 3 }} variant="subtitle2">
          Description
        </Typography>
        <QuillEditor
          placeholder="Write something"
          sx={{ height: 400 }}
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
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
