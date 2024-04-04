// import NextLink from "next/link";
// import PropTypes from "prop-types";
// import toast from "react-hot-toast";
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
// import { paths } from "../../../paths";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

// const validationSchema = Yup.object({
//   taskId: Yup.string().required("Task ID is required"),
//   description: Yup.string().max(5000).required("Description is required"),
//   coins: Yup.number().min(0).required("Coins is required"),
//   taskName: Yup.string().max(255).required("Task Name is required"),
//   link: Yup.string().url().required("Link is required"),
//   userTwitterId: Yup.string().required("User Twitter ID is required"),
//   taskSubmitDate: Yup.date().required("Task Submit Date is required"),
// });

// export const WorkTaskEditForm = ({ customer, ...other }) => {
//   const router = useRouter();
//   const {userId} = router.query;

//   console.log(userId);
//   const { enqueueSnackbar } = useSnackbar();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [reason, setReason] = useState("");



//   console.log(customer);

//   const formik = useFormik({
//     initialValues: {
//       userId: userId || "",
//       taskId: customer.taskId || "",
//       description: customer.description || "",
//       coins: customer.coins || "",
//       taskName: customer.taskName || "",
//       link: customer.link || "",
//       userTwitterId: customer.userTwitterId || "",
//       taskSubmitDate: customer.completionTime || "", // Dummy date, replace with API value
//       submit: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, helpers) => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };

//         const response = await axios.post(
//           `${BASEURL}/admin/confirmTaskCompletion`,
//           {
//             taskId: values.taskId,
//             userId: values.userId,
//             status: "confirmed",
//             reason: reason,
//           },
//           {
//             headers: headers,
//           }
//         );

//         if (response.status === 200) {
//           enqueueSnackbar("Request confirmed successfully", {
//             variant: "success",
//           });
//           router.push(paths.dashboard.taskwork.index);
//         } else {
//           enqueueSnackbar("Something went wrong", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         enqueueSnackbar(error.message, {
//           variant: "error",
//         });
//       }
//     },
//   });

//   const handleConfirmRequest = async () => {
//     try
//     {
//       const token = localStorage.getItem("accessToken");
//     const headers = {
//       Authorization:token
//     }


//     const response = await axios.post(`${BASEURL}/admin/confirmTaskCompletion`, 
//     {
//                 taskId: formik.values.taskId,
//                 userId: formik.values.userId,
//                 status: "confirmed",
//               },
//     {
//       headers: headers
//     })

//     if (response.status === 200) {
//       enqueueSnackbar("Request confirmed successfully", {
//         variant: "success",
//       });
//       router.push(paths.dashboard.taskwork.index);
//     }
//     else {
//       enqueueSnackbar("Something went wrong", {
//         variant: "error",
//       });
//     }
//   }
//   catch (error) {
//     enqueueSnackbar(error.message, {
//       variant: "error",
//     });
//   }

//   };

//   // const handleConfirmRequest = async () => {
//   //   try {
//   //     await formik.handleSubmit();
//   //   } catch (error) {
//   //     enqueueSnackbar(error.message, {
//   //       variant: "error",
//   //     });
//   //   }
//   // };

//   const handleRejectRequest = async () => {
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
//           status: "rejected",
//         },
//         {
//           headers: headers,
//         }
//       );

//       if (response.status === 200) {
//         enqueueSnackbar("Request rejected successfully", {
//           variant: "success",
//         });
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
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <form onSubmit={formik.handleSubmit} {...other}>
//       <Card>
//         <CardHeader title="Approve or Reject Task" />
//         <CardContent sx={{ pt: 0 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//               disabled
//                 error={!!(formik.touched.taskId && formik.errors.taskId)}
//                 fullWidth
//                 helperText={formik.touched.taskId && formik.errors.taskId}
//                 label="Task Id"
//                 name="taskId"
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.taskId}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//               disabled
//                 error={!!(formik.touched.userId && formik.errors.userId)}
//                 fullWidth
//                 helperText={formik.touched.userId && formik.errors.userId}
//                 label="User Id"
//                 name="userId"
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
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

//       {/* Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Delete Task</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this task?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button color="error" autoFocus>
//             Delete
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
            status: "confirmed",
            reason: reason,
          },
          {
            headers: headers,
          }
        );

        if (response.status === 200) {
          enqueueSnackbar("Request confirmed successfully", {
            variant: "success",
          });
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
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmRequest = () => {
    handleOpenDialog();
  };

  const handleRejectRequest = async () => {
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
          status: "rejected",
        },
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        enqueueSnackbar("Request rejected successfully", {
          variant: "success",
        });
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
  };

  const handleSubmitConfirmation = async() => {
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
            status: "confirmed",
            reason: reason,
          },
          {
            headers: headers,
          }
        );

        if (response.status === 200) {
          enqueueSnackbar("Request confirmed successfully", {
            variant: "success",
          });
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
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide the reason for confirmation:</DialogContentText>
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
          <Button onClick={handleSubmitConfirmation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

WorkTaskEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};






// // ******************************************************
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
//       try {
//         const token = localStorage.getItem("accessToken");
//         const headers = {
//           Authorization: token,
//         };

//         const response = await axios.post(
//           `${BASEURL}/admin/confirmTaskCompletion`,
//           {
//             taskId: formik.values.taskId,
//             userId: formik.values.userId,
//             status: "confirmed",
//             reason: reason,
//           },
//           {
//             headers: headers,
//           }
//         );

//         if (response.status === 200) {
//           enqueueSnackbar("Request confirmed successfully", {
//             variant: "success",
//           });
//           router.push(paths.dashboard.taskwork.index);
//         } else {
//           enqueueSnackbar("Something went wrong", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         enqueueSnackbar(error.message, {
//           variant: "error",
//         });
//       }
//     },
//   });

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmRequest = () => {
//     handleOpenDialog();
//   };

//   const handleRejectRequest = () => {
//     handleOpenDialog();
//   };

//   const handleSubmitConfirmation = async () => {
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
//           status: "rejected",
//           reason: reason,
//         },
//         {
//           headers: headers,
//         }
//       );

//       if (response.status === 200) {
//         enqueueSnackbar("Request rejected successfully", {
//           variant: "success",
//         });
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
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Please provide the reason:</DialogContentText>
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
//           <Button
//             onClick={handleConfirmRequest ? handleSubmitConfirmation : handleCloseDialog}
//             color={handleConfirmRequest ? "primary" : "error"}
//           >
//             {handleConfirmRequest ? "Confirm" : "Reject"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </form>
//   );
// };

// WorkTaskEditForm.propTypes = {
//   customer: PropTypes.object.isRequired,
// };
