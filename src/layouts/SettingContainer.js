import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet } from "react-router";
import { Container, Stack } from "@mui/system";
import { IconButton, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

const drawerWidth = "30%";

// const routeDrawer = [
//     {
//       name: "Back",
//       route: "/",
//       icon: ,

//     },
//     {
//       name: "Chats",
//       route: "/chats",
//       icon:,
//     },
//     {
//       name: "Groups",
//       route: "/groups",
//       icon: ,
//     },
//     {
//       name: "Friends",
//       route: "/contact",
//       icon: ,
//     },

//   ];

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth})`,
          ml: `${drawerWidth}`,
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button startIcon={<CancelOutlinedIcon />}>ESC</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Button
            size="large"
            startIcon={<ArrowBackIosIcon fontSize="inherit" />}
            component={Link}
            to="/"
          >
            BACK
          </Button>
        </Toolbar>
        <Toolbar />

        <List>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={2}
          >
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ maxWidth: "240px" }}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </Stack>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", pl: 3, pr: 10 }}
      >
        <Toolbar />
        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
