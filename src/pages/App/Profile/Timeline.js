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
  Divider,
  Container,
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

import CreatePost from "../../../components/Input/CreatePost";
import PostCard from "../../../components/PostCard";

const dataConnectedPlatform = [
  {
    name: "email",
    source: "kucingimut@gmail.com",
  },
];

function About() {
  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", p: "10px",borderRadius:'10px' }}>
        <Typography variant="h6">About</Typography>
        <Divider />
        <Typography variant="body2" sx={{p:'20px'}}>
          akwokwaoakwowkaokwaoawkwaokwaokwaoawkoawkowo akwoawkoawka wokaw
          akwokwaoakwowkaokwa oawkwaokwaokwaoawkoawkowoakwoawkoawkawokaw
          akwokwaoakwowkaokwaoawkwaokwaokwaoawkoa wkowoakwoawkoawkawokaw
        </Typography>
      </Paper>
    </React.Fragment>
  );
}

function ContactMeBy() {
  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", p: "10px",borderRadius:'10px' }}>
        <Typography variant="h6">Contact me by</Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="email" src="/platforms/gmail.png" />
            </ListItemAvatar>
            <ListItemText primary="Email" secondary="zwewewew@gmail.com" />
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
}

function ConnectedPlatform() {
  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", p: "10px",borderRadius:'10px' }}>
        <Typography variant="h6">Connected Platforms</Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="spotify" src="/platforms/spotify.png" />
            </ListItemAvatar>
            <ListItemText primary="Spotify" secondary="zwewewew" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="discord" src="/platforms/discord.png" />
            </ListItemAvatar>
            <ListItemText primary="Discord" secondary="kawdw#1212" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Steam" src="/platforms/steam.png" />
            </ListItemAvatar>
            <ListItemText primary="Steam" secondary="kucingimut12" />
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
}

export default function Timeline(props) {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Container maxWidth="md">
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <About />
                <ContactMeBy />
                <ConnectedPlatform />
              </Stack>
            </Container>
          </Grid>
          <Grid item xs={12} md={7}>
            <Container maxWidth="md">
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <CreatePost />
                <PostCard />
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
