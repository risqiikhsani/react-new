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
import { memo } from "react";


function EditProfileDial(props) {
    const [updateProfilePicture, setUpdateProfilePicture] = React.useState(null)
    const [profilePicturePreview,setProfilePicturePreview] = React.useState(props.data.profile.profile_picture.medium)
    // const onDrop = React.useCallback(acceptedFiles => {
    //     setUpdateProfilePicture(acceptedFiles)
    // }, [])


    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const { getRootProps:getRootPropsProfile, getInputProps:getInputPropsProfile } = useDropzone({
        onDrop:(acceptedFiles) => {
            setUpdateProfilePicture(acceptedFiles)
        },
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg', '.webpg'],
        },
        maxFiles:1,
    });

    const [updatePosterPicture, setUpdatePosterPicture] = React.useState(null)
    const [posterPicturePreview,setPosterPicturePreview] = React.useState(props.data.profile.poster_picture.medium)
    // const onDropPoster = React.useCallback(acceptedFiles => {
    //     setUpdatePosterPicture(acceptedFiles)
    // }, [])
    const { getRootProps:getRootPropsPoster, getInputProps:getInputPropsPoster } = useDropzone({
        onDrop:(acceptedFiles) => {
            setUpdatePosterPicture(acceptedFiles)
        },
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg', '.webpg'],
        },
        maxFiles:1,
    });

    React.useEffect(() => {
        if(updateProfilePicture!==null){
            const objectUrl = URL.createObjectURL(updateProfilePicture[0])
            setProfilePicturePreview(objectUrl)
            // return () => URL.revokeObjectURL(objectUrl)
        }
        if(updatePosterPicture!==null){
            const objectUrl2 = URL.createObjectURL(updatePosterPicture[0])
            setPosterPicturePreview(objectUrl2)
            // return () => URL.revokeObjectURL(objectUrl2)
        }
    },[updateProfilePicture,updatePosterPicture])

    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        setUpdateProfilePicture(null)
        setUpdatePosterPicture(null)
        setName(props.data.profile.name)
        setPublicUsername(props.data.profile.public_username)
        setAbout(props.data.profile.about)
    };
    const handleClose = () => setOpen(false);

    const [name, setName] = React.useState(props.data.profile.name);
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [publicUsername, setPublicUsername] = React.useState(props.data.profile.public_username);
    const handleChangePublicUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublicUsername(event.target.value);
    };

    const [about, setAbout] = React.useState(props.data.profile.about);
    const handleChangeAbout = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAbout(event.target.value);
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
        },
        onSuccess: (data, variables, context) => {
            dispatch(setSnackbar({ type: "success", string: "Profile Updated !" }));
            
            handleClose();

            // queryClient.invalidateQueries("posts");
        },
    });

    const onSubmitUpdateProfile = (event) => {
        event.preventDefault();

        var form = new FormData();
        form.append("name", name);
        form.append("public_username",publicUsername);
        form.append("about",about);
        if (updateProfilePicture !== null) {
            updateProfilePicture.forEach(element => {
                form.append("profile_picture", element);
            });
        }

        if(updatePosterPicture !== null){
            updatePosterPicture.forEach(element => {
                form.append("poster_picture",element);
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
            {console.log(updateProfilePicture)}
            {console.log(updatePosterPicture)}
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
                                        src={profilePicturePreview}
                                        //src={updateProfilePicture ? window.URL.createObjectURL(updateProfilePicture[0].path) : props.data.profile.profile_picture.medium || null}
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
                                        <Button {...getRootPropsProfile({ className: 'dropzone' })} variant="contained" endIcon={<EditIcon />} sx={{ borderRadius: '10px', m: '10px', textTransform: 'none' }}>
                                            <input {...getInputPropsProfile()} />
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
                                        image={posterPicturePreview}
                                        //image={updatePosterPicture ? window.URL.createObjectURL(updatePosterPicture[0].path) : props.data.profile.poster_picture.medium || null}
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
                                        <Button {...getRootPropsPoster({ className: 'dropzone' })} variant="contained" endIcon={<EditIcon />} sx={{ borderRadius: '10px', m: '10px', textTransform: 'none' }}>
                                            <input {...getInputPropsPoster()} />
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
                            value={name}
                            onChange={handleChangeName}
                            variant="standard"
                        />

                        <TextField
                            fullWidth
                            error={false}
                            id="input-with-icon-textfield"
                            label="Public Username"
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
                            value={publicUsername}
                            variant="standard"
                            onChange={handleChangePublicUsername}
                            helperText="the displayed username"
                        />

                        <TextField
                            fullWidth
                            id="standard-textarea"
                            label="About me"
                            multiline
                            variant="standard"
                            maxRows={6}
                            value={about}
                            onChange={handleChangeAbout}
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
                        onClick={onSubmitUpdateProfile}
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

export default memo(EditProfileDial);