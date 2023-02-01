import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as React from "react";

import { Avatar, Box, CardMedia, IconButton, InputAdornment, SpeedDial, Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { useDropzone } from "react-dropzone";
import AppApi from "../../../api/AppApi";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";

import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';


export default function EditProfileDial(props) {
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


    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };



    const updateProfile = useMutation({
        mutationFn: (data) => {
            return AppApi.updateProfile(data);
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
            dispatch(setSnackbar({ type: "success", string: "Profile Updated !" }));
            // close dialog
            handleClose();
            // refetch post list
            // queryClient.invalidateQueries("posts");
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
            updateProfile.mutate(form);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <React.Fragment>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <DialogTitle>Update Profile
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
                    {updateProfile.isError && (
                        <Alert variant="filled" severity="error">
                            Something went wrong !
                        </Alert>
                    )}

                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={4}
                        sx={{ maxWidth: '800px' }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            <Box sx={{ border: 1, bgcolor:"whitesmoke",borderColor: 'whitesmoke', borderRadius: '20px', p: '10px' }}>
                            <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                <Typography>Profile Picture</Typography>
                                
                                    <Avatar
                                        alt=""
                                        src={props.data.profile.profile_picture.medium || null}
                                        sx={{ width: '150px', height: '150px' }}
                                    />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={0}
                                    >
                                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ borderRadius: '10px', m: '10px', textTransform: 'none' }}>
                                            Delete Photo
                                        </Button>
                                        <Button variant="contained" endIcon={<EditIcon />} sx={{ borderRadius: '10px', m: '10px', textTransform: 'none' }}>
                                            Change Photo
                                        </Button>
                                    </Stack>

                                </Stack>

                            </Box>



                            <Box sx={{ border: 1, bgcolor:"whitesmoke",borderColor: 'whitesmoke', borderRadius: '20px', p: '10px' }}>
                            <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                <Typography>Poster Picture</Typography>
                                
                                    <CardMedia
                                        sx={{ borderRadius: '10px' }}
                                        component="img"
                                        height="200px"
                                        width="300px"
                                        image={props.data.profile.poster_picture.medium || null}
                                    />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={0}
                                    >
                                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ borderRadius: '10px', m: '10px', textTransform: 'none' }}>
                                            Delete Photo
                                        </Button>
                                        <Button variant="contained" endIcon={<EditIcon />} sx={{ borderRadius: '10px', m: '10px', textTransform: 'none' }}>
                                            Change Photo
                                        </Button>
                                    </Stack>

                                </Stack>
                            </Box>

                        </Stack>



                        <TextField
                            fullWidth
                            error={false}
                            id="outlined-name"
                            label="Name"
                            value={null}
                            defaultValue={props.data.profile.name || null}
                            onChange={null}
                            variant="standard"
                        />

                        <TextField
                            fullWidth
                            error={false}
                            id="input-with-icon-textfield"
                            label="Public Username"
                            defaultValue={props.data.profile.public_username || null}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CheckCircleIcon color="success" />
                                    </InputAdornment>
                                )
                            }}

                            variant="standard"
                            onChange={null}
                            helperText="the displayed username"
                        />

                        <TextField
                            fullWidth
                            id="standard-textarea"
                            label="About me"
                            multiline
                            variant="standard"
                            maxRows={6}
                            defaultValue={props.data.profile.about}
                            onChange={null}
                        />
                    </Stack>

                </DialogContent>

                <DialogActions>

                    <IconButton>
                        <EmojiEmotionsIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        loading={updateProfile.isLoading}
                        loadingPosition="end"
                        onClick={onSubmitCreatePost}
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ position: "fixed", bottom: 100, right: 16, textTransform: 'none', borderRadius: '20px' }}
                onClick={handleOpen}
            >
                Edit Profile
            </Button>



        </React.Fragment>
    )
}