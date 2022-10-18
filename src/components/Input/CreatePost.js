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
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";

export default function CreatePost() {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Paper sx={{ p: "30px",width:'100%',borderRadius:'10px' }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Avatar />

            <TextField
              id="outlined-multiline-static"
              placeholder="What's on your mind?"
              multiline
              rows={4}
              value={value}
              onChange={handleChange}
              sx={{ flexGrow: 1, mx: "10px" }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button>Post</Button>
            <Button>Post</Button>
          </Stack>
        </Stack>
      </Paper>
    </React.Fragment>
  );
}
