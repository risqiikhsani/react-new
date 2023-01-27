import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import * as React from "react";

import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SpeedDial, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useInView } from "react-intersection-observer";

import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from '@mui/icons-material/Delete';

import AppApi from "../../../api/AppApi";
import PostSkeleton from "../../../components/SuspenseFallback/PostSkeleton";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";
import PostCard from "../Post/PostCard";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = (<React.Fragment>
    <List>
      {
        acceptedFiles.map(file => (
          <ListItem disablePadding key={file.path}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
          >
            <ListItemButton>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary={file.path} secondary={`${file.size} bytes`} />
            </ListItemButton>
          </ListItem>
        ))
      }

    </List>
  </React.Fragment>)
  // const count = useSelector((state) => state.counter.value)
  const authenticated_user_id = useSelector((state) => state.user.id);
  const authenticated_user_name = useSelector((state) => state.user.name);
  const is_post_list_refetch = useSelector(
    (state) => state.refetch.post_list_refetch
  );

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { ref, inView } = useInView();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const postInfiniteList = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const res = await AppApi.fetchPostList(`?page=${pageParam}`);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      keepPreviousData: true,
      onError: (error, variables, context) => {
        dispatch(
          setSnackbar({
            type: "error",
            string: "Something went wrong !",
            detail: error.message,
          })
        );
      },
    }
  );

  React.useEffect(() => {
    if (inView) {
      postInfiniteList.fetchNextPage();
    }
  }, [inView]);

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
      dispatch(
        setSnackbar({
          type: "error",
          string: "Something went wrong !",
          detail: error.message,
        })
      );
      setValue("");
    },
    onSuccess: (data, variables, context) => {
      console.log("success create post");
      // open snackbar success
      // setOpenSnackbar(true);
      dispatch(setSnackbar({ type: "success", string: "Post created!" }));
      // close dialog
      handleClose();
      // refetch post list
      queryClient.invalidateQueries("posts");
      // postInfiniteList.refetch();
      // dispatch(refetch_post_list_toggle())
      setValue("");
    },
  });

  // React.useEffect(() => {
  //   postInfiniteList.refetch()
  // },[is_post_list_refetch])

  React.useEffect(() => {
    console.log("HOME IS RUNNING !!!!!!!!!!!!!!!!!!!~~~~~~~~~");
  }, []);

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
          <PostSkeleton />
        </Container>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      {console.log("Home JSX is running")}
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


              <Box {...getRootProps({ className: 'dropzone' })} sx={{ bgcolor: "aquamarine",borderRadius:'20px',p:'30px' }}>
                <input {...getInputProps()} />
                <Typography>Drag 'n' drop some files here, or click to select files</Typography>
              </Box>
              <Typography>Files : </Typography>
              {files}
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

          {postInfiniteList.data.pages.map((a) => (
            <>
              {/* {a.data.data.results.length == 0 && (<Typography>no posts found.</Typography>)} */}
              {a.results.map((post) => (
                <PostCard key={post.id} data={post} />
              ))}
            </>
          ))}
          <Box ref={ref}>
            {postInfiniteList.isFetchingNextPage ? (
              <PostSkeleton />
            ) : postInfiniteList.hasNextPage ? (
              "Load Newer"
            ) : (
              "Nothing more to load"
            )}
          </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
}
