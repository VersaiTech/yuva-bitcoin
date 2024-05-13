import {
  Box,
  Card,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";


export const GridList2 = ({ projects, handleBuyButtonClick,handleUpdateButtonClick,handleDeleteButtonClick,status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  console.log(status);

  // Inside your component
  const isScreenSizeGreaterThanSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );

  useEffect(() => {
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
            const { _id, coin, amount, exchange_currency, total } = project;

            return (
              <Grid key={project.id} item xs={6} sm={6} md={4} 
              lg={3}>
                <Box mt={2} mb={2}>
                  <Card
                    sx={{
                      p: 1, // Reduce padding for smaller screens
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
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        sx={{
                          position: "absolute",
                          top: "2%",
                          left: "2%",
                          zIndex: 2,
                          fontName: "Montserrat, sans-serif",
                          fontWeight: "bold",
                          fontSize: isScreenSizeGreaterThanSm
                            ? "1.1rem"
                            : "0.9rem",
                        }}
                      >
                        {coin}
                      </Typography>
                    </Box>
                    <Badge
                      badgeContent="Listed"
                      color="success"
                      sx={{
                        position: "absolute",
                        top: isScreenSizeGreaterThanSm ? 10 : 17, // Adjust badge position for smaller screens
                        right: 10, // Adjust badge position for smaller screens
                        zIndex: 1,
                        width: isScreenSizeGreaterThanSm ? "auto" : "20px", // Adjust badge width for smaller screens
                        height: isScreenSizeGreaterThanSm ? "auto" : "20px", // Adjust badge height for smaller screens
                        fontSize: isScreenSizeGreaterThanSm ? "1rem" : "0.8rem",
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
                        <Box
                          sx={{
                            mt: 1, // Reduce margin top for smaller screens
                            display: "flex",
                            alignItems: "center",
                            flexWrap: isScreenSizeGreaterThanSm
                              ? "nowrap"
                              : "wrap",
                          }}
                        >
                          <img
                            alt="Logo"
                            src={`/assets/logos/${
                              coin === "yuva"
                                ? "yuvalogo2.png"
                                : coin === "usdt"
                                ? "logo-usdt.svg"
                                : ""
                            }`}
                            style={{
                              width: isScreenSizeGreaterThanSm
                                ? "40px"
                                : "30px",
                              height: isScreenSizeGreaterThanSm
                                ? "40px"
                                : "30px",
                              marginRight: isScreenSizeGreaterThanSm
                                ? "8px"
                                : "4px", // Reduce margin for smaller screens
                            }}
                          />

                          <Typography
                            color="text.secondary"
                            variant="body2"
                            sx={{
                              fontSize: isScreenSizeGreaterThanSm
                                ? "1.1rem"
                                : "0.9rem",
                            }}
                          >
                            <Link color="text.primary" variant="h6">
                              {coin === "usdt"
                                ? ""
                                : coin === "yuva "
                                ? ""
                                : ""}{" "}
                              {amount}
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ px: 1, textAlign: "center" }}>
                      <Typography
                        color="primary"
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          paddingBottom: "6px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {coin === "usdt"
                          ? `${exchange_currency} YB/USDT`
                          : `${exchange_currency} USDT/YB`}
                      </Typography>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        sx={{
                          fontSize: isScreenSizeGreaterThanSm
                            ? "1rem"
                            : "0.9rem",
                          fontWeight: isScreenSizeGreaterThanSm ? "600" : "900",
                        }}
                      >
                        Total:{" "}
                        {coin === "usdt"
                          ? `${parseFloat(total).toFixed(4)} YB`
                          : `${parseFloat(total).toFixed(4)} USDT`}
                      </Typography>
                    </Box>
                    <Divider />

                    {isScreenSizeGreaterThanSm && (
                      <Box sx={{ px: 1, py: 1, textAlign: "center" }}>
                        <Stack
                          direction="column"
                          alignItems="center"
                          spacing={1}
                        ></Stack>
                      </Box>
                    )}

                    <Divider />
                    <Box sx={{ p: 1, textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: isScreenSizeGreaterThanSm
                            ? "nowrap"
                            : "wrap",
                          mt: 1,
                        }}
                      >
                        {/*<Button
                          variant="contained"
                          color="primary"
                          sx={{
                            ml: 1,
                            width: isScreenSizeGreaterThanSm ? "80%" : "100%",
                            height: "36px", // Reduce button height for smaller screens
                            fontSize: "0.8rem", // Reduce font size for smaller screens
                            boxShadow:
                              "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                            "&:hover": {
                              boxShadow:
                                "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 20px 2px rgba(0,0,0,0.12)",
                            },
                          }}
                          onClick={() => handleBuyButtonClick(project)}
                        >
                          Buy
                        </Button>*/}
                        {status === "Listed" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              ml: 1,
                              width: isScreenSizeGreaterThanSm ? "80%" : "100%",
                              height: "36px",
                              fontSize: "0.8rem",
                              boxShadow:
                                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                              "&:hover": {
                                boxShadow:
                                  "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 20px 2px rgba(0,0,0,0.12)",
                              },
                            }}
                            onClick={() => handleBuyButtonClick(project)}
                          >
                            Buy
                          </Button>
                        ) : (
                          <>
                            <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              ml: 1,
                              width: isScreenSizeGreaterThanSm ? "80%" : "100%",
                              height: "36px",
                              fontSize: "0.8rem",
                              boxShadow:
                                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                              "&:hover": {
                                boxShadow:
                                  "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 20px 2px rgba(0,0,0,0.12)",
                              },
                            }}
                              onClick={() => handleUpdateButtonClick(project)}
                            >
                              Update
                            </Button>
                            <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              ml: 1,
                              width: isScreenSizeGreaterThanSm ? "80%" : "100%",
                              height: "36px",
                              fontSize: "0.8rem",
                              boxShadow:
                                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                              "&:hover": {
                                boxShadow:
                                  "0px 4px 6px -1px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 20px 2px rgba(0,0,0,0.12)",
                              },
                            }}
                              onClick={() => handleDeleteButtonClick(project)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
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
