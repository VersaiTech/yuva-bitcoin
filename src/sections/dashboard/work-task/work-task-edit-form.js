// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Stack,
//   TextField,
//   Grid,
// } from "@mui/material";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import { useRouter } from "next/router";
// import { paths } from "../../../paths";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const validationSchema = Yup.object({
//   reason: Yup.string().required("Reason is required"),
// });

// export const WorkTaskEditForm = ({ customer, ...other }) => {
//   const router = useRouter();
//   const { userId } = router.query;
//   const { enqueueSnackbar } = useSnackbar();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [reason, setReason] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       taskId: customer.taskId || "",
//       userId: userId || "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async () => {
//       // handle submit logic
//     },
//   });

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmRequest = () => {
//     if (reason) {
//       handleSubmitConfirmation("confirmed");
//     } else {
//       enqueueSnackbar("Reason is required for confirmation", {
//         variant: "error",
//       });
//     }
//   };

//   const handleRejectRequest = () => {
//     handleOpenDialog();
//   };

//   const handleSubmitConfirmation = async (status) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const headers = {
//         Authorization: token,
//       };

//       const response = await axios.post(
//         `${BASEURL}/admin/confirmTaskCompletion`,
//         {
//           taskId: formik.values.taskId,
//           userId: formik.values.userId,
//           status: status,
//           reason: reason,
//         },
//         {
//           headers: headers,
//         }
//       );

//       if (response.status === 200) {
//         enqueueSnackbar(
//           status === "confirmed"
//             ? "Request confirmed successfully"
//             : "Request rejected successfully",
//           {
//             variant: "success",
//           }
//         );
//         router.push(paths.dashboard.taskwork.index);
//       } else {
//         enqueueSnackbar("Something went wrong", {
//           variant: "error",
//         });
//       }
//     } catch (error) {
//       enqueueSnackbar(error.message, {
//         variant: "error",
//       });
//     }

//     handleCloseDialog();
//   };

//   return (
//     <form onSubmit={formik.handleSubmit} {...other}>
//       <Card>
//         <CardHeader title="Approve or Reject Task" />
//         <CardContent sx={{ pt: 0 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 disabled
//                 fullWidth
//                 label="Task Id"
//                 name="taskId"
//                 value={formik.values.taskId}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 disabled
//                 fullWidth
//                 label="User Id"
//                 name="userId"
//                 value={formik.values.userId}
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Stack
//           direction={{
//             xs: "column",
//             sm: "row",
//           }}
//           flexWrap="wrap"
//           spacing={3}
//           sx={{ p: 3 }}
//         >
//           <Button onClick={handleConfirmRequest} variant="contained">
//             Confirm Request
//           </Button>
//           <Button onClick={handleRejectRequest} color="error" variant="contained">
//             Reject Request
//           </Button>
//         </Stack>
//       </Card>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Rejection Reason</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Please provide the reason for rejection:</DialogContentText>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             variant="outlined"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleSubmitConfirmation("rejected")} color="primary">
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </form>
//   );
// };

// WorkTaskEditForm.propTypes = {
//   customer: PropTypes.object.isRequired,
// };



import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { paths } from "../../../paths";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const validationSchema = Yup.object({
  reason: Yup.string().required("Reason is required"),
});

export const WorkTaskEditForm = ({ customer, ...other }) => {
  const router = useRouter();
  const { userId } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  const [reason, setReason] = useState("");

  const formik = useFormik({
    initialValues: {
      taskId: customer.taskId || "",
      userId: userId || "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      // handle submit logic
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmRequest = () => {
    handleSubmitConfirmation("confirmed", "Admin confirmed the request.");
  };

  const handleRejectRequest = () => {
    handleOpenDialog();
  };

  const handleSubmitConfirmation = async (status, defaultReason) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        `${BASEURL}/admin/confirmTaskCompletion`,
        {
          taskId: formik.values.taskId,
          userId: formik.values.userId,
          status: status,
          reason: status === "confirmed" ? defaultReason : reason,
        },
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        enqueueSnackbar(
          status === "confirmed"
            ? "Request confirmed successfully"
            : "Request rejected successfully",
          {
            variant: "success",
          }
        );
        router.push(paths.dashboard.taskwork.index);
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }

    handleCloseDialog();
  };

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Approve or Reject Task" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                label="Task Id"
                name="taskId"
                value={formik.values.taskId}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                label="User Id"
                name="userId"
                value={formik.values.userId}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button onClick={handleConfirmRequest} variant="contained">
            Confirm Request
          </Button>
          <Button onClick={handleRejectRequest} color="error" variant="contained">
            Reject Request
          </Button>
        </Stack>
      </Card>
          
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Rejection Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide the reason for rejection:</DialogContentText>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmitConfirmation("rejected")} color="primary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

WorkTaskEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};

