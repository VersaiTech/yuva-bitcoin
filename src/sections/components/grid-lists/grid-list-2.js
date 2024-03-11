import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
import numeral from "numeral";
import HeartIcon from "@untitled-ui/icons-react/build/esm/Heart";
import Users01Icon from "@untitled-ui/icons-react/build/esm/Users01";
import { formatDistanceToNowStrict } from "date-fns";
import { useState,useEffect } from "react"; // Add useState import
import { Modal4 } from "../modals/modal-4";

const wallets = [
  {
    id: "1",
    logo: "/assets/wallets/bitcoin.png",
    name: "Bitcoin",
  },
  {
    id: "2",
    logo: "/assets/wallets/ethereum.png",
    name: "Ethereum",
  },
  {
    id: "3",
    logo: "/assets/wallets/binance-coin.png",
    name: "Binance Coin",
  },
  {
    id: "4",
    logo: "/assets/wallets/litecoin.png",
    name: "Litecoin",
  },
  {
    id: "5",
    logo: "/assets/wallets/cardano.png",
    name: "Cardano",
  },
  // Add more wallets as needed
];

export const GridList2 = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal open/close

  const handleCardClick = () => {
    setIsModalOpen(true); // Open modal when card is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of modal and close it
    const handleClickOutside = (event) => {
      if (event.target.closest('.modal-content') === null) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          p: 3,
        }}
      >
        <Grid container spacing={3}>
          {projects.map((project) => {
            // const updatedAgo = formatDistanceToNowStrict(project.updatedAt);
            const budget = numeral(project.budget).format(
              `${project.currency}0,0.00`
            );

            return (
              <Grid key={project.id} item xs={12} md={6}>
                <Box mt={2} mb={2}>
                  {" "}
                  {/* Add margin top and bottom */}
                  <Card onClick={handleCardClick}
                  sx={{
                    p: 2,
                    borderRadius: 8, // Add some border radius for a softer look
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s ease-in-out", // Add a transition for hover effect
                    "&:hover": {
                      transform: "scale(1.02)", // Scale up slightly on hover for an interactive feel
                    },
                  }}>
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          mt: 2,
                        }}
                      >
                        <Avatar src={project.currency.avatar} />
                        <Box sx={{ ml: 2 }}>
                          <Link color="text.primary" variant="h6">
                            {project.name}
                          </Link>
                          <Typography color="text.secondary" variant="body2">
                            Volume -{" "}
                            <Link color="text.primary" variant="subtitle2">
                              {project.volume}
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ pb: 5, px: 5 }}>
                      <Typography color="text.secondary" variant="body2">
                        {project.description.split(" ").slice(0, 15).join(" ")}
                      </Typography>
                    </Box>
                    <Box sx={{ px: 3, py: 2 }}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                      >
                        <div>
                          <Typography variant="subtitle2">
                            {project.currentRate}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            Rate
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">
                            {project.marketCap}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            Market Cap
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">
                            {project.yearFounded}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            Existence
                          </Typography>
                        </div>
                      </Stack>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        pl: 2,
                        pr: 3,
                        py: 2,
                      }}
                    >
                      <Box sx={{ alignItems: "center", display: "flex" }}>
                        <Tooltip title="Unlike">
                          <IconButton>
                            <Avatar src={project.currency.avatar} />
                          </IconButton>
                        </Tooltip>
                        <Typography color="text.secondary" variant="subtitle2">
                          {project.allTimeHigh}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ alignItems: "center", display: "flex", ml: 2 }}
                      >
                        <SvgIcon>
                          <Users01Icon />
                        </SvgIcon>
                        <Typography
                          color="text.secondary"
                          sx={{ ml: 1 }}
                          variant="subtitle2"
                        >
                          {project.cryptoId}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography
                        color="text.secondary"
                        sx={{ ml: 1 }}
                        variant="subtitle2"
                      >
                        {project.founders}
                      </Typography>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* Modal */}
      {isModalOpen && <Modal4 wallets={wallets} isOpen={isModalOpen} handleCloseModal={handleCloseModal}/>}
    </>
  );
};

GridList2.propTypes = {
  projects: PropTypes.array.isRequired,
};
