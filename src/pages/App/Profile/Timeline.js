import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import * as React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import WebIcon from '@mui/icons-material/Web';

const data = [
  {
    name:'Connections',
    amount:29,
    icon:<PeopleIcon/>,
  },
  {
    name:'Community',
    amount:10,
    icon:<GroupWorkIcon/>
  },
  {
    name:'Group',
    amount:23,
    icon:<GroupsIcon/>
  },
  {
    name:'Fanspage Following',
    amount:30,
    icon:<WebIcon/>
  },
]

const platforms = [
  {
    name:'spotify',
    icon:"",
    name_account: "kucing",
    link_account: "spotify.com/id/awdawdwa",
  },
  {
    name:'steam',
    icon:"",
    name_account: "kucing channel",
    link_account: "spotify.com/id/awdawdwa",
  },
  {
    name:'Youtube',
    icon:"",
    name_account: "kucing channel",
    link_account: "spotify.com/id/awdawdwa",
  },
  {
    name:'Twitch',
    icon:"",
    name_account: "kucing shooter",
    link_account: "spotify.com/id/awdawdwa",
  },
  {
    name:'instagram',
    icon:"",
    name_account: "scarlett",
    link_account: "spotify.com/id/awdawdwa",
  },
]

const loved_topics = [
  {
    name:"developer",
  },
  {
    name:"programmer",
  },
  {
    name:"computer science",
  },
  {
    name:"python",
  },
  {
    name:"C++",
  },
  
]

export default function Timeline() {
  return (
    <React.Fragment>
      <List>
        <Grid container>
        {data.map((a) => (
          <Grid item md={6}>
          <ListItem>
          <ListItemButton sx={{bgcolor:'whitesmoke',borderRadius:'10px',boxShadow:3}}>
            <ListItemAvatar>
              <Avatar>
                {a.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={a.name} secondary={a.amount} />
          </ListItemButton>
        </ListItem>
        </Grid>
        ))}

        </Grid>
        

      </List>
      
      <Box>
        <Typography>General info</Typography>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
      </Box>
      
      <Box>
        <Typography>Connected Platforms</Typography>
      </Box>

      <Box>
        <Typography>Related topics</Typography>
      </Box>
      
    </React.Fragment>
  );
}
