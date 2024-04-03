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
  Button,
  Badge,
} from "@mui/material";
import PropTypes from "prop-types";
import numeral from "numeral";
import HeartIcon from "@untitled-ui/icons-react/build/esm/Heart";
import Users01Icon from "@untitled-ui/icons-react/build/esm/Users01";
import { formatDistanceToNowStrict } from "date-fns";
import { useState, useEffect } from "react"; // Add useState import
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

  const handleBuyButtonClick = () => {
    setIsModalOpen(true); // Open modal when card is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of modal and close it
    const handleClickOutside = (event) => {
      if (event.target.closest(".modal-content") === null) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
            const {
              _id,
              coin,
              amount,
              exchange_currency,
              payment_method,
              createdAt,
              updatedAt,
              total,
            } = project;
            const formattedCreatedAt = new Date(createdAt).toLocaleString();
            const formattedUpdatedAt = new Date(updatedAt).toLocaleString();

            return (
              <Grid key={project.id} item xs={12} md={4}>
                <Box mt={2} mb={2}>
                  {/* Add margin top and bottom */}
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    <Box
                      mt={2}
                      mb={2}
                      sx={{ position: "absolute", top: 0, left: 0 }}
                    >
                      {/* Logo */}
                      <img
                        src={`/assets/logos/${
                          coin === "yuva"
                            ? "yuvalogo2.png"
                            : coin === "usdt"
                            ? "yuvalogo2.png"
                            : ""
                        }`}
                        alt="Logo"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "30px",
                          height: "30px",
                          zIndex: 1,
                        }}
                      />

                      {/* Typography for UTDC */}
                      <Typography
                        color="text.primary"
                        variant="body2"
                        sx={{
                          position: "absolute",
                          top: 5,
                          left: 48, // Adjust left position to create space for the logo
                          zIndex: 1,
                          fontName: "Montserrat, sans-serif", // Change font family
                          fontWeight: "bold", // Make the text bold
                        }}
                      >
                        {coin}
                      </Typography>
                    </Box>

                    {/* MUI Badge for Transfer */}

                    {/* MUI Badge for Transfer */}
                    <Badge
                      badgeContent="Listed"
                      color="success"
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 14,
                        zIndex: 1,
                      }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                        }}
                      >
                        {/*<Avatar src={project.currency.avatar} />*/}
                        <Box
                          sx={{ mt: 2, display: "flex", alignItems: "center" }}
                        >
                          <img
                            alt="Logo"
                            src={`/assets/logos/${
                              coin === "yuva"
                                ? "yuvalogo2.png"
                                : coin === "usdt"
                                ? "yuvalogo2.png"
                                : ""
                            }`}
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "8px",
                            }}
                          />
                          <Typography color="text.secondary" variant="body2">
                            <Link color="text.primary" variant="h4">
                              {coin === "usdt"
                                ? "$"
                                : coin === "yuva"
                                ? ""
                                : ""}{" "}
                              {amount}
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ pb: 1, px: 5, textAlign: "center" }}>
                      <Typography color="text.primary" variant="body2">
                        {exchange_currency} USDT/YB
                      </Typography>
                      <Typography color="text.primary" variant="body1">
                        {total}USDT
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ px: 3, py: 1, textAlign: "center" }}>
                      <Stack
                        direction="column"
                        alignItems="center"
                        spacing={1} // Adjust spacing as needed
                      >
                        {/* <div>
      <Typography variant="subtitle2">
        {formattedCreatedAt}
      </Typography>
      <Typography color="text.secondary"
variant="body2">
        Created At
      </Typography>
    </div> */}
                        {/* <div>
      <Typography variant="subtitle2">
        {payment_method}
      </Typography>
      <Typography color="text.secondary"
variant="body2">
        Method
      </Typography>
    </div> */}
                        {/* <div>
      <Typography variant="subtitle2">
        {formattedUpdatedAt}
      </Typography>
      <Typography color="text.secondary"
variant="body2">
        Updated At
      </Typography>
    </div> */}
                      </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* <Tooltip title="Unlike">
                    <IconButton>
                      <Avatar src={project.currency.avatar} />
                    </IconButton>
                  </Tooltip>
                  <Typography color="text.secondary" variant="subtitle2">
                    {project.allTimeHigh}
                </Typography> */}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            ml: 1,
                            width: "15vw",
                            boxShadow:
                              "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                            "&:hover": {
                              boxShadow:
                                "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 20px 2px rgba(0,0,0,0.12)",
                            },
                          }}
                          onClick={handleBuyButtonClick}
                        >
                          <SvgIcon>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M21.82 14.47l-2.6-10.39C19.03 3.18 18.34 3 17.65 3H5.94L5.01 1.56C4.71.96 3.97.83 3.51 1.26L1.35 3.12c-.38.34-.45.94-.16 1.34L5.08 8h-.1c-.58 0-1.13.29-1.45.77L.22 13.3c-.28.45-.3 1.01-.05 1.47l3.55 6.18c.22.37.62.6 1.06.6h12.62l.77 1.44c.3.56.91.77 1.44.47l2.15-.91c.38-.16.63-.52.63-.92V15c.01-.41-.24-.78-.62-.99zM12.7 5h5.13l1.71 6.99H13.08L12.7 5zM7.5 15c-1.38 0-2.5-1.12-2.5-2.5S6.12 10 7.5 10s2.5 1.12 2.5 2.5S8.88 15 7.5 15zm9.99 4.78l-1.5-2.78H7.77l-1.52-2.64L4.16 13H1.41l3.18-5.54h11.18l1.06 4.24H9.75c-.31 0-.61.16-.78.43l-1.69 2.94-.5.88h10.4l1.22 2.12z" />
                          </SvgIcon>
                          Buy
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* Modal */}
      {isModalOpen && (
        <Modal4
          wallets={wallets}
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

GridList2.propTypes = {
  projects: PropTypes.array.isRequired,
};
