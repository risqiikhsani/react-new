import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton } from "@mui/material";
import { Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import { TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

export default function ChatInput(props) {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <React.Fragment>

        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>
        <IconButton aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <AttachFileIcon />
        </IconButton>
  
      
      <TextField
        sx={{ flexGrow: 1 ,mx:'10px'}}
        multiline
        maxRows={4}
        id="outlined-comment"
        value={input}
        onChange={handleChange}
        size="small"
      />

        <IconButton>
          <MicIcon />
        </IconButton>
        <IconButton>
          <SendIcon />
        </IconButton>
 
    </React.Fragment>
  );
}
