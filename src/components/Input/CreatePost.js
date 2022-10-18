import {
  Grid,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";

export default function CreatePost() {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Paper
        sx={{ p: "20px 30px 30px 15px", width: "100%", borderRadius: "10px" }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Avatar />

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <TextField
              id="outlined-multiline-static"
              placeholder="What's on your mind?"
              multiline
              rows={4}
              value={value}
              onChange={handleChange}
              sx={{ mx: "10px", width: "100%" }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <IconButton>
                  <ImageIcon />
                </IconButton>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <EmojiEmotionsIcon />
                </IconButton>
              </Stack>
              <Button variant="contained" size="small">
                Post
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </React.Fragment>
  );
}
