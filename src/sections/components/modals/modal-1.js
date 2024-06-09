import Attachment01Icon from "@untitled-ui/icons-react/build/esm/Attachment01";
import Expand01Icon from "@untitled-ui/icons-react/build/esm/Expand01";
import * as Yup from "yup";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { useFormik } from "formik";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Paper,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import { QuillEditor } from "../../../components/quill-editor";
import { useRef, useEffect } from "react";
import { TextFields } from "@mui/icons-material";
import { useState } from "react";
import { useSnackbar } from "notistack";

const validationSchema = Yup.object({
  member_name: Yup.string().max(255),
  contactNo: Yup.string().matches(/^\d{10}$/, "Invalid phone number"),
  wallet_address: Yup.string()
    .required("Wallet Address is required")
    .min(15, "Must be atleast 15 characters"),
  twitterId: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Please enter a valid Twitter username without "@"'
    )
    .max(60, "Must be at most 60 characters")
    .required("Twitter ID is required"),
});

const ModalContent = ({ handleCloseModal, memberData }) => {
  console.log(memberData);
  const {enqueueSnackbar}=useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // State to track component mounting

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component mounts
    return () => {
      setIsMounted(false); // Set isMounted to false when component unmounts
    };
  }, []);

  const initialValues = memberData
    ? {
        member_name: memberData.member_name,
        contactNo: memberData.contactNo,
        wallet_address: memberData.wallet_address,
        twitterId: memberData.twitterId
      }
    : {
        member_name: "",
        contactNo: "",
        wallet_address: "",
        twitterId:"",
      };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const headers = {
          Authorization: token,
        };

        // Prepare request body for posting new review
        const requestBody = {
          member_name: values.member_name,
          contactNo: values.contactNo,
          wallet_address: values.wallet_address,
          twitterId:values.twitterId,
        };
        // Make POST request using Axios
        const response = await axios.post(
          `${BASEURL}/admin/updateMemberDetails`,
          requestBody,
          {
            headers: headers,
          }
        );
        console.log("Form values:", response.data); // Log response data
        if (response.status === 200) {
          // Enqueue success notification
          enqueueSnackbar("Updated Successfully", { variant: "success" });
          handleCloseModal(); // Close modal on successful submission
          // if (isMounted) {
          //   window.location.href = "/dashboard/social/profile";
          // }
        }
        // if (isMounted) {
        //   window.location.href = "/dashboard/social/profile";
        // }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: 4 }}>
        Edit Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="name"
            name="member_name"
            label="Name"
            variant="outlined"
            value={formik.values.member_name}
            onChange={formik.handleChange}
            error={
              formik.touched.member_name && Boolean(formik.errors.member_name)
            }
            helperText={formik.touched.member_name && formik.errors.member_name}
          />
          {/* <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          /> */}
          <TextField
            fullWidth
            id="contactNo"
            name="contactNo"
            label="Contact"
            variant="outlined"
            value={formik.values.contactNo}
            onChange={formik.handleChange}
            error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
            helperText={formik.touched.contactNo && formik.errors.contactNo}
          />
          <TextField
            fullWidth
            id="wallet_address"
            name="wallet_address"
            label="Wallet Address"
            variant="outlined"
            value={formik.values.wallet_address}
            onChange={formik.handleChange}
            error={
              formik.touched.wallet_address &&
              Boolean(formik.errors.wallet_address)
            }
            helperText={
              formik.touched.wallet_address && formik.errors.wallet_address
            }
          />
          <TextField
            fullWidth
            id="twitterId"
            name="twitterId"
            label="Twitter ID"
            variant="outlined"
            value={formik.values.twitterId}
            onChange={formik.handleChange}
            error={formik.touched.twitterId && Boolean(formik.errors.twitterId)}
            helperText={formik.touched.twitterId && formik.errors.twitterId}
          />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ModalContent;

export const Modal1 = ({ open, handleCloseModal,memberData }) => {
  const modalRef = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       handleCloseModal();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [handleCloseModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseModal]);

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
      ref={modalRef}
    >
      <Paper
        elevation={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Vertically center the content
          alignItems: "center", // Horizontally center the content
          margin: 3,
          maxWidth: "100%",
          minHeight: 500,
          mx: "auto",
          outline: "none",
          width: 600,
          position: "fixed",
          top: "50%", // Align the top to the vertical center
          left: "50%", // Align the left to the horizontal center
          transform: "translate(-40%, -50%)", // Center the modal
          // backgroundColor: "white", // Semi-transparent backdrop
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          zIndex: 9999,
          boxShadow: "0px 4px 22px rgba(0, 0, 0, 0.1)",
          padding: 3, // Add padding for better appearance
        }}
      >
        <ModalContent handleCloseModal={handleCloseModal} memberData={memberData} />
      </Paper>
    </Box>
  );
};
