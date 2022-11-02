import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostCard from "../../../components/PostCard";
import { Container } from "@mui/system";
import BannerCard from "../../../components/BannerCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
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


  const postList = useQuery({
    queryKey: ['post-list'],
    queryFn: () => { return AppApi.fetchPostList() },
  })

  if (postList.isLoading) return (
    <React.Fragment>
      <Container maxWidth="sm">
        <p>Loading....</p>
      </Container>
    </React.Fragment>
  )

  if (postList.error) return (
    <React.Fragment>
      <Container maxWidth="sm">
        <p>Something went wrong!</p>
      </Container>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Container maxWidth="sm">

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent sx={{ minWidth: '500px' }}>
            <DialogContentText>
              Create post about your feelings ....
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
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
            <Button onClick={handleClose}>Post</Button>
          </DialogActions>
        </Dialog>
        <SpeedDial
          ariaLabel="Create Post"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={handleOpen}
        />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >

          {
            postList.data.data.results.map((post) => (
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
            ))
          }

        </Stack>
      </Container>
    </React.Fragment>
  );
}
