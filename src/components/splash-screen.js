import { Box } from '@mui/material';
import Image from 'next/image';

export const SplashScreen = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 1400
    }}
  >
    <Box
      sx={{
        display: 'inline-flex',
        height: 48,
        width: 48
      }}
    >
    <Image src="/assets/logo/yuvalogo (1).png" alt="Yuva Logo" width={25} height={25} />
    </Box>
  </Box>
);
