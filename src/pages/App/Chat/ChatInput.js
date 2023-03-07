import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, TextField } from "@mui/material";
import * as React from "react";
import { memo } from "react";
import { useState } from "react";

function ChatInput(props) {
  const {onSend} = props;


  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  
  const handleClick = () => {
    onSend({
        'command':'chat',
        'data':{
            'text':input,
        }
    })
  }

  
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
        <IconButton onClick={handleClick}>
          <SendIcon />
        </IconButton>
 
    </React.Fragment>
  );
}


export default memo(ChatInput)