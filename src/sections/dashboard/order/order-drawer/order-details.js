// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { format, differenceInSeconds } from "date-fns"; // Import differenceInSeconds from date-fns
// import numeral from "numeral";
// import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
// import { PropertyList } from "../../../../components/property-list";
// import { PropertyListItem } from "../../../../components/property-list-item";
// import { SeverityPill } from "../../../../components/severity-pill";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const statusMap = {
//   canceled: "warning",
//   complete: "success",
//   pending: "info",
//   rejected: "error",
//   expired: "error",
// };

// export const OrderDetails = (props) => {
//   const { onApprove, onEdit, onReject, order } = props;
//   const [countdown, setCountdown] = useState("");
//   const [linkClicked, setLinkClicked] = useState(false);
//   const [taskCompleted, setTaskCompleted] = useState(false);

//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     updateCountdown(); // Call updateCountdown once initially
//     const interval = setInterval(updateCountdown, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const updateCountdown = () => {
//     const completionTime = new Date(order.completionTime);
//     const scheduledTime = new Date(order.scheduledTime);
//     const currentTime = new Date();

//     // Calculate difference in seconds
//     const timeDifferenceInSeconds = differenceInSeconds(
//       completionTime,
//       currentTime
//     );
//     const startTimeDifferenceInSeconds = differenceInSeconds(
//       scheduledTime,
//       currentTime
//     );

//     if (timeDifferenceInSeconds > 0) {
//       const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));
//       const hours = Math.floor(
//         (timeDifferenceInSeconds % (24 * 60 * 60)) / (60 * 60)
//       );
//       const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
//       const seconds = Math.floor(timeDifferenceInSeconds % 60);

//       if (days > 0) {
//         setCountdown(
//           `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
//         );
//       } else if (hours > 0) {
//         setCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`);
//       } else if (minutes > 0) {
//         setCountdown(`${minutes} minutes ${seconds} seconds`);
//       } else {
//         setCountdown(`${seconds} seconds`);
//       }
//     } else {
//       setCountdown("Task Expired");
//     }

//     if (startTimeDifferenceInSeconds > 0) {
//       const days = Math.floor(startTimeDifferenceInSeconds / (24 * 60 * 60));
//       const hours = Math.floor(
//         (startTimeDifferenceInSeconds % (24 * 60 * 60)) / (60 * 60)
//       );
//       const minutes = Math.floor(
//         (startTimeDifferenceInSeconds % (60 * 60)) / 60
//       );
//       const seconds = Math.floor(startTimeDifferenceInSeconds % 60);

//       if (days > 0) {
//         setCountdown(
//           `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
//         );
//       } else if (hours > 0) {
//         setCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`);
//       } else if (minutes > 0) {
//         setCountdown(`${minutes} minutes ${seconds} seconds`);
//       } else {
//         setCountdown(`${seconds} seconds`);
//       }
//     } else if (timeDifferenceInSeconds > 0) {
//       setCountdown("Started");
//     } else {
//       setCountdown("Task Expired");
//     }
//   };

//   const handleLinkClick = () => {
//     setLinkClicked(true);
//   };

//   const handleApprove = async () => {
//     if (!linkClicked) {
//       window.alert("Please visit the link and complete the task.");
//     } else if (countdown === "Task Expired") {
//       window.alert(
//         "The task completion time has expired. You cannot submit the task."
//       );
//     } else {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };

//         // Send a request to the backend API to complete the task
//         const response = await axios.post(
//           `${BASEURL}/admin/completeTask`,
//           { taskId: order.taskId },
//           { headers: headers }
//         );

//         // Check if the request was successful
//         if (response.status === 200) {
//           // Task submission was successful
//           setTaskCompleted(true);
//           onApprove();
//           enqueueSnackbar("Task submitted successfully", {
//             variant: "success",
//           });
//           console.log("Task submitted successfully");
//           // Call any additional function or update state if needed
//         } else {
//           // Task submission failed, handle the error
//           enqueueSnackbar(response.data.message, { variant: "error" });
//           console.error("Task submission failed:", response.data.message);
//           // Display an error message to the user or handle it as per your application flow
//         }
//       } catch (error) {
//         // Handle any errors that occur during the request
//         enqueueSnackbar(error.response.data.message, { variant: "error" });
//         console.error("Error submitting task:", error.response.data.message);
//         // Display an error message to the user or handle it as per your application flow
//       }
//     }
//   };

//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
//   const align = lgUp ? "horizontal" : "vertical";
//   const items = order.items || [];
//   const statusColor =
//     countdown === "Task Expired" ? statusMap.expired : statusMap[order.status];

//   const totalAmount = numeral(order.totalAmount).format(
//     `${order.currency}0,0.00`
//   );

//   return (
//     <Stack spacing={6}>
//       <Stack spacing={3}>
//         <PropertyList>
//           <PropertyListItem
//             align={align}
//             disablegutters
//             divider
//             label="Task Open Time"
//             value={
//               countdown === "Started"
//                 ? "Started"
//                 : format(new Date(order.scheduledTime), "yyyy-MM-dd HH:mm:ss")
//             }
//           />
//           <PropertyListItem
//             align={align}
//             disablegutters
//             divider
//             label="Task Name"
//             value={order.taskName}
//           />
//           <PropertyListItem
//             align={align}
//             disablegutters
//             divider
//             label="Task Description "
//             value={order.description}
//           />
//           <PropertyListItem
//             align={align}
//             disablegutters
//             divider
//             label="Rewards"
//             value={order.coins + " Coins"}
//           />
//           <PropertyListItem
//             align={align}
//             disablegutters
//             divider
//             label="Task Link"
//             value={
//               <a
//                 href={order.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={handleLinkClick}
//               >
//                 {order.link}
//               </a>
//             }
//           />
//           <PropertyListItem
//             align={align}
//             disablegutters
//             divider
//             label="Task End Time"
//             value={countdown}
//           />
//           <PropertyListItem align={align} disablegutters divider label="Status">
//             <SeverityPill color={statusColor}>
//               {countdown === "Task Expired" ? "Expired" : order.status}
//             </SeverityPill>
//           </PropertyListItem>
//         </PropertyList>
//         <Stack
//           alignItems="center"
//           direction="row"
//           flexWrap="wrap"
//           justifyContent="flex-end"
//           spacing={2}
//           sx={{
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Button
//             onClick={handleApprove}
//             size="small"
//             variant="contained"
//             disabled={
//               !linkClicked || taskCompleted || countdown === "Task Expired"
//             }
//           >
//             Submit Task
//           </Button>
//           <Button
//             color="error"
//             onClick={onReject}
//             size="small"
//             variant="outlined"
//           >
//             Cancel
//           </Button>
//           <Typography variant="subtitle2" color="warning" sx={{ pt: 5 }}>
//             Please go to the link and complete the task. If you submit without
//             visiting the link, you won&apos;t receive the reward.
//           </Typography>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// OrderDetails.propTypes = {
//   onApprove: PropTypes.func,
//   onEdit: PropTypes.func,
//   onReject: PropTypes.func,
//   order: PropTypes.object,
// };





import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format, differenceInSeconds } from "date-fns"; // Import differenceInSeconds from date-fns
import numeral from "numeral";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { PropertyList } from "../../../../components/property-list";
import { PropertyListItem } from "../../../../components/property-list-item";
import { SeverityPill } from "../../../../components/severity-pill";
import axios from "axios";
import { useSnackbar } from "notistack";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const statusMap = {
  canceled: "warning",
  complete: "success",
  pending: "info",
  rejected: "error",
  expired: "error",
};

export const OrderDetails = (props) => {
  const { onApprove, onEdit, onReject, order } = props;
  const [startCountdown, setStartCountdown] = useState("");
  const [endCountdown, setEndCountdown] = useState("");
  const [linkClicked, setLinkClicked] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    updateCountdowns(); // Call updateCountdowns once initially
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCountdowns = () => {
    const completionTime = new Date(order.completionTime);
    const scheduledTime = new Date(order.scheduledTime);
    const currentTime = new Date();

    // Calculate difference in seconds for end time
    const endTimeDifferenceInSeconds = differenceInSeconds(
      completionTime,
      currentTime
    );

    // Calculate difference in seconds for start time
    const startTimeDifferenceInSeconds = differenceInSeconds(
      scheduledTime,
      currentTime
    );

    // Update start countdown
    if (startTimeDifferenceInSeconds > 0) {
      const days = Math.floor(startTimeDifferenceInSeconds / (24 * 60 * 60));
      const hours = Math.floor(
        (startTimeDifferenceInSeconds % (24 * 60 * 60)) / (60 * 60)
      );
      const minutes = Math.floor((startTimeDifferenceInSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(startTimeDifferenceInSeconds % 60);

      if (days > 0) {
        setStartCountdown(
          `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
        );
      } else if (hours > 0) {
        setStartCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`);
      } else if (minutes > 0) {
        setStartCountdown(`${minutes} minutes ${seconds} seconds`);
      } else {
        setStartCountdown(`${seconds} seconds`);
      }
    } else {
      setStartCountdown("Started");
    }

    // Update end countdown
    if (endTimeDifferenceInSeconds > 0) {
      const days = Math.floor(endTimeDifferenceInSeconds / (24 * 60 * 60));
      const hours = Math.floor(
        (endTimeDifferenceInSeconds % (24 * 60 * 60)) / (60 * 60)
      );
      const minutes = Math.floor((endTimeDifferenceInSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(endTimeDifferenceInSeconds % 60);

      if (days > 0) {
        setEndCountdown(
          `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
        );
      } else if (hours > 0) {
        setEndCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`);
      } else if (minutes > 0) {
        setEndCountdown(`${minutes} minutes ${seconds} seconds`);
      } else {
        setEndCountdown(`${seconds} seconds`);
      }
    } else {
      setEndCountdown("Task Expired");
    }
  };

  const handleLinkClick = () => {
    setLinkClicked(true);
  };

  const handleApprove = async () => {
    if (!linkClicked) {
      window.alert("Please visit the link and complete the task.");
    } else if (endCountdown === "Task Expired") {
      window.alert(
        "The task completion time has expired. You cannot submit the task."
      );
    } else {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: token,
        };

        // Send a request to the backend API to complete the task
        const response = await axios.post(
          `${BASEURL}/admin/completeTask`,
          { taskId: order.taskId },
          { headers: headers }
        );

        // Check if the request was successful
        if (response.status === 200) {
          // Task submission was successful
          setTaskCompleted(true);
          onApprove();
          enqueueSnackbar("Task submitted successfully", {
            variant: "success",
          });
          console.log("Task submitted successfully");
          // Call any additional function or update state if needed
        } else {
          // Task submission failed, handle the error
          enqueueSnackbar(response.data.message, { variant: "error" });
          console.error("Task submission failed:", response.data.message);
          // Display an error message to the user or handle it as per your application flow
        }
      } catch (error) {
        // Handle any errors that occur during the request
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.error("Error submitting task:", error.response.data.message);
        // Display an error message to the user or handle it as per your application flow
      }
    }
  };

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const align = lgUp ? "horizontal" : "vertical";
  const items = order.items || [];
  const statusColor =
    endCountdown === "Task Expired" ? statusMap.expired : statusMap[order.status];

  const totalAmount = numeral(order.totalAmount).format(
    `${order.currency}0,0.00`
  );

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <PropertyList>
          <PropertyListItem
            align={align}
            disablegutters
            divider
            label="Task Open Time"
            value={
              startCountdown === "Started"
                ? "Started"
                : startCountdown
            }
          />
          <PropertyListItem
            align={align}
            disablegutters
            divider
            label="Task Name"
            value={order.taskName}
          />
          <PropertyListItem
            align={align}
            disablegutters
            divider
            label="Task Description "
            value={
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {order.description}
              </Typography>
            }
          />
          <PropertyListItem
            align={align}
            disablegutters
            divider
            label="Rewards"
            value={order.coins + " Coins"}
          />
          <PropertyListItem
            align={align}
            disablegutters
            divider
            label="Task Link"
            value={
              <a
                href={order.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                {order.link}
              </a>
            }
          />
          <PropertyListItem
            align={align}
            disablegutters
            divider
            label="Task End Time"
            value={endCountdown}
          />
          <PropertyListItem align={align} disablegutters divider label="Status">
            <SeverityPill color={statusColor}>
              {endCountdown === "Task Expired" ? "Expired" : order.status}
            </SeverityPill>
          </PropertyListItem>
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleApprove}
            size="small"
            variant="contained"
            disabled={
              !linkClicked || taskCompleted || endCountdown === "Task Expired"
            }
          >
            Submit Task
          </Button>
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>
          <Typography variant="subtitle2" color="warning" sx={{ pt: 5 }}>
            Please go to the link and complete the task. If you submit without
            visiting the link, you won&apos;t receive the reward.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

OrderDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  order: PropTypes.object,
};
