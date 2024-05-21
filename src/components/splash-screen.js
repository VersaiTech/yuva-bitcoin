// import { Box } from '@mui/material';
// import Image from 'next/image';

// export const SplashScreen = () => (
//   <Box
//     sx={{
//       alignItems: 'center',
//       backgroundColor: 'background.paper',
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       justifyContent: 'center',
//       left: 0,
//       p: 3,
//       position: 'fixed',
//       top: 0,
//       width: '100vw',
//       zIndex: 1400
//     }}
//   >
//     <Box
//       sx={{
//         display: 'inline-flex',
//         height: 48,
//         width: 48
//       }}
//     >
//     <img src="/assets/logo/yuvalogo (1).png" alt="Yuva Logo" width={25} height={25} />
//     </Box>
//   </Box>
// );







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
        height: 100,
        width: 100,
        animation: 'pulse 2s infinite'
      }}
    >
      <Image src="/assets/logos/yuvalogo.png" 
      alt="Ecommerce" 
      width={100} 
      height={100} />
      {/*<Image src="/assets/images/Furniture Shop/RoundSofa.png" alt="Ecommerce" width={100} height={100} />*/}
    </Box>

    <style jsx global>{`
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </Box>
);

export default SplashScreen;
