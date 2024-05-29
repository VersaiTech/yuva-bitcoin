import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const logoMap = {
  USDT: "/assets/logos/logo-usdt.svg",
  YuvaBitcoin: "/assets/logos/yuvalogo.png",
};


export const ConvertOperations = (props) => {
  const [rate, setRate] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    amount: "",
  });
  
  

  const [op, setOp] = useState({
    from: "USDT",
    to: "YuvaBitcoin",
  });

  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    getPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPrice = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(`${BASEURL}/api/Coin/getAllCoinsUser`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setRate(response.data[0]?.price?.usdt);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertTokensApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${BASEURL}/api/Deposit/convertDepositToCoins`,
        {
          deposit_type: op.from.toLowerCase(), // Correct field name and format for API
          amount: values.amount,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      enqueueSnackbar("Conversion Success", { variant: "success" });
      // Call the prop function to handle conversion success
      props.onConversionSuccess();
    } catch (error) {
      console.error("Error performing conversion:", error);
      enqueueSnackbar("Conversion Failed", { variant: "error" });
    }
  };

  const handleConvert = async () => {
    if (values.amount <= 0 || !values.amount) {
      enqueueSnackbar("Enter a valid amount", { variant: "error" });
      return;
    }

    try {
      await convertTokensApi();
    } catch (error) {
      console.error("Error: Conversion failed", error);
    }
  };

  return (
    <Card
      {...props}
      sx={{
        width: 1000,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <CardHeader title="Convert USDT to Yuva Bitcoin" />
      <CardContent sx={{ pt: 0 }}>
        <TextField
          label="From"
          placeholder="Enter USDT"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  mr: 1,
                  mt: 2.5,
                }}
              >
                <Box
                  component="img"
                  src={logoMap[op.from]}
                  sx={{
                    height: 24,
                    width: 24,
                  }}
                />
              </Box>
            ),
          }}
          type="number"
          value={values.amount}
          onChange={(event) => {
            setValues((prevState) => ({
              ...prevState,
              amount: event.target.value,
            }));
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1,
          }}
        />
        <TextField
          label="To"
          fullWidth
          placeholder="0 Yuva Bitcoin"
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  mr: 1,
                  mt: 2.5,
                }}
              >
                <Box
                  component="img"
                  src={logoMap[op.to]}
                  sx={{
                    height: 24,
                    width: 24,
                  }}
                />
              </Box>
            ),
          }}
          value={values.amount / rate}
          disabled
        />
        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            height: "20px", // Fixed height for the Typography component
            lineHeight: "20px", // Ensures vertical alignment
            opacity: values.amount > 0 ? 1 : 0, // Set opacity based on the amount
            transition: "opacity 0.3s ease", // Smooth transition effect
            overflow: "hidden", // Hide overflow content
          }}
          variant="body2"
        >
          {values.amount > 0 && (
            <>
              {values.amount} {op.from} = {values.amount / rate} {op.to}
            </>
          )}
        </Typography>

        <Button
          fullWidth
          onClick={handleConvert}
          size="large"
          sx={{ mt: 2, cursor: "pointer" }}
          variant="contained"
        >
          Convert USDT To Yuva Bitcoin
        </Button>
        <Box style={{ marginTop: "10px" }}></Box>
      </CardContent>
    </Card>
  );
};

ConvertOperations.propTypes = {
  sx: PropTypes.object,
};
