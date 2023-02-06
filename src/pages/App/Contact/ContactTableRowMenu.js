
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';

export default function ContactTableRowMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
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
                    <MenuItem onClick={handleClose}>
                        <ListItemText inset>Pin</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemText inset>Notify</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Check />
                        </ListItemIcon>
                        Following
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemText>Edit nickname</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
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