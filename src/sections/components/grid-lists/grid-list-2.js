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

import { useState, useEffect } from "react"; // Add useState import

export const GridList2 = ({ projects, handleBuyButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal open/close

 



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
                        src={`/assets/logos/${coin === "yuva"
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
                            src={`/assets/logos/${coin === "yuva"
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
    </>
  );
};

GridList2.propTypes = {
  projects: PropTypes.array.isRequired,
};
