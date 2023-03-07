import IconButton from "@mui/material/IconButton";
import * as React from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import Tooltip from '@mui/material/Tooltip';
import NotificationMenuList from "./NotificationMenuList";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { NotificationWebsocketContext } from "../../pages/RootApp";
import { memo } from "react";





function NotificationMenuIcon(props) {
  const queryClient = useQueryClient();
  const {sendJsonMessage,lastJsonMessage} = React.useContext(NotificationWebsocketContext);

  const [badge,setBadge] = React.useState(null)
  React.useEffect(() => {
    if(lastJsonMessage){
      setBadge(lastJsonMessage.unread_items)
    }

  },[lastJsonMessage])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    queryClient.invalidateQueries("notifications");
    sendJsonMessage({
      'command':'notifications_are_read',
      'data':null,
    })
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  
  return (
    <React.Fragment>
      <Tooltip title="Notification">
        <IconButton
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          size="large"
          aria-label="show notification"
          color="inherit"
          onClick={handleClick}
        >
          <Badge badgeContent={badge} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>


      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,

          sx: {
            borderRadius: "10px 5px 10px 10px",
            width: "400px",
            height: '400px',
            overflow: "scroll",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >

        <NotificationMenuList handleClose={handleClose}/>

      </Menu>
    </React.Fragment>
  );
}


export default memo(NotificationMenuIcon);