import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { Logo } from "../../components/logo";
import { LogoSamsung } from "../../components/companies-logos/logo-samsung";
import { LogoVisma } from "../../components/companies-logos/logo-visma";
import { LogoBolt } from "../../components/companies-logos/logo-bolt";
import { LogoAws } from "../../components/companies-logos/logo-aws";
import { LogoAccenture } from "../../components/companies-logos/logo-accenture";
import { LogoAtt } from "../../components/companies-logos/logo-att";
import { paths } from "../../paths";

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "neutral.800",
          backgroundImage: 'url("/assets/gradient-bg.svg")',
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          color: "common.white",
          display: "flex",
          flex: {
            xs: "0 0 auto",
            md: "1 1 auto",
          },
          justifyContent: "center",
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box maxWidth="md">
          <Typography sx={{ mb: 1 }}
variant="h4">
            Welcome to <span> Yuva Bitcoin</span>
          </Typography>
          <Typography color="text.secondary"
sx={{ mb: 4 }}>
            Unlocking Knowledge, Empowering Futures: Explore the Intersection of
            Education, Metaverse, and Web3 with Yuva Bitcoin Cryptocurrency.
            Join Us in Shaping the Future of Learning in the Digital Age.
          </Typography>
         <img src="/assets/logos/yuvalogo (1).png"
alt=""
          style={{ 
            maxWidth: '200px', 
            height: 'auto' ,
            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))', // Golden shadow
            animation: 'glow 1s infinite alternate', // Alternate glow animation
            // alignItems: "center",
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          
          }} />
          <style jsx>{`
  @keyframes glow {
    0% {
      filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.7));
    }
    100% {
      filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.7)); // Increase shadow size
    }
  }
`}</style>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={4}
            sx={{
              color: "text.primary",
              "& > *": {
                color: "neutral.400",
                flex: "0 0 auto",
              },
            }}
          >
           
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flex: {
            xs: "1 1 auto",
            md: "0 0 auto",
          },
          flexDirection: "column",
          justifyContent: {
            md: "center",
          },
          maxWidth: "100%",
          p: {
            xs: 4,
            md: 8,
          },
          width: {
            md: 600,
          },
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={NextLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  height: 24,
                  width: 24,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  color: "text.primary",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  lineHeight: 2.5,
                  "& span": {
                    color: "primary.main",
                  },
                }}
              >
                Yuva Bitcoin
              </Box>
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
