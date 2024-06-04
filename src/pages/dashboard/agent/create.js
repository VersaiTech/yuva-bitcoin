import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

import * as Yup from "yup";
import axios from "axios";

const OrderForm = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      admin_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'agent',
    },
    validationSchema: Yup.object({
      admin_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...rest } = values; // Exclude confirmPassword from the values
      try {
        const response = await axios.post(`${BASEURL}/api/Auth/admin-register`, rest);
        console.log('Agent added successfully', response.data);
        handleClose();
      } catch (error) {
        console.error('Error adding agent', error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Agent</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for the new agent.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            id="admin_name"
            label="Admin Name"
            type="text"
            fullWidth
            {...formik.getFieldProps('admin_name')}
            error={formik.touched.admin_name && Boolean(formik.errors.admin_name)}
            helperText={formik.touched.admin_name && formik.errors.admin_name}
          />
          <TextField
            margin="dense"
            id="email"
            label="New Agent Gmail"
            type="email"
            fullWidth
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="userType-label">User Type</InputLabel>
            <Select
              labelId="userType-label"
              id="userType"
              label="User Type"
              {...formik.getFieldProps('userType')}
            >
              <MenuItem value="agent">Agent</MenuItem>
              {/* Add more user types here if needed */}
            </Select>
          </FormControl>
          <DialogActions 
          // want to display flex and justify content center
          sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Add Agent
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
