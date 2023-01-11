import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";

import { useSelector, useDispatch } from "react-redux";
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
import { Container } from "@mui/system";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from '@mui/material/CircularProgress';
import { useInView } from 'react-intersection-observer'

import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";


import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../../../hooks/slices/counterSlice";
import { setUser, clearUser } from "../../../hooks/slices/userSlice";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";
import AppApi from "../../../api/AppApi";
import PostCard from "../Post/PostCard";
import BannerCard from "../../../components/BannerCard";
import { refetch_post_list_toggle } from "../../../hooks/slices/refetchSlice";

export default function Home() {
  // const count = useSelector((state) => state.counter.value)
  const authenticated_user_id = useSelector((state) => state.user.id)
  const authenticated_user_name = useSelector((state) => state.user.name)
  const is_post_list_refetch = useSelector((state) => state.refetch.post_list_refetch)


  const dispatch = useDispatch()

  const { ref, inView } = useInView()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };


  const postInfiniteList = useInfiniteQuery(
    ['posts'],
    async ({ pageParam = 1 }) => {
      const res = await AppApi.fetchPostList(`?page=${pageParam}`)
      return res.data
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      keepPreviousData:true,
    },
  )

  // React.useEffect(() => {
  //   if (inView) {
  //     postInfiniteList.fetchNextPage()
  //   }
  // }, [inView])

  // const postList = useQuery({
  //   queryKey: ["post-list"],
  //   queryFn: () => {
  //     return AppApi.fetchPostList();
  //   },
  // });

  const createPost = useMutation({
    mutationFn: (data) => {
      return AppApi.createPost(data);
    },
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
      setValue("")
    },
    onSuccess: (data, variables, context) => {
      console.log("success create post");
      // open snackbar success
      // setOpenSnackbar(true);
      dispatch(setSnackbar({type:"success",string:"Post created!"}))
      // close dialog
      handleClose();
      // refetch post list
      // postInfiniteList.refetch();
      dispatch(refetch_post_list_toggle())
      setValue("")
    },

  });

  // React.useEffect(() => {
  //   postInfiniteList.refetch()
  // },[is_post_list_refetch])

  React.useEffect(() => {
    console.log("HOME IS RUNNING !!!!!!!!!!!!!!!!!!!~~~~~~~~~")
  },[])

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

  if (postInfiniteList.isLoading)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <p>Loading....</p>
        </Container>
      </React.Fragment>
    );

  if (postInfiniteList.error)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          {console.log(postInfiniteList.error)}
          <p>Something went wrong!</p>
        </Container>
      </React.Fragment>
    );




  return (
    <React.Fragment>
      {console.log("I'm running")}
      <Container maxWidth="sm">

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
            postInfiniteList.data.pages.map((a) => (
              <>
                {/* {a.data.data.results.length == 0 && (<Typography>no posts found.</Typography>)} */}
                {a.results.map((post) => (
                  
                    <React.Fragment>
                      <PostCard
                        key={post.id}
                        data={post}
                      />
                    </React.Fragment>
                  
                ))}
              </>
            ))
          }
          <Box ref={ref}>
            {postInfiniteList.isFetchingNextPage&&(<CircularProgress/>)}
            {postInfiniteList.isFetchingNextPage
              ? 'Loading more...'
              : postInfiniteList.hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
          </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
}


