import * as React from "react";
import { useState } from "react";
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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Message() {
  const [hover, setHover] = useState(false);

  return (
    <React.Fragment>
      <ListItem
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        alignItems="flex-start"
        sx={{ maxWidth: "80%", bgcolor: "white" }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography>Alex</Typography>
              {hover && (
                <ButtonGroup
                  size="small"
                  variant="contained"
                  aria-label="outlined primary button group"
                  
                >
                  <IconButton size="small">
                    <AddReactionIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <ReplyIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </ButtonGroup>
              )}
            </Stack>
          }
          secondary="I'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands thisI'll be in your neighborhood doing errands this your neighborhood doing errands this…"
        />
      </ListItem>
    </React.Fragment>
  );
}
