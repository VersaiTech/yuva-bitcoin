import { useEffect, useState } from "react";
import Web3 from 'web3';
import PropTypes from "prop-types";
import { BrowserProvider, ethers } from 'ethers'
import SwitchVertical01Icon from "@untitled-ui/icons-react/build/esm/SwitchVertical01";
import { CONTRACT, BUSDabi, BUSD_TESTNET_CONTRACT_ADDRESS } from './wallet';
import { useSnackbar } from 'notistack';
const ADMIN_WALLET_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL


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

  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    amount: '',
    address: '',
  })

  const [web3Wallet, setWeb3Wallet] = useState({
    walletAddress: '',
    balance: '',
    allowance: '',
    tokens: '',
    chainID: '',
    walletConnect: false,
    provider: '',
  });

  const [op, setOp] = useState({
    from: "USDT",
    to: "Yuva_Bitcoin",
  });

  const [userDetails, setUserDetails] = useState({
    wallet: '',
    username: '',
    memberId: ''
  });



  const web3 = new Web3(Web3.givenProvider || "https://mainnet.infura.io/v3/3840775933b94a0ca2cc13fa742a2b43");


  async function getBalance(useradd) {

    try {
      const bnb = await web3.eth.getBalance(useradd);
      console.log(bnb)

    } catch (error) {
      console.log(error)
    }

    return true;
  }

  async function addNetwork() {
    let network;
    let params;

    if (typeof web3 !== 'undefined') {
      network = await web3.eth.getChainId().then((id) => id);
      if (network === 1n) {
        network = 97;
      }
      if (network === 97) {
        enqueueSnackbar('Connected', { variant: 'success' });
      } else {
        params = [
          {
            chainId: '0xEEBB',
            chainName: 'BNB Smart Chain Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'],
            blockExplorerUrls: ["https://testnet.bscscan.com"]
          }
        ];

        window.ethereum
          .request({ method: 'wallet_addEthereumChain', params })
          .then(() => {
            console.log('Success');
            window.location.reload();
          })
          .catch((error) => console.log('Error', error.message));
        enqueueSnackbar('Connected', { variant: 'success' });
      }
    } else {
      enqueueSnackbar('Unable to locate a compatible web3 browser!', { variant: 'error' });
    }
  }

  async function fetchData() {
    try {
      // set bnb testnet
      web3.eth.net.getId().then(async (netId) => {

        // console.log(await web3.utils.fromWei(await netId));

        console.log(netId)

        setWeb3Wallet((prevState) => ({
          ...prevState,
          chainID: netId
        }));
      })
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (address) => {
        window.userAddress = address[0];
        console.log(address[0])

        setUserDetails((prevState) => ({
          ...prevState,
          wallet: address[0]
        }));
        try {
          await getBalance(address[0]);
          setWeb3Wallet((prevState) => ({
            ...prevState,
            walletAddress: address[0]
          }));

        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      enqueueSnackbar('Connected', { variant: 'success' });
      setWeb3Wallet((prevState) => ({
        ...prevState,
        walletConnect: true
      }));
    } catch (error) {
      enqueueSnackbar('Failed to connect Please try again', { variant: 'error' });
      console.log(error);
    }
  }

  const ADMIN_WALLET_ADDRESS = '0x8Ec246487834f6C4CAAf2fd67cB1731Cc5C9eB57';

  // Minimal ABI to interact with ERC20's transfer function


  async function buyCoin() {
    if (!web3Wallet || !web3Wallet.walletConnect) {
      enqueueSnackbar('Please connect your wallet', { variant: 'error' });
      return;
    }

    try {

      const provider = new Web3(window.ethereum);

      if (!provider) {
        enqueueSnackbar('Web3 Provider not found', { variant: 'error' });
        return;
      }

      const contract = new provider.eth.Contract(BUSDabi, BUSD_TESTNET_CONTRACT_ADDRESS);
      const amountToSend = provider.utils.toWei(values.amount, 'ether');

      const gasEstimate = await contract.methods.transfer(ADMIN_WALLET_ADDRESS, amountToSend).estimateGas({ from: web3Wallet.walletAddress });

      const tx = await contract.methods.transfer(ADMIN_WALLET_ADDRESS, amountToSend).send({
        from: web3Wallet.walletAddress,
        gas: gasEstimate,
      });

      console.log(tx);
      enqueueSnackbar('Transaction successful!', { variant: 'success' });
      // const tx = await CONTRACT.methods.transfer(BUSD_TESTNET_CONTRACT_ADDRESS, amountToSend).send({ from: web3Wallet.walletAddress });

      // const receipt = await tx.wait();

      if (receipt.status === 1) {
        enqueueSnackbar('Transaction successful!', { variant: 'success' });
      } else {
        enqueueSnackbar('Transaction failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Transaction failed. Please try again.', { variant: 'error' });
    }
  }

  function fetchPrice() {
    const response = axios.get(`${BASEURL}/api/Price/getPrice`);

  }




  useEffect(() => {
    if (window.ethereum === undefined) {
      console.log("Wallet not installed");
    } else {
      fetchData();
      fetchPrice();
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
        title="Buy Bitcoin"
        action={
          <>
            {web3Wallet.walletConnect ? <Button onClick={addNetwork}>Switch Network</Button> : <Button onClick={connectWallet}>Connect</Button>}
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
              amount: event.target.value
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
        <Typography color="text.secondary"
          sx={{ mt: 2 }}
          variant="body2">
          1 BTC = $20,024.90
        </Typography>

        <Button fullWidth
          onClick={() => buyCoin()}
          size="large"
          sx={{ mt: 2, cursor: "pointer" }}
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
