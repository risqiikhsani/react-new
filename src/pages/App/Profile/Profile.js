import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import * as React from "react";
import Timeline from "./Timeline";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MutualConnections from "./MutualConnections";
import MutualGroups from "./MutualGroups";
import Posts from "./Posts";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import AppApi from "../../../api/AppApi";

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
  const navigate = useNavigate();
  let { userId } = useParams();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const userDetail = useQuery(
    ["user-detail",{id:userId}],
    () => {
      return AppApi.fetchUserDetail(userId);
    },
    {
      keepPreviousData: true,
      onSuccess:(data, variables, context) =>{
        console.log(data)
      },
    }
  );


  if (userDetail.isLoading)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <p>Loading....</p>
        </Container>
      </React.Fragment>
    );

  if (userDetail.error)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          {/* {console.log(userDetail.error)} */}
          <p>Something went wrong!</p>
        </Container>
      </React.Fragment>
    );

  


  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Stack direction="column" spacing={2}>
          <CardMedia
            component="img"
            height="194"
            image={userDetail.data.data.profile.poster_picture!==undefined ? userDetail.data.data.profile.poster_picture : ""}
            alt="Paella dish"
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ width: 70, height: 70 }} src={userDetail.data.data.profile.profile_picture!==undefined ? userDetail.data.data.profile.profile_picture : "" }/>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                
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
                sx={{ textTransform: "none" }}
              >
                Connect
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                size="small"
                startIcon={<ChatIcon />}
              >
                Message
              </Button>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ bgcolor: "whitesmoke", borderRadius: "20px", p: "20px" }}
          >
            <Typography>about</Typography>
            
          </Stack>

          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ textTransform: "none" }}
                label="Timeline"
                {...a11yProps(0)}
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Posts"
                {...a11yProps(1)}
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Mutual Connections"
                {...a11yProps(2)}
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Mutual Groups"
                {...a11yProps(3)}
              />
            </Tabs>

            <TabPanel value={value} index={0}>
              <Timeline />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Posts />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MutualConnections />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <MutualGroups />
            </TabPanel>
          </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
}
