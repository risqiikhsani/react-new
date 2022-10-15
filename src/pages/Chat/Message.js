import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IconButton, Box, Stack } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Message() {
  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Alex"
          secondary="I'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands this…"
        />
        <Box>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <IconButton edge="end" aria-label="comments">
              <MoreVertIcon />
            </IconButton>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              spacing={1}
            >
              <IconButton edge="end" aria-label="comments" >
                <AddReactionIcon />
              </IconButton>
              <IconButton edge="end" aria-label="comments" sx={{ ml: "20px" }}>
                <ReplyIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </ListItem>
    </React.Fragment>
  );
}
