import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

import { json, useNavigate } from "react-router-dom";

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
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import LoadingButton from "@mui/lab/LoadingButton";
import FolderIcon from "@mui/icons-material/Folder";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppApi from "../../../../api/AppApi";
import { setSnackbar } from "../../../../hooks/slices/snackbarSlice";
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

function PostMoreMenuButton(props) {
  const [currentFiles, setCurrentFiles] = React.useState(
    props.data.postmedia_set
  );
  const [removeCurrentFilesId, setRemoveCurrentFilesId] = React.useState([]);
  const removeCurrentFiles = (id) => {
    setCurrentFiles((currentFiles) => currentFiles.filter((a) => a.id !== id));
    setRemoveCurrentFilesId((removeCurrentFilesId) => [
      ...removeCurrentFilesId,
      id,
    ]);
  };

  const [uploadFiles, setUploadFiles] = React.useState([]);
  const onDrop = React.useCallback((acceptedFiles) => {
    console.log("test");
    console.log(acceptedFiles);
    setUploadFiles((uploadFiles) => [...uploadFiles,...acceptedFiles]);
  }, []);

  const removeMedia = (path) => {
    setUploadFiles((uploadFiles) => uploadFiles.filter((a) => a.path !== path));
  };
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png", ".jpg", ".jpeg", ".webpg"],
        "text/html": [".html", ".htm"],
      },
    });

  // let refsById = React.useMemo(() => {
  //   const refs = {};
  //   uploadFiles.forEach((item) => {
  //     refs[item.path] = React.createRef(null);
  //   });
  //   return refs;
  // }, [uploadFiles]);

  // React.useEffect(() => {
  //   uploadFiles.forEach((item) => {
  //     refsById[item.path].current.srcObject = item.path;
  //   });
  // }, [refsById]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticated_user_id = useSelector((state) => state.user.id);
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
  const handleOpenEdit = () => {
    setOpenEdit(true)
      // if user edit , currentfiles to default
    setCurrentFiles(props.data.postmedia_set);
    setRemoveCurrentFilesId([]);
    setUploadFiles([]);};
  const handleCloseEdit = () => {
    setOpenEdit(false);
    // if user cancel edit , currentfiles to default
    // setCurrentFiles(props.data.postmedia_set);
    // setRemoveCurrentFilesId([]);
    // setUploadFiles([]);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [value, setValue] = React.useState(props.data.text);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const editPost = useMutation({
    mutationFn: (data) => {
      return AppApi.editPost(props.data.id, data);
    },
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("success edit post");
      // open snackbar success
      dispatch(setSnackbar({ type: "success", string: "Post edited!" }));
      // refetch post list
      // dispatch(refetch_post_list_toggle())

      let newData = data;
      queryClient.setQueryData(["posts"], (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          results: page.results.map((a) =>
            a.id === newData.data.id ? newData.data : a
          ),
        })),
      }));

      // refetch post detail
      queryClient.setQueryData(
        ["post-detail", { id: JSON.stringify(props.data.id) }],
        newData
      );


    },
  });

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
      dispatch(setSnackbar({ type: "success", string: "Post deleted!" }));
      // refetch post list
      // dispatch(refetch_post_list_toggle())

      queryClient.setQueryData(["posts"], (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          results: page.results.filter((a) => a.id != props.data.id),
        })),
      }));

      queryClient.invalidateQueries([
        "post-detail",
        { id: JSON.stringify(props.data.id) },
      ]);
      //return to post list
      // navigate("/")
    },
  });

  const onSubmitDeletePost = (event) => {
    console.log("delete post");
    event.preventDefault();
    try {
      deletePost.mutate(props.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitEditPost = (event) => {
    event.preventDefault();

    var form = new FormData();
    form.append("text", value);
    if (uploadFiles !== null) {
      uploadFiles.forEach((element) => {
        form.append(element.name, element);
      });
    }
    if (removeCurrentFilesId.length > 0) {
      form.append("delete_images_id", JSON.stringify(removeCurrentFilesId));
    }

    try {
      editPost.mutate(form);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {console.log(currentFiles)}
      {console.log(uploadFiles)}
      {console.log(removeCurrentFilesId)}
      <Dialog fullScreen open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>
          Edit Post
          <IconButton
            aria-label="close"
            onClick={handleCloseEdit}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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

          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={4}
          >
            {currentFiles !== undefined && (
              <>
                <Typography>current files : </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={5}
                >
                  {currentFiles.map((a) => (
                    <Badge
                      badgeContent={
                        <IconButton onClick={() => removeCurrentFiles(a.id)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <Avatar
                        alt="image"
                        src={a.image.thumbnail}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </Badge>
                  ))}
                </Stack>
              </>
            )}

            <Button
              sx={{
                textTransform: "none",
                width: "100%",
                p: "20px",
                borderRadius: "20px",
              }}
              {...getRootProps({ className: "dropzone" })}
              variant="outlined"
              startIcon={<AttachFileIcon />}
            >
              <input {...getInputProps()} />
              Drag and drop files here , or click to select
            </Button>

            {uploadFiles.length > 0 && (
              <React.Fragment>
                <Typography>new files : </Typography>
                {uploadFiles.map((file) => (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      borderRadius: "20px",
                      p: "5px",
                      mt: "5px",
                    }}
                  >
                    
                    <Badge
                      badgeContent={
                        <IconButton onClick={() => removeMedia(file.path)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <Avatar
                        alt="image"
                        // ref={refsById[file.path]}
                        src={URL.createObjectURL(file)}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </Badge>
                    <Typography>{file.path}</Typography>
                    <Box
                      sx={{
                        bgcolor: "white",
                        borderRadius: "20px",
                        p: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {file.size} bytes
                    </Box>
                  </Stack>
                ))}
              </React.Fragment>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <IconButton>
            <EmojiEmotionsIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <LoadingButton
            loading={editPost.isLoading}
            loadingPosition="end"
            onClick={(event) => {
              onSubmitEditPost(event);
              handleCloseEdit();
            }}
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
            onClick={(event) => {
              onSubmitDeletePost(event);
              handleCloseDelete();
            }}
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
        {props.data.user.id == authenticated_user_id ? (
          <>
            <MenuItem
              onClick={() => {
                handleOpenEdit();
                handleClose();
              }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleOpenDelete();
                handleClose();
              }}
            >
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
        )}
      </Menu>
    </React.Fragment>
  );
}

export default memo(PostMoreMenuButton);
