import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";

//

import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Container } from "@mui/system";
import Alert from "@mui/material/Alert";




import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HideSourceIcon from "@mui/icons-material/HideSource";
import ReportIcon from "@mui/icons-material/Report";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import LoadingButton from "@mui/lab/LoadingButton";

import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setSnackbar } from "../../../../hooks/slices/snackbarSlice";
import AppApi from "../../../../api/AppApi";
import { refetch_post_list_toggle } from "../../../../hooks/slices/refetchSlice";
import { refetch_post_detail_toggle } from "../../../../hooks/slices/refetchSlice";
import { memo } from "react";


function PostMoreMenuButton(props) {
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

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [value, setValue] = React.useState(props.data.text);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const editPost = useMutation({
    mutationFn: (data) => {

      return AppApi.editPost(data.post_id, data.new_data);
    },
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("success edit post");
      // open snackbar success
      dispatch(setSnackbar({ type: "success", string: "Post edited!" }))
      // refetch post list
      dispatch(refetch_post_list_toggle())
      // refetch post detail too 
      dispatch(refetch_post_detail_toggle())
    },
  })

  const deletePost = useMutation({
    mutationFn: (id) => {
      return AppApi.deletePost(id);
    },
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("success delete post");
      // open snackbar success
      dispatch(setSnackbar({ type: "success", string: "Post deleted!" }))
      // refetch post list
      dispatch(refetch_post_list_toggle())

      //return to post list
      navigate("/")
    },
  });

  const onSubmitDeletePost = (event) => {
    console.log("delete post")
    event.preventDefault();
    try {
      deletePost.mutate(props.data.id);
    } catch (err) {
      console.log(err);
    }
  };



  const onSubmitEditPost = (event) => {
    event.preventDefault();
    
    let data = {
      post_id : props.data.id,
      new_data : {
        text:value,
      }
    }

    try {
      editPost.mutate(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent sx={{ minWidth: "500px" }}>
          {editPost.isError && (
            <Alert variant="filled" severity="error">
              Something went wrong !
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            sx={{ flexGrow: 1 }}
            size="small"
            placeholder="What's on your mind?"
            multiline
            fullWidth
            rows={4}
            value={value}
            onChange={handleChangeEdit}
          />
        </DialogContent>
        <DialogActions>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton>
            <ImageIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <LoadingButton
            loading={editPost.isLoading}
            loadingPosition="end"
            onClick={(event) => { onSubmitEditPost(event); handleCloseEdit() }}
          >
            Post
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent sx={{ minWidth: "500px" }}>
          {deletePost.isError && (
            <Alert variant="filled" severity="error">
              Something went wrong !
            </Alert>
          )}
          <DialogContentText>
            are you sure want to delete this post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <LoadingButton
            loading={deletePost.isLoading}
            loadingPosition="end"
            onClick={(event) => { onSubmitDeletePost(event); handleCloseDelete() }}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Tooltip title="Notification">
        <IconButton
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-label="show notification"

          onClick={handleClick}
        >
          <MoreVertIcon />
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

              <MenuItem onClick={() => { handleOpenEdit(); handleClose() }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
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
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText>Turn on notification for this post</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <HideSourceIcon />
                </ListItemIcon>
                <ListItemText>Hide all post from this user</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText>Report this post</ListItemText>
              </MenuItem>
            </>
          )
        }

      </Menu>
    </React.Fragment>
  );
}

export default memo(PostMoreMenuButton);
