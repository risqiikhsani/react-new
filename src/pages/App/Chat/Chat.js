import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ChatRoom from "./ChatRoom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const drawerWidth = 400;
const drawerWidthOuter = 240;

const ChatBarColor = "#ade8f4";
function Chat(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
      <IconButton>
          <ArrowBackIosIcon/>
        </IconButton>
      </Toolbar>

      

      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", m: "10px" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Chat"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography>Tyler</Typography>}
                  secondary={text}
                />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Chip label={122} color="success" size="small" />
                  <Typography variant="caption">3h</Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            lg: `calc(100% - ${drawerWidth + drawerWidthOuter}px)`,
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            lg: `${drawerWidth + drawerWidthOuter}px`,
            md: `${drawerWidth}px`,
          },
          zIndex: "1060",
          bgcolor:ChatBarColor,
          // background: 'transparent', boxShadow: 'none',
          boxShadow: 'none',
        }}
      >
        <Toolbar />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            sx={{ borderRadius: "20px", mx:'5px' }}
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
          >
            Chat
          </Button>
          <Button
            sx={{ borderRadius: "20px", mx:'5px' }}
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
          >
            Group Chat
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: "1070",
            display: { xs: "block", lg: "none", },
            "& .MuiDrawer-paper": {
              bgcolor:ChatBarColor,
              zIndex: "1070",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            zIndex: "1070",
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              bgcolor:ChatBarColor,
              zIndex: "1070",
              boxSizing: "border-box",
              width: drawerWidth,
              ml: { lg: `${drawerWidthOuter}px` },
            },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          
          flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } ,
          
        }}
      >
        <Toolbar />
        <ChatRoom />
      </Box>
    </Box>
  );
}

Chat.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Chat;
