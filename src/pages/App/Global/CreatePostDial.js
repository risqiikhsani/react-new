import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as React from "react";

import { Box, IconButton, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
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

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

import { useDropzone } from "react-dropzone";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PollIcon from '@mui/icons-material/Poll';
import PostAddIcon from '@mui/icons-material/PostAdd';
import QuizIcon from '@mui/icons-material/Quiz';
import { post_api } from "../../../api/Api";
import EmojiPickerButton from "./EmojiPickerButton";

const actions = [
    { icon: <PostAddIcon />, name: 'Create Post' },
    { icon: <PollIcon />, name: 'Create Votes' },
    { icon: <QuizIcon />, name: 'Ask Questions' },
    { icon: <OndemandVideoIcon />, name: 'Create Reels' },
];

export default function CreatePostDial(props) {
    const [media, setMedias] = React.useState(null)
    const onDrop = React.useCallback(acceptedFiles => {
        console.log("test")
        console.log(acceptedFiles)
        setMedias(acceptedFiles)
    }, [])
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg', '.webpg'],
            'text/html': ['.html', '.htm'],
        }
    });



    // const count = useSelector((state) => state.counter.value)
    const authenticated_user_id = useSelector((state) => state.user.id);
    const authenticated_user_name = useSelector((state) => state.user.name);

    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const createPost = useMutation({
        mutationFn: (data) => {
            return post_api.create(data);
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

    const onSubmitCreatePost = (event) => {
        event.preventDefault();

        var form = new FormData();
        form.append("text", value);
        if (media !== null) {
            media.forEach(element => {
                form.append(element.name, element);
            });
        }

        try {
            // createPost.mutate({
            //   text: value,
            // });
            createPost.mutate(form);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <React.Fragment>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <DialogTitle>Create Post
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
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


                    <Box {...getRootProps({ className: 'dropzone' })} sx={{ mt: '10px', bgcolor: "aquamarine", borderRadius: '20px', p: '30px' }}>
                        <input {...getInputProps()} />
                        <Typography>Drag 'n' drop some files here, or click to select files</Typography>
                    </Box>

                    {acceptedFiles && (
                        <React.Fragment>
                            <Typography>Files : </Typography>
                            {
                                acceptedFiles.map(file => (
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={1}
                                        sx={{ bgcolor: "palegreen", borderRadius: '20px', p: '5px', mt: '5px' }}
                                    >
                                        <Typography>{file.path}</Typography>
                                        <Box sx={{ bgcolor: "white", borderRadius: '20px', p: '5px', fontSize: '10px' }}>{file.size} bytes</Box>
                                    </Stack>))
                            }
                        </React.Fragment>
                    )}
                </DialogContent>

                <DialogActions>

                    

                    <Box sx={{ flexGrow: 1 }} />
                    <EmojiPickerButton 
                        value={value}
                        setValue={setValue}
                    />
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
                ariaLabel="Create Something"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<AddIcon />}
            >
                {actions.map((action) => (

                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleOpen}
                    />
                ))}
            </SpeedDial>

        </React.Fragment>
    )
}