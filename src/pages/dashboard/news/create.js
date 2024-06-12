// import { useRouter } from "next/navigation";
// import { paths } from "../../../paths";
// import { useState } from 'react';
// import { Box, Button, TextField, Typography , Input  } from '@mui/material';

// import { QuillEditor } from '../../../components/quill-editor';
// import Head from 'next/head';
// import { Layout as DashboardLayout } from "../../../layouts/dashboard";
// import axios from "axios";
// import toast from "react-hot-toast";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const CreateNewsPage = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const token = localStorage.getItem('accessToken');
//       const headers = {
//         'Authorization': token
//       };

//       // Convert HTML content to plain text
//       const plainTextContent = formData.content.replace(/<[^>]+>/g, '');

//       const response = await axios.post(`${BASEURL}/api/Blog/createBlog`, { ...formData, content: plainTextContent }, {
//         headers: headers
//       });
//       toast.success("News created");

//       router.push(paths.dashboard.news.list);

//       console.log('News created:', response.data);
//       // Reset form data after successful submission if needed
//       setFormData({
//         title: '',
//         content: '',
//       });
//     } catch (error) {
//       console.error('Error creating news:', error);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Head>
//         <title>Create News</title>
//       </Head>
//       <Typography variant="h4" gutterBottom>
//         Create News
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//         <Typography sx={{ mt: 3 }} variant="subtitle2">
//           Content
//         </Typography>
//         <QuillEditor
//           placeholder="Write something"
//           sx={{ height: 400 }}
//           value={formData.content}
//           onChange={(value) => setFormData({ ...formData, content: value })}
//         />
//         <Typography sx={{ mt: 3 }} variant="subtitle2">
//           File
//         </Typography>
//         <Input
//           type="file"
//           fullWidth
//           onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
//         />
//         <Box sx={{ mt: 3 }}>
//   <Button type="submit" variant="contained" color="primary">
//     Create News
//   </Button>

//   <Button
//     variant="outlined"
//     color="primary"
//     sx={{ ml: 2 }}

//   >
//     Cancel

//   </Button>
// </Box>

//       </form>
//     </Box>
//   );
// };

// CreateNewsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default CreateNewsPage;

import { useRouter } from "next/navigation";
import { paths } from "../../../paths";
import { useState } from "react";
import { Box, Button, TextField, Typography, Input } from "@mui/material";
import { QuillEditor } from "../../../components/quill-editor";
import Head from "next/head";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import axios from "axios";
import toast from "react-hot-toast";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const CreateNewsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `${token}`,
      };

      // Convert HTML content to plain text
      const plainTextContent = formData.content.replace(/<[^>]+>/g, "");

      // Upload image first
      let imageUrls = [];
      if (formData.file) {
        const formDataFile = new FormData();
        formDataFile.append("image", formData.file);

        const uploadResponse = await axios.post(
          "https://images.yuvabitcoin.com/upload",
          formDataFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Upload response:", uploadResponse);
        imageUrls.push(uploadResponse.data.imageUrl);
      }

      const accessToken = localStorage.getItem("accessToken");

      // Create news with the uploaded image URL
      const response = await axios.post(
        `${BASEURL}/api/Blog/createBlog`,
        { title: formData.title, content: plainTextContent, imageUrls },
        { headers }
      );

      toast.success("News created");
      router.push(paths.dashboard.news.list);

      console.log("News created:", response.data);
      // Reset form data after successful submission if needed
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("Failed to create news");
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
        <Typography sx={{ mt: 3 }} variant="subtitle2">
          File
        </Typography>
        <Input type="file" fullWidth onChange={handleFileChange} />
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Create News
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ ml: 2 }}
            onClick={() => router.push(paths.dashboard.news.list)}
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
