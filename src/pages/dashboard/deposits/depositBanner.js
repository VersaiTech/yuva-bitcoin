import { useEffect, useState } from "react";
import Web3 from 'web3';
import PropTypes from "prop-types";
import { BrowserProvider, ethers } from 'ethers'
import SwitchVertical01Icon from "@untitled-ui/icons-react/build/esm/SwitchVertical01";
import { CONTRACT, CONTRACT_ADDRESS } from './wallet';


import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";


const logoMap = {
  USDT: "/assets/logos/logo-usdt.svg",
  Yuva_Bitcoin: "/assets/logos/logo-eth.svg",
};



export const DepositOperations = (props) => {
  const [op, setOp] = useState({
    from: "USDT",
    to: "Yuva_Bitcoin",
  });
  const [userDetails, setUserDetails] = useState({
    wallet: '',
    username: '',
    memberId: ''
  });
  const [values, setValues] = useState({
    chainID: '',
    gaurachain: '',
    gusdbal: '',
    stakeAmount: '',
    paymentOption: '',
    xpicbal: '',
    xpicpbal: ''
  });



  const web3 = new Web3(Web3.givenProvider || "https://mainnet.infura.io/v3/3840775933b94a0ca2cc13fa742a2b43");


  async function checkAllowance(useradd, CONTRACT_ADDRESS) {
    // const Allowance = await GUSD_CONTRACT.methods.allowance(useradd, CONTRACT_ADDRESS).call();
    return 100;
  }

  async function getBalance(useradd) {
    try {
      const bnb = await web3.eth.getBalance(useradd);
      console.log(bnb)

    } catch (error) {
      console.log(error)
    }
    
    return true;
  }

  async function fetchData() {
    try {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (address) => {
        // eslint-disable-next-line prefer-destructuring
        window.userAddress = address[0];
        console.log(address[0])

        setUserDetails((prevState) => ({
          ...prevState,
          wallet: address[0]
        }));
        try {
          await getBalance(address[0]);
          // const allowance = checkAllowance(address[0], CONTRACT_ADDRESS);
          // console.log(allowance);
          // setValues((prevState) => ({
          //   ...prevState,
          //   allowance
          // }));
          // return address[0];
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (window.ethereum === undefined) {
      console.log("Wallet not installed");
    } else {
      fetchData();
    }





    // try {
    //   getChainId();
    // } catch (error) {
    //   console.log(error);
    // }


  }, []);





  return (
    <Card
      {...props}
      sx={{
        width: 1000, // Fixed
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <CardHeader
        title="Buy Bitcoin"
      />
      <CardContent sx={{ pt: 0 }}>
        <TextField
          label="From"
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
          value="0.4567"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1,
          }}
        >
          <IconButton>
            <SvgIcon fontSize="small">
              <SwitchVertical01Icon />
            </SvgIcon>
          </IconButton>
        </Box>
        <TextField
          label="To"
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
                  src={logoMap[op.to]}
                  sx={{
                    height: 24,
                    width: 24,
                  }}
                />
              </Box>
            ),
          }}
          value="5.9093"
        />
        <Typography color="text.secondary"
          sx={{ mt: 2 }}
          variant="body2">
          1 BTC = $20,024.90
        </Typography>

        <Button fullWidth
          onClick={() => fetchData()}
          size="large"
          sx={{ mt: 2 }}
          variant="contained">
          Buy Yuva Bitcoin
        </Button>
        <Box style={{ marginTop: "10px" }}>

        </Box>
      </CardContent>
    </Card>
  );
};

DepositOperations.propTypes = {
  sx: PropTypes.object,
};
