import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  Box,
  Button,
  CardMedia, Divider,
  IconButton,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import * as React from "react";
import { memo } from "react";
import ContactTableRowMenu from "../Contact/ContactTableRowMenu";
import MutualConnections from "./MutualConnections";
import MutualGroups from "./MutualGroups";
import Posts from "./Posts";
import Timeline from "./Timeline";

import PushPinIcon from '@mui/icons-material/PushPin';
import { orange } from "@mui/material/colors";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";
import { request_api } from "../../../api/Api";
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

function Profile(props) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { data, mine, ...other } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendRequest = useQuery(
    ["send-request", { id: data.id }],
    () => {
      return request_api.send_request(data.id);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data, variables, context) => {
        dispatch(setSnackbar({ type: "success", string: "Request Sent !" }));
        queryClient.invalidateQueries("user-detail", { id: data.id });
      },
    }
  );

  const cancelRequest = useQuery(
    ["cancel-request", { id: data.id }],
    () => {
      return request_api.cancel_sent_request(data.id);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data, variables, context) => {
        dispatch(setSnackbar({ type: "success", string: "Request Cancelled !" }));
        queryClient.invalidateQueries("user-detail", { id: data.id });
      },
    }
  );

  const sendRequestButton = (event) => {
    event.preventDefault();
    sendRequest.refetch()
  }

  const cancelRequestButton = (event) => {
    event.preventDefault();
    cancelRequest.refetch()
  }

  return (
    <React.Fragment>
      <Stack direction="column" spacing={2}>
        {data.profile.poster_picture && (
          <CardMedia
            component="img"
            image={data.profile.poster_picture.full_size || null}
            sx={{ borderRadius: '10px' }}
          />
        )}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Avatar sx={{ width: 70, height: 70 }} src={data.profile.profile_picture.medium || null} />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography noWrap={true} fontSize="30px">{data.profile.name}

                {data.relationship ? data.relationship.pin && <PushPinIcon sx={{ color: orange[800] }} /> : null}
                {data.relationship ? data.relationship.notification && <NotificationsActiveIcon sx={{ color: orange[800] }} /> : null}
                {data.relationship ? data.relationship.follow && <HowToRegIcon sx={{ color: orange[800] }} /> : null}
              </Typography>
              {data.relationship ? <Typography noWrap={true} fontSize="20px">{data.relationship.nickname}</Typography> : null}
              <Typography noWrap={true} fontSize="10px">Arizona,United States</Typography>
            </Stack>
          </Stack>






        </Stack>

        {mine !== true && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {data.is_connected ? (
              <Button
                disabled
                variant="contained"

                startIcon={<CheckCircleIcon color="success" />}
                sx={{ textTransform: "none", borderRadius: '20px' }}
              >
                Connected
              </Button>
            ) : data.is_requested ? (<Button
              variant="contained"
              color="error"
              onClick={cancelRequestButton}
              startIcon={<PersonAddIcon />}
              sx={{ textTransform: "none", borderRadius: '20px' }}
            >
              Cancel Request
            </Button>) : (<Button
              variant="contained"
              color="success"
              onClick={sendRequestButton}
              startIcon={<PersonAddIcon />}
              sx={{ textTransform: "none", borderRadius: '20px' }}
            >
              Send Request
            </Button>)}

            <Button
              sx={{ textTransform: "none", borderRadius: '20px' }}
              variant="contained"

              startIcon={<ChatIcon />}
            >
              Message
            </Button>


            <ContactTableRowMenu
              user_name={data.profile.name}
              user_id={data.id}
              pin={data.relationship ? data.relationship.pin : null}
              notification={data.relationship ? data.relationship.notification : null}
              follow={data.relationship ? data.relationship.follow : null}
              nickname={data.relationship ? data.relationship.nickname : null}
              is_connected={data.is_connected}
            />


            {/* <IconButton>
                <MoreVertIcon />
              </IconButton> */}
          </Stack>
        )}


        <Divider />

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        // sx={{ bgcolor: 'transparent', borderRadius: '10px 50px 50px 10px', p: '2px' }}
        >
          <Box sx={{ bgcolor: 'green', borderRadius: '1px 10px 10px 1px', p: '5px' }}>
            <Typography fontSize="10px">public username</Typography>
          </Box>

          <Typography>{data.profile.public_username}</Typography>
          <IconButton size="sm"><ContentCopyIcon fontSize="small" /></IconButton>
        </Stack>

        <Divider />

        {data.profile.about && (
          <>
            <Typography>about me</Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              sx={{ bgcolor: "whitesmoke", borderRadius: "20px", p: "20px" }}
            >
              <Typography>{data.profile.about || null}</Typography>
            </Stack>
          </>
        )}

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
    </React.Fragment>
  );
}


export default memo(Profile)