import { useCallback, useState } from "react";
import PropTypes from "prop-types";
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

export const DepositOperations = (props) => {
  const [op, setOp] = useState({
    from: "USDT",
    to: "Yuva_Bitcoin",
    
  });

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
          size="large"
          sx={{ mt: 2 }}
          variant="contained">
          Buy {op.to === "BTC" ? "Bitcoin" : "Ethereum"}
        </Button>
      </CardContent>
    </Card>
  );
};

DepositOperations.propTypes = {
  sx: PropTypes.object,
};
