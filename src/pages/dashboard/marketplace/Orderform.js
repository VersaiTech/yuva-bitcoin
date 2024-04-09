
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListItemIcon,
} from "@mui/material";

const OrderForm = ({ open, handleClose, handlePlaceOrder }) => {
  const [coin, setCoin] = useState(""); // State to hold the selected coin
  const [paymentMethod, setPaymentMethod] = useState(""); // State to hold the selected payment method
  const [amount, setAmount] = useState(""); // State to hold the amount
  const [exchange_currency, setexchange_currency] = useState(""); // State to hold the exchange currency

  const handleCoinChange = (event) => {
    setCoin(event.target.value);
    // Set payment method based on the selected coin
    if (event.target.value === "usdt") {
      setPaymentMethod("YUVA");
    } else if (event.target.value === "yuva") {
      setPaymentMethod("USDT");
    }
  };

  // Function to handle when payment method changes (if you need it)
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Function to handle amount change
  const handleAmountChange = (event) => {
    const { value } = event.target;
    // Allow only positive numbers or empty string (no negative numbers)
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Function to handle exchange currency change
  const handleexchange_currencyChange = (event) => {
    const { value } = event.target;
    // Allow only positive numbers or empty string (no negative numbers)
    if (/^\d*\.?\d*$/.test(value)) {
      setexchange_currency(value);
    }
  };

  const handleSubmit = () => {
    const formData = {
      coin,
      amount,
      exchange_currency
    };
    handlePlaceOrder(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to create a new order.
        </DialogContentText>
        {/* Select field for Coin */}
        <FormControl fullWidth>
          <InputLabel id="coin-label">Coin</InputLabel>
          <Select
            labelId="coin-label"
            id="coin"
            value={coin}
            onChange={handleCoinChange}
            fullWidth
          >
            <MenuItem value="usdt">
              <ListItemIcon>
                <img src="/assets/logos/logo-usdt.svg" alt="USDT" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              USDT
            </MenuItem>
            <MenuItem value="yuva">
              <ListItemIcon>
                <img src="/yuvalogo2.png" alt="YUVA BITCOIN" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              YUVA
            </MenuItem>
          </Select>
        </FormControl>
        {/* Payment Method TextField */}
        <TextField
          margin="dense"
          id="payment_method"
          label="Payment Method"
          type="text"
          fullWidth
          value={paymentMethod} // Set the initial value based on the selected coin
          disabled // Disable the input field
        />
        {/* Amount TextField */}
        <TextField
          margin="dense"
          id="amount"
          label="Coin Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />
        {/* Exchange Currency TextField */}
        <TextField
          margin="dense"
          id="exchange_currency"
          label="Exchange Currency / Coin Amount"
          type="text"
          fullWidth
          value={exchange_currency}
          onChange={handleexchange_currencyChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderForm;


// ******************************************************************

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   ListItemIcon,
// } from "@mui/material";
// import axios from "axios";

// const OrderForm = ({ open, handleClose }) => {
//   const [paymentMethod, setPaymentMethod] = React.useState(""); // State to hold the payment method

//   const formik = useFormik({
//     initialValues: {
//       coin: "",
//       amount: "",
//       exchange_currency: "",
//     },
//     validationSchema: Yup.object({
//       coin: Yup.string().required("Coin is required"),
//       amount: Yup.number()
//         .positive("Amount must be greater than zero")
//         .required("Amount is required"),
//       exchange_currency: Yup.string().required("Exchange Currency is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };
//         const data = {
//           coin: values.coin,
//           amount: values.amount,
//           exchange_currency: values.exchange_currency,
//         };
//         const response = await axios.post(
//           `${BASEURL}/api/Order/createOrder`,
//           data,
//           { headers }
//         );
//         const responseData = response.data;
//         console.log(responseData);
//         // setListings(responseData.order);
//         // handleCloseBuyForm();
//       } catch (error) {
//         console.error("Error placing order:", error);
//       }
//     },
//   });

//   const handleCoinChange = (event) => {
//     const coin = event.target.value;
//     formik.setFieldValue("coin", coin);
//     // Set payment method based on the selected coin
//     if (coin === "USDT") {
//       setPaymentMethod("YUVA BITCOIN");
//     } else if (coin === "YUVA BITCOIN") {
//       setPaymentMethod("USDT");
//     }
//   };

//   const handleAmountChange = (event) => {
//     const { value } = event.target;
//     // Allow only positive numbers or empty string (no negative numbers)
//     if (/^\d*\.?\d*$/.test(value)) {
//       formik.setFieldValue("amount", value);
//     }
//   };

//   const handleexchange_currencyChange = (event) => {
//     const { value } = event.target;
//     // Allow only positive numbers or empty string (no negative numbers)
//     if (/^\d*\.?\d*$/.test(value)) {
//       formik.setFieldValue("exchange_currency", value);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Create Order</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Fill in the details to create a new order.
//         </DialogContentText>
//         <form onSubmit={formik.handleSubmit}>
//           {/* Select field for Coin */}
//           <FormControl fullWidth>
//             <InputLabel id="coin-label">Coin</InputLabel>
//             <Select
//               labelId="coin-label"
//               id="coin"
//               name="coin"
//               value={formik.values.coin}
//               onChange={handleCoinChange}
//               error={formik.touched.coin && Boolean(formik.errors.coin)}
//               fullWidth
//             >
//               <MenuItem value="USDT">
//                 <ListItemIcon>
//                   <img
//                     src="/assets/logos/logo-usdt.svg"
//                     alt="USDT"
//                     style={{ width: 24, height: 24 }}
//                   />
//                 </ListItemIcon>
//                 USDT
//               </MenuItem>
//               <MenuItem value="YUVA BITCOIN">
//                 <ListItemIcon>
//                   <img
//                     src="/yuvalogo2.png"
//                     alt="YUVA BITCOIN"
//                     style={{ width: 24, height: 24 }}
//                   />
//                 </ListItemIcon>
//                 YUVA BITCOIN
//               </MenuItem>
//             </Select>
//           </FormControl>
//           {/* Payment Method TextField */}
//           <TextField
//   margin="dense"
//   id="paymentMethod"
//   name="paymentMethod"
//   label="Default Payment Method"
//   type="text"
//   fullWidth
//   value={paymentMethod}
//   InputProps={{
//     readOnly: true,
//   }}
// />
//           {/* Amount TextField */}
//           <TextField
//             margin="dense"
//             id="amount"
//             name="amount"
//             label="Coin Amount"
//             type="number"
//             fullWidth
//             value={formik.values.amount}
//             onChange={handleAmountChange}
//             error={formik.touched.amount && Boolean(formik.errors.amount)}
//             helperText={formik.touched.amount && formik.errors.amount}
//           />
//           {/* Exchange Currency TextField */}
//           <TextField
//             margin="dense"
//             id="exchange_currency"
//             name="exchange_currency"
//             label="Exchange Currency / Coin Amount"
//             type="text"
//             fullWidth
//             value={formik.values.exchange_currency}
//             onChange={handleexchange_currencyChange}
//             error={
//               formik.touched.exchange_currency &&
//               Boolean(formik.errors.exchange_currency)
//             }
//             helperText={
//               formik.touched.exchange_currency &&
//               formik.errors.exchange_currency
//             }
//           />
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button type="submit" color="primary">
//               Place Order
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OrderForm;
