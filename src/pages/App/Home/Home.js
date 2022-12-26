import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../../../redux/slices/counterSlice";
import { setUser, clearUser } from "../../../redux/slices/userSlice";
import { Box, IconButton, Modal, SpeedDial, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PostCard from "../../../components/PostCard";
import { Container } from "@mui/system";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import BannerCard from "../../../components/BannerCard";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";

import AppApi from "../../../api/AppApi";
import CreatePost from "../../../components/Input/CreatePost";

export default function Home() {
  // const count = useSelector((state) => state.counter.value)
  // const user_id = useSelector((state) => state.user.id)
  // const user_name = useSelector((state) => state.user.name)

  // const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const postList = useQuery({
    queryKey: ["post-list"],
    queryFn: () => {
      return AppApi.fetchPostList();
    },
  });

  const createPost = useMutation({
    mutationFn: (data) => {
      return AppApi.createPost(data);
    },
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("success create post");
      // open snackbar success
      setOpenSnackbar(true);
      // close dialog
      handleClose();
      // refetch post list
      postList.refetch();
    },
  });

  const onSubmitCreatePost = (event) => {
    event.preventDefault();
    try {
      createPost.mutate({
        text: value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (postList.isLoading)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <p>Loading....</p>
        </Container>
      </React.Fragment>
    );

  if (postList.error)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          {console.log(postList.error)}
          <p>Something went wrong!</p>
        </Container>
      </React.Fragment>
    );

  // React.useEffect(() => {

  // },[])

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          open={openSnackbar}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            This is a success message!
          </Alert>
        </Snackbar>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent sx={{ minWidth: "500px" }}>
            {createPost.isError && (
              <Alert variant="filled" severity="error">
                Something went wrong !
              </Alert>
            )}
            <DialogContentText>
              Create post about your feelings ....
            </DialogContentText>
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
              onChange={handleChange}
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
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={createPost.isLoading}
              loadingPosition="end"
              onClick={onSubmitCreatePost}
            >
              Post
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <SpeedDial
          ariaLabel="Create Post"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<AddIcon />}
          onClick={handleOpen}
        />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {
            postList.data.data.results.length==0&&(
              <Typography>no posts found .</Typography>
            )
          }
          {postList.data.data.results.map((post) => (
            <React.Fragment>
              <PostCard
                key={post.id}
                user_name={post.user.profile.name}
                user_id={post.user.id}
                user_public_username={post.user.profile.public_username}
                user_profile_picture={post.user.profile.profile_picture}
                text={post.text}
                time_creation={post.time_creation}
              />
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    </React.Fragment>
  );
}
