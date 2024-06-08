// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, Box, Paper, Typography } from '@mui/material';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';

// const SetCoin = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   const formik = useFormik({
//     initialValues: {
//       usdt: '',
//       matic: '',
//       bnb: '',
//     },
//     validationSchema: Yup.object({
//       usdt: Yup.number().required('Required').positive('Must be positive'),
//       matic: Yup.number().required('Required').positive('Must be positive'),
//       bnb: Yup.number().required('Required').positive('Must be positive'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         console.log(values);
//         const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//         const token = localStorage.getItem("accessToken");
//         const headers = { Authorization: token };
//         const response = await axios.post(`${BASEURL}/api/Coin/setCoinPrices`, values, { headers: headers });

//         if (response.status === 200) {
//           enqueueSnackbar('Prices set successfully', { variant: 'success' });
//           console.log('Prices set successfully', response.data);
//         } else {
//           enqueueSnackbar('Failed to set prices', { variant: 'error' });
//         }
//       } catch (error) {
//         enqueueSnackbar('Error setting prices', { variant: 'error' });
//         console.error('Error setting prices', error);
//       }
//     },
//   });

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
//       <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 1000 }}>
//         <Typography variant="h6" align="center" sx={{ mb: 2 }}>
//           Set Coin Prices
//         </Typography>
//         <Box
//           component="form"
//           sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
//           onSubmit={formik.handleSubmit}
//         >
//           <TextField
//             label="USDT"
//             name="usdt"
//             value={formik.values.usdt}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.usdt && Boolean(formik.errors.usdt)}
//             helperText={formik.touched.usdt && formik.errors.usdt}
//             sx={{ mb: 2, width: '100%' }}
//           />
//           <TextField
//             label="MATIC"
//             name="matic"
//             value={formik.values.matic}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.matic && Boolean(formik.errors.matic)}
//             helperText={formik.touched.matic && formik.errors.matic}
//             sx={{ mb: 2, width: '100%' }}
//           />
//           <TextField
//             label="BNB"
//             name="bnb"
//             value={formik.values.bnb}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.bnb && Boolean(formik.errors.bnb)}
//             helperText={formik.touched.bnb && formik.errors.bnb}
//             sx={{ mb: 2, width: '100%' }}
//           />
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//             Set Coin Prices
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default SetCoin;





import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Paper, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const SetCoin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [initialValues, setInitialValues] = useState({ usdt: '', matic: '', bnb: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: token };
        const response = await axios.get(`${BASEURL}/api/Coin/getAllCoinsUser`, { headers: headers });

        if (response.status === 200) {
            const data = response.data[0]?.price || { usdt: '', matic: '', bnb: '' };
          setInitialValues({
            usdt: data.usdt || '',
            matic: data.matic || '',
            bnb: data.bnb || '',
          });
          setLoading(false);
        } else {
          enqueueSnackbar('Failed to fetch coin data', { variant: 'error' });
          setLoading(false);
        }
      } catch (error) {
        enqueueSnackbar('Error fetching coin data', { variant: 'error' });
        console.error('Error fetching coin data', error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [enqueueSnackbar]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Enable reinitialization of the form
    validationSchema: Yup.object({
      usdt: Yup.number().required('Required').positive('Must be positive'),
      matic: Yup.number().required('Required').positive('Must be positive'),
      bnb: Yup.number().required('Required').positive('Must be positive'),
    }),
    onSubmit: async (values) => {
      try {
        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: token };
        const response = await axios.post(`${BASEURL}/api/Coin/setCoinPrices`, values, { headers: headers });

        if (response.status === 200) {
          enqueueSnackbar('Prices set successfully', { variant: 'success' });
          console.log('Prices set successfully', response.data);
        } else {
          enqueueSnackbar('Failed to set prices', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error setting prices', { variant: 'error' });
        console.error('Error setting prices', error);
      }
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Set Coin Prices
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="USDT"
            name="usdt"
            value={formik.values.usdt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.usdt && Boolean(formik.errors.usdt)}
            helperText={formik.touched.usdt && formik.errors.usdt}
            sx={{ mb: 2, width: '100%' }}
          />
          <TextField
            label="MATIC"
            name="matic"
            value={formik.values.matic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.matic && Boolean(formik.errors.matic)}
            helperText={formik.touched.matic && formik.errors.matic}
            sx={{ mb: 2, width: '100%' }}
          />
          <TextField
            label="BNB"
            name="bnb"
            value={formik.values.bnb}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bnb && Boolean(formik.errors.bnb)}
            helperText={formik.touched.bnb && formik.errors.bnb}
            sx={{ mb: 2, width: '100%' }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Set Coin Prices
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SetCoin;
