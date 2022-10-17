import { Grid, Paper, Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import EmailIcon from '@mui/icons-material/Email';



const dataConnectedPlatform = [
    {
        name:"email",
        source:"kucingimut@gmail.com",
    }
]


export default function Timeline(props) {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Paper sx={{width:'100%',p:'10px'}}>
                <Typography variant="h6">
                    About
                </Typography>
                <Typography variant="body2">
                akwokwaoakwowkaokwaoawkwaokwaokwaoawkoawkowo akwoawkoawka wokaw akwokwaoakwowkaokwa oawkwaokwaokwaoawkoawkowoakwoawkoawkawokaw akwokwaoakwowkaokwaoawkwaokwaokwaoawkoa wkowoakwoawkoawkawokaw
                </Typography>
              </Paper>
              <Paper sx={{width:'100%',p:'10px'}}>
                <Typography variant="h6">
                    Connected Platforms
                </Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="spotify" src="/platforms/spotify.png"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Spotify"
                            secondary="zwewewew"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="discord" src="/platforms/discord.png"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Discord"
                            secondary="kawdw#1212"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Steam" src="/platforms/steam.png"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Steam"
                            secondary="kucingimut12"
                        />
                    </ListItem>
                </List>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>test</Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
