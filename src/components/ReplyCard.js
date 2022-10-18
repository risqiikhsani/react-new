import * as React from "react";

import Typography from "@mui/material/Typography";
import { Stack} from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton } from "@mui/material";
import {Paper} from "@mui/material";
import {Avatar} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
export default function ReplyCard(props) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{mx:'10px',my:'20px'}}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Paper sx={{p:'5px',borderRadius:'5px 20px 20px 20px'}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography variant="subtitle2">Kucing imut</Typography>
          <Typography variant="body2">3 hours ago</Typography>
        </Stack>
        <Typography variant="body1">
          That’s actually deep. Thanks for the design, would you consider making
          an interaction?
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <IconButton aria-label="like" size="small">
            <FavoriteIcon fontSize="small"/>
          </IconButton>
          <IconButton aria-label="like" size="small">
            <ReplyIcon fontSize="small"/>
          </IconButton>
        </Stack>
      </Paper>
    </Stack>
  );
}
