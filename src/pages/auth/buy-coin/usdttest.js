import NextLink from "next/link";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import SwitchVertical01Icon from "@untitled-ui/icons-react/build/esm/SwitchVertical01";
import detectEthereumProvider from "@metamask/detect-provider";

import {
  BUSDabi,
  BUSD_TESTNET_CONTRACT_ADDRESS,
} from "../../../sections/dashboard/web3/wallet";

// import {
//   USDTABI,
//   USDT_CONTRACT_ADDRESS,
// } from "../../../sections/dashboard/web3/wallet";

import axios from "axios";
import Web3 from "web3";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

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
import { Layout as AuthLayout } from "../../../layouts/auth/classic-layout";
import { paths } from "../../../paths";

const logoMap = {
  USDT: "/assets/logos/logo-usdt.svg",
  YuvaBitcoin: "/assets/logos/yuvalogo.png",
};

const Page = () => {
  const [hasProvider, setHasProvider] = useState(null);
  // const [provider, setProvider] = useState(null);

  const [rate, setRate] = useState(0);

  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
    getPrice();
  }, []);

  const updateWallet = async (accounts) => {
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
      setRate(response.data[0]?.price?.usdt);
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
      enqueueSnackbar("Connected", { variant: "success" });
    } else {
      enqueueSnackbar("Unable to locate a compatible web3 browser!", {
        variant: "error",
      });
    }
  }


  const ADMIN_WALLET_ADDRESS = "0x8Ec246487834f6C4CAAf2fd67cB1731Cc5C9eB57";

  const buyToken = async () => {
    try {
      console.log(values);
      if (values.amount <= 0 || !values.amount) {
        enqueueSnackbar("Enter Amount", { variant: "error" });
        return;
      }
      const provider = await detectEthereumProvider({ silent: true });
      const web3 = new Web3(provider);

      console.log(wallet.accounts[0]);

      const contract = new web3.eth.Contract(BUSDabi, BUSD_TESTNET_CONTRACT_ADDRESS);

      const response = await contract.methods
        .transfer(
          ADMIN_WALLET_ADDRESS,
          web3.utils.toWei(values.amount, "ether")
        )
        .send({ from: wallet.accounts[0] });

      console.log(response.status);

      const token = localStorage.getItem("accessToken");

      const response2 = await axios.post(
        `${BASEURL}/api/ExternalSwap/createExternalSwap`,
        {
          deposit_type: "usdt",
          wallet_address: wallet.accounts[0],
          transaction_hash: response.transactionHash,
          status: "Pending",
          amount: values.amount,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      enqueueSnackbar("Transaction Success", { variant: "success" });
    } catch (error) {
      console.error("Error: Please Connect Wallet", error);
      enqueueSnackbar("Please Connect Wallet", { variant: "error" });
    }
  };

  useEffect(() => {
    if (window.ethereum === undefined) {
      console.log("Wallet not installed");
    } else {
      // fetchPrice();
    }
  }, []);

  return (
    <div>
      <Card
        sx={{
          width: 1000, // Fixed
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <CardHeader
          title="Buy Yuva Bitcoin"
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

              {/* {wallet.accounts.length > 0 && ( 
              <div>Wallet Accounts: {wallet?.accounts[0]}</div>
            )} */}
            </>
          }
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
            value={values.amount / rate}
            disabled
          />
          <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
            {values.amount} {op.from} = {values.amount / rate} {op.to}
          </Typography>

          <Button
            fullWidth
            onClick={() => buyToken()}
            size="large"
            sx={{ mt: 2, cursor: "pointer" }}
            variant="contained"
          >
            Buy Yuva Bitcoin
          </Button>
          <Box style={{ marginTop: "10px" }}></Box>
        </CardContent>
      </Card>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
