import { useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";
import PropTypes from "prop-types";
import SwitchVertical01Icon from "@untitled-ui/icons-react/build/esm/SwitchVertical01";
import { YUVAABI, USDTABI, USDT_CONTRACT_ADDRESS, YUVA_CONTRACT_ADDRESS } from "./wallet";
import { useSnackbar } from "notistack";
// const ADMIN_WALLET_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Select,
  ButtonGroup,
  TextField,
  Typography,
} from "@mui/material";

const logoMap = {
  USDT: "/assets/logos/logo-usdt.svg",
  YUVA: "/assets/logos/yuvalogo2.png",
  BNB: "/assets/logos/logo-bnb.svg",
  MATIC: "/assets/logos/polygon-matic-logo.svg",
};

export const DepositOperations = (props) => {
  const [hasProvider, setHasProvider] = useState(null);
  const [coin, setCoin] = useState("USDT");
  const [provider, setProvider] = useState(null);

  const [rate, setRate] = useState({
    USDT: 0,
    BNB: 0,
    MATIC: 0,
    YUVA: 1,
  });

  const [wallet, setWallet] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
    getPrice();
  }, []);

  const updateWallet = async (accounts) => {
    console.log({ accounts });
    setWallet({ accounts });
  };

  const getPrice = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(`${BASEURL}/api/Coin/getAllCoinsUser`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setRate((prev) => {
        return {
          ...prev,
          USDT: response.data[0]?.price?.usdt,
          BNB: response.data[0]?.price?.bnb,
          MATIC: response.data[0]?.price?.matic,
        };
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConnect = async () => {
    if (wallet?.accounts?.length > 0) {
      enqueueSnackbar("Already Connected", { variant: "success" });
      return;
    }

    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    amount: "",
    address: "",
  });

  const [op, setOp] = useState({
    from: "USDT",
    to: "YuvaBitcoin",
  });

  async function addNetwork() {
    let network;
    let networkid;
    let params;

    if (window.ethereum) {
      params = [
        {
          chainId: "0x38",
          chainName: "Binance Smart Chain",
          rpcUrls: ["https://bsc-dataseed1.binance.org"],
          blockExplorerUrls: ["https://bscscan.com"],
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
        },
      ];

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params,
      });

      // need to add a token
      const tokenAddress = "0x6faebc4296515aa77adac948d7f51c366a5146aa";

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: "YB",
            decimals: 18,
          },
        },
      });

      enqueueSnackbar("Connected", { variant: "success" });
    } else {
      enqueueSnackbar("Unable to locate a compatible web3 browser!", {
        variant: "error",
      });
    }
  }

  const depositUsdtApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${BASEURL}/api/Deposit/createDeposit`,
        {
          amount: values.amount,
          address: values.address,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      enqueueSnackbar("Deposit Success", { variant: "success" });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // async function connectWallet() {
  //   try {
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     enqueueSnackbar('Connected', { variant: 'success' });
  //     setWeb3Wallet((prevState) => ({
  //       ...prevState,
  //       walletConnect: true
  //     }));
  //   } catch (error) {
  //     enqueueSnackbar('Failed to connect Please try again', { variant: 'error' });
  //     console.log(error);
  //   }
  // }

  const ADMIN_WALLET_ADDRESS = "0xA8fbfb208319335913DA9Db7094Eb2cF2B3F9a53";

  const buyToken = async () => {
    try {
      if (values.amount <= 0 || !values.amount) {
        enqueueSnackbar("Please Enter Amount", { variant: "error" });
        return;
      }
      if (wallet.accounts[0] === undefined) {  
        enqueueSnackbar("Please Connect Wallet", { variant: "error" });
        return;
      }
      const provider = await detectEthereumProvider({ silent: true });
      const web3 = new Web3(provider);

      let response = "";

      if (coin === "USDT") {
        const contract = new web3.eth.Contract(USDTABI, USDT_CONTRACT_ADDRESS);

        response = await contract.methods
          .transfer(
            ADMIN_WALLET_ADDRESS,
            web3.utils.toWei(values.amount, "ether")
          )
          .send({ from: wallet.accounts[0] });
      } else if (coin === "BNB") {
        // console.log(provider);
        // return

        response = await web3.eth.sendTransaction({
          from: wallet.accounts[0],
          to: ADMIN_WALLET_ADDRESS,
          value: web3.utils.toWei(values.amount, "ether"),
        });

        // response = await signer.sendTransaction({
        //   to: ADMIN_WALLET_ADDRESS,
        //   value: web3.utils.toWei(values.amount.toString(), 'ether'),
        // });
      } else if (coin === "MATIC") {
        const contract = new web3.eth.Contract(
          MATICABI,
          MATIC_CONTRACT_ADDRESS
        );

        const response = await contract.methods
          .transfer(
            ADMIN_WALLET_ADDRESS,
            web3.utils.toWei(values.amount, "ether")
          )
          .send({ from: wallet.accounts[0] });
      } else if (coin === "YUVA") {
        const contract = new web3.eth.Contract(YUVAABI, YUVA_CONTRACT_ADDRESS);

        response = await contract.methods
          .transfer(
            ADMIN_WALLET_ADDRESS,
            web3.utils.toWei(values.amount, "ether")
          )
          .send({ from: wallet.accounts[0] });
      }

      const token = localStorage.getItem("accessToken");

      const response2 = await axios.post(
        `${BASEURL}/api/Deposit/createDeposit`,
        {
          deposit_type: coin.toLowerCase(),
          wallet_address: wallet.accounts[0],
          transaction_hash: response.transactionHash,
          // transaction_hash: "1234123412223334",
          amount: values.amount,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // if (response.status === 1) {

      //   console.log(response);

      // }

      enqueueSnackbar("Transaction Success", { variant: "success" });
      // router.push("/dashboard/convert");
      // } else {
      //   enqueueSnackbar("Transaction Failed", { variant: "error" });
      // }

      // Handle the response as needed
    } catch (error) {
      console.error("Error: Transaction failed", error);
      enqueueSnackbar("Transaction Failed", { variant: "error" });
    }
  };

  function fetchPrice() {
    try {
      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      // const response = axios.get(`${BASEURL}/api/Price/getPrice`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (window.ethereum === undefined) {
      console.log("Wallet not installed");
    } else {
      // fetchPrice();
    }
  }, []);

  const handleCoinButtonClick = (selectedCoin) => {
    if (selectedCoin === "BNB" || selectedCoin === "MATIC") {
      enqueueSnackbar("Activating soon", { variant: "info" });
    } else {
      
    }
  };

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
        title={
          <Typography sx={{ letterSpacing: "0.1em" }}>
            Add Coin To Your Wallet
          </Typography>
        }
        action={
          <>
            {hasProvider ? (
              <Box>
                {wallet && wallet?.accounts?.length > 0 ? (
                  <Button onClick={handleConnect}>
                    {wallet?.accounts[0]?.slice(0, 7)}...
                    {wallet?.accounts[0]?.slice(-5)}
                  </Button>
                ) : (
                  <Button onClick={handleConnect}>Connect MetaMask</Button>
                )}
              </Box>
            ) : (
              <Button target="_blank" href="https://metamask.io">
                Install Wallet
              </Button>
            )}

            {hasProvider && (
              <Button onClick={addNetwork}>Add Chain to MetaMask</Button>
            )}
          </>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        <TextField
          label={coin}
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
                  src={logoMap[coin]}
                  sx={{
                    height: 24,
                    width: 24,
                    marginTop: "10px",
                  }}
                />
              </Box>
            ),
            endAdornment: (
              <ButtonGroup variant="text" aria-label="Basic button group">
                <Button onClick={() => handleCoinButtonClick("BNB")} >BNB</Button>
                <Button onClick={() => handleCoinButtonClick("MATIC")} value="Matic" >
                  Matic
                </Button>
                <Button onClick={() => setCoin("USDT")}>USDT</Button>
                <Button onClick={() => setCoin("YUVA")}>YUVA</Button>
              </ButtonGroup>
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
        ></Box>

        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button onClick={() => setValues({ amount: 1 })}>1</Button>
          <Button onClick={() => setValues({ amount: 2 })}>2</Button>
          <Button onClick={() => setValues({ amount: 5 })}>5</Button>
          <Button onClick={() => setValues({ amount: 10 })}>10</Button>
          <Button onClick={() => setValues({ amount: 20 })}>20</Button>
        </ButtonGroup>
        <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
          {values.amount} {coin} = {values.amount / rate[coin]} {op.to}
        </Typography>

        <Button
          fullWidth
          onClick={() => buyToken()}
          size="large"
          sx={{ mt: 2, cursor: "pointer" }}
          variant="contained"
        >
          Add {coin}
        </Button>
        <Box style={{ marginTop: "10px" }}></Box>
      </CardContent>
    </Card>
  );
};

DepositOperations.propTypes = {
  sx: PropTypes.object,
};


  