import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

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
