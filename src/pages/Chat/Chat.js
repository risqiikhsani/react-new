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
import { Avatar } from "@mui/material";
import { ListItemAvatar } from "@mui/material";

const drawerWidth = 240;

const data = [
  {
    id: 1,
    room: {
      room_name: "Kucing",
      room_type: "person",
      room_image: null,
      pinned: true,
    },
    last_text: {
      message_sender: "kucing",
      text: "halo..",
    },
    timestamp: "10:30 AM",
    unread_messages: 3,
  },
  {
    id: 2,
    room: {
      room_name: "Semut",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Semut",
      text: "ui",
    },
    timestamp: "10:40 AM",
    unread_messages: 1,
  },
  {
    id: 3,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 4,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 5,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 6,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 7,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 8,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 9,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 10,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
];

function Chat(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />
      <Divider />
      <List>
        {data.map((item) => (
          <>
            <ListItem alignItems="flex-start" key={item.id}>
              <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={item.room.room_image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.room.room_name}
                secondary={item.last_text.text}
              />
              </ListItemButton>
              
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", flexGrow: 1, bgcolor: "green" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth + 240}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              left: { sm: 240 },
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              left: { sm: 240 },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
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

// import * as React from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";

// const data = [
//   {
//     id: 1,
//     room: {
//       room_name: "Kucing",
//       room_type: "person",
//       room_image: null,
//       pinned: true,
//     },
//     last_text: {
//       message_sender: "kucing",
//       text: "halo..",
//     },
//     timestamp: "10:30 AM",
//     unread_messages: 3,
//   },
//   {
//     id: 2,
//     room: {
//       room_name: "Semut",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Semut",
//       text: "ui",
//     },
//     timestamp: "10:40 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 3,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 4,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 5,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 6,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 7,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 8,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 9,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
//   {
//     id: 10,
//     room: {
//       room_name: "Boi",
//       room_type: "person",
//       room_image: null,
//       pinned: false,
//     },
//     last_text: {
//       message_sender: "Boi",
//       text: "hello",
//     },
//     timestamp: "10:50 AM",
//     unread_messages: 1,
//   },
// ];

// export default function Chat(props) {
//   return (
//     <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//       {data.map((item) => (
//         <>
//           <ListItem alignItems="flex-start" key={item.id}>
//             <ListItemAvatar>
//               <Avatar alt={item.room.room_image} />
//             </ListItemAvatar>
//             <ListItemText
//               primary={item.room.room_name}
//               secondary={item.last_text.text}
//             />
//           </ListItem>
//           <Divider variant="inset" component="li" />
//         </>
//       ))}
//     </List>
//   );
// }
