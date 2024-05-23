import { useEffect, useState } from "react";
import Web3 from "web3";
import PropTypes from "prop-types";
import SwitchVertical01Icon from "@untitled-ui/icons-react/build/esm/SwitchVertical01";
import { CONTRACT, USDTABI, USDT_CONTRACT_ADDRESS } from "./wallet";
import { useSnackbar } from "notistack";
// const ADMIN_WALLET_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
import detectEthereumProvider from "@metamask/detect-provider";

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
  const [hasProvider, setHasProvider] = useState(null);
  const [provider, setProvider] = useState(null);

  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    const checkProvider = async () => {
      if (window.ethereum) {
        setProvider(window.ethereum);
      } else {
        console.error("MetaMask not detected.");
      }
    };

    checkProvider();
  }, []);
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
      if (provider) {
        setProvider(provider);
      }
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
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
    to: "Yuva_Bitcoin",
  });

  async function addNetwork() {
    let network;
    let params;

    if (window.ethereum) {
      network = await window.ethereum.request({ method: "eth_chainId" });
      network = parseInt(network.slice(2), 16).toString();
      if (network === "1") {
        network = "97";
      }
      if (network === "97") {
        enqueueSnackbar("Connected", { variant: "success" });
      } else {
        params = [
          {
            chainId: "0xEEBB",
            chainName: "BNB Smart Chain",
            rpcUrls: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"],
            blockExplorerUrls: ["https://testnet.bscscan.com"],
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
      }
    } else {
      enqueueSnackbar("Unable to locate a compatible web3 browser!", {
        variant: "error",
      });
    }
  }

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

  const ADMIN_WALLET_ADDRESS = "0x8Ec246487834f6C4CAAf2fd67cB1731Cc5C9eB57";

  const buyToken = async () => {
    try {
      const provider = await detectEthereumProvider({ silent: true });
      const web3 = new Web3(provider);

      console.log(wallet.accounts[0]);

      const contract = new web3.eth.Contract(
        USDTABI,
        USDT_CONTRACT_ADDRESS
      );

      const response = await contract.methods
        .transfer(
          ADMIN_WALLET_ADDRESS,
          web3.utils.toWei(values.amount, "ether")
        )
        .send({ from: wallet.accounts[0]});

      console.log(response);

      // Handle the response as needed
    } catch (error) {
      console.error("Error fetching data:", error);
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
        title="Buy Yuva Bitcoin"
        action={
          <>
            {hasProvider ? (
              <Box>
                {wallet && wallet?.accounts?.length > 0 ? (
                  <Button onClick={handleConnect}>
                    {wallet?.accounts[0]?.slice(0, 7)}...{wallet?.accounts[0]?.slice(-5)}
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
          value="5.9093"
        />
        <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
          {values.amount} {op.from} = {values.amount} {op.to}
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
  );
};

DepositOperations.propTypes = {
  sx: PropTypes.object,
};

