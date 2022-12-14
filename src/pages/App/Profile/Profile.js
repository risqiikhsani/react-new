import { Avatar, Button, Container, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import Timeline from "./Timeline";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MutualConnections from "./MutualConnections";
import MutualGroups from "./MutualGroups";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Avatar sx={{ width: 70, height: 70 }} />
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={1}
          >
            <Typography>nama</Typography>
            <Typography>id</Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<PersonAddIcon />}
          >
            Connect
          </Button>
          <Button variant="contained" size="small" startIcon={<ChatIcon />}>
            Message
          </Button>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ width: "100%", mt: "20px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Timeline" {...a11yProps(0)} />
            <Tab label="Mutual Connections" {...a11yProps(1)} />
            <Tab label="Mutual Groups" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Timeline />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MutualConnections/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MutualGroups/>
        </TabPanel>
      </Box>
      </Container>
      
    </React.Fragment>
  );
}
