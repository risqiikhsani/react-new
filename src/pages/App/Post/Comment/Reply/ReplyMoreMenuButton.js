import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";


import { useNavigate } from "react-router-dom";

//

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";




import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HideSourceIcon from "@mui/icons-material/HideSource";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportIcon from "@mui/icons-material/Report";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import LoadingButton from "@mui/lab/LoadingButton";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppApi from "../../../../../api/AppApi";
import { setSnackbar } from "../../../../../hooks/slices/snackbarSlice";
function ReplyMoreMenuButton(props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authenticated_user_id = useSelector((state) => state.user.id)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [value, setValue] = React.useState(props.data.text);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };



  const deleteComment = useMutation({
    mutationFn: (id) => {
      return AppApi.deleteComment(id);
    },
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("success delete comment");

      dispatch(setSnackbar({ type: "success", string: "Comment deleted!" }))

      queryClient.setQueryData(["commentlist",{id:props.data.post}], data => ({
        ...data,
        pages:data.pages.map((page) => ({
          ...page,
          results:page.results.filter(a => a.id != props.data.id)
        }))
      }))


    },
  });

  const onSubmitDeleteComment = (event) => {
    console.log("delete comment")
    event.preventDefault();
    try {
      deleteComment.mutate(props.data.id);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <React.Fragment>


      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent sx={{ minWidth: "500px" }}>
          {deleteComment.isError && (
            <Alert variant="filled" severity="error">
              Something went wrong !
            </Alert>
          )}
          <DialogContentText>
            delete this comment ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <LoadingButton
            loading={deleteComment.isLoading}
            loadingPosition="end"
            onClick={(event) => { onSubmitDeleteComment(event); handleCloseDelete() }}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Tooltip title="more">
        <IconButton
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-label="show notification"
            size="small"
          onClick={handleClick}
        >
          <MoreVertIcon sx={{fontSize:"medium"}}/>
        </IconButton>
      </Tooltip>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {
          props.data.user.id == authenticated_user_id ? (
            <>
              <MenuItem onClick={() => { handleOpenDelete(); handleClose() }}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText>Report this comment</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText>Share comment</ListItemText>
              </MenuItem>
            </>
          )
        }

      </Menu>
    </React.Fragment>
  );
}

export default memo(ReplyMoreMenuButton);
