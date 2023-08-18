import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import * as React from "react";




//


import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from "@mui/material/InputBase";
import Paper from '@mui/material/Paper';









function SimpleDialog(props) {
  const { handleClose, open } = props;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Search</DialogTitle>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search Anything you need"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      </Paper>
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar/>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <Avatar/>
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};




export default function SearchMenuIcon(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton
          size="large"
          aria-label="search"
          color="inherit"
          onClick={handleClickOpen}
        >
          <Badge badgeContent={0} color="error">
            <SearchIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <SimpleDialog
        handleClose={handleClose}
        open={open}
      />

    </React.Fragment>
  );
}
