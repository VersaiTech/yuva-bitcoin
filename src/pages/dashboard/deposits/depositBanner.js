import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BrowserProvider, ethers } from 'ethers'
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import SwitchVertical01Icon from "@untitled-ui/icons-react/build/esm/SwitchVertical01";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";


const logoMap = {
  USDT: "/assets/logos/logo-usdt.svg",
  Yuva_Bitcoin: "/assets/logos/logo-eth.svg",
};



// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '2d4f4924a93eeb998168cd328fae4f23'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const tronMainnet = {
  chainId: 1, // Tron mainnet chain ID
  name: "Tron",
  currency: "TRX",
  explorerUrl: "https://tronscan.io", // Tron block explorer
  rpcUrl: "https://api.tron.network", // Tron mainnet RPC URL
};

export const DepositOperations = (props) => {
  const [op, setOp] = useState({
    from: "USDT",
    to: "Yuva_Bitcoin",

  });

  const { walletProvider } = useWeb3ModalProvider()



  const { address, isConnected } = useWeb3ModalAccount()


  const handleClick = () => {
    console.log(ethers);
  }

  const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; 

  async function onSignMessage() {
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const signature = await signer?.signMessage('Hello Web3Modal Ethers')
    console.log(signature)
  }

  async function onSendTronUSDTTransaction() {
    try {
      const signedTransaction = {
        from: address,
        to: "TNZy9FKgBYaKCfDkDKiGSv29umeZycrXpx",
        value: ethers.utils.parseUnits("1", 18),
        gasPrice: ethers.utils.parseUnits("100", "gwei"),
        gasLimit: 21000,
        nonce: 0,
      };
      const txHash = await provider.sendTransaction(signedTransaction);

      const receipt = await transactionResponse.wait();
      console.log("Transaction receipt:", receipt);
    } catch (error) {
      console.error("Failed to send Tron USDT transaction:", error);
    }
  }




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
          onClick={() => handleClick()}
          size="large"
          sx={{ mt: 2 }}
          variant="contained">
          Buy Yuva Bitcoin
        </Button>
        <Box style={{ marginTop: "10px" }}>


          <w3m-button />
        </Box>
      </CardContent>
    </Card>
  );
};

DepositOperations.propTypes = {
  sx: PropTypes.object,
};
