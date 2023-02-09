
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { memo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { connection_api, relationship_api } from '../../../api/Api';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../../hooks/slices/snackbarSlice';
import { LoadingButton } from '@mui/lab';
import DialogConfirmation from '../Global/DialogConfirmation';

function ContactTableRowMenu(props) {

    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    
    const { 
        user_name,
        user_id,
        pin,
        notification,
        follow,
        nickname,
        is_connected,
        is_blocked } = props

    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    const updateRelationship = useMutation({
        mutationFn: (data) => {
            return relationship_api.update(user_id,data);
        },
        onSuccess: (data, variables, context) => {
            dispatch(setSnackbar({ type: "success", string: "Relationship Updated !" }));
            queryClient.invalidateQueries("connections");
        },
    });

    const disconnectUser = useQuery(
        ["disconnect-user",{id:user_id}],
        () => {
            return connection_api.disconnect(user_id);
        },
        {
          keepPreviousData: true,
          refetchOnWindowFocus: false,
          enabled: false,
          onSuccess: (data, variables, context) => {
            dispatch(setSnackbar({ type: "success", string: "User removed !" }));
            queryClient.invalidateQueries("connections");
        },
        }
    );

    const disconnectUserButton = (event) => {
        event.preventDefault();
        disconnectUser.refetch()
    }
    


    const updatePinButton = (event) => {
        console.log("clicked")
        event.preventDefault();
        let data = {
            pin:pin ? false:true,
        }
        
        try {
            updateRelationship.mutate(data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateNotifyButton = (event) => {
        event.preventDefault();
        let data = {
            notification:notification ? false:true,
        }
        try {
            updateRelationship.mutate(data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateFollowingButton = (event) => {
        event.preventDefault();
        let data = {
            follow:follow ? false:true,
        }
        try {
            updateRelationship.mutate(data);
        } catch (err) {
            console.log(err);
        }
    };

    const [value,setValue] = React.useState(nickname);
    const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const updateNicknameButton = (event) => {
        event.preventDefault();
        let data = {
            nickname:value,
        }
        try {
            updateRelationship.mutate(data);
        } catch (err) {
            console.log(err);
        }
    };

    

    const [openEditNickname, setOpenEditNickname] = React.useState(false);
    const handleOpenEditNickname = () => {
        setOpenEditNickname(true)
        setValue(nickname)
    };
    const handleCloseEditNickname = () => {setOpenEditNickname(false)};

    const [openConfirmation1,setOpenConfirmation1] = React.useState(false);
    const handleOpenConfirmation1 = () => {setOpenConfirmation1(true)};
    const handleCloseConfirmation1 = () => {setOpenConfirmation1(false)};
    const [openConfirmation2,setOpenConfirmation2] = React.useState(false);
    const handleOpenConfirmation2 = () => {setOpenConfirmation2(true)};
    const handleCloseConfirmation2 = () => {setOpenConfirmation2(false)};



    return (
        <React.Fragment>
            <DialogConfirmation
                is_open = {openConfirmation1}
                title = "Disconnect user :"
                text = {`${user_name}  `}
                submitfunction = {disconnectUserButton}
                handleClose = {handleCloseConfirmation1}
            />
            <DialogConfirmation
                is_open = {openConfirmation2}
                title = "Block user :"
                text = {`${user_name}  `}
                submitfunction = {null}
                handleClose = {handleCloseConfirmation2}
            />

            <Dialog open={openEditNickname} onClose={handleCloseEditNickname}>
                <DialogTitle>Change nickname</DialogTitle>
                <DialogContent sx={{ minWidth: "500px" }}>
                        <TextField
                            fullWidth
                            id="outlined-name"
                            label="Nickname"
                            value={value}
                            onChange={handleChangeNickname}
                            variant="standard"
                        />
                </DialogContent>
                <DialogActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={handleCloseEditNickname}>Cancel</Button>
                    <LoadingButton
                        loading={updateRelationship.isLoading}
                        loadingPosition="end"
                        onClick={(event)=>{updateNicknameButton(event);handleCloseEditNickname(event);}}
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <IconButton
                id="menu-button"
                aria-controls={open ? 'row-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            ><ExpandMoreIcon /></IconButton>
            <Menu
                id="row-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                }}
            >
                <MenuList dense>
                    <MenuItem onClick={(event)=> {updatePinButton(event);handleClose(event);}}>
                        {pin && <ListItemIcon><Check /></ListItemIcon>}
                        <ListItemText inset={pin ? false : true}>Pin</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={(event)=> {updateNotifyButton(event);handleClose(event);}}>
                        {notification && <ListItemIcon><Check /></ListItemIcon>}
                        <ListItemText inset={notification ? false : true}>Notify</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={(event)=> {updateFollowingButton(event);handleClose(event);}}>
                        {follow && <ListItemIcon><Check /></ListItemIcon>}
                        <ListItemText inset={follow ? false : true}>Following</ListItemText>
                    </MenuItem>
                    <Divider />
                    {
                        is_connected && (
                            <>
                                <MenuItem onClick={(event)=>{handleOpenEditNickname(event);handleClose(event);}}>
                                    <ListItemText>Edit nickname</ListItemText>
                                </MenuItem>
                                <Divider />
                            </>)

                    }


                    {
                        is_connected && <MenuItem onClick={(event)=> {handleOpenConfirmation1(event);handleClose(event);}}>
                            <ListItemText>Disconnect user</ListItemText>
                        </MenuItem >
                    }

                    <MenuItem onClick={(event)=> {handleOpenConfirmation2(event);handleClose(event);}}>
                        <ListItemText>Block user</ListItemText>
                    </MenuItem >

                    <MenuItem onClick={handleClose}>
                        <ListItemText>Report user</ListItemText>
                    </MenuItem>
                </MenuList >
            </Menu>
        </React.Fragment>
    )
}

export default memo(ContactTableRowMenu)