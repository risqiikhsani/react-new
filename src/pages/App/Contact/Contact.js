import AddIcon from "@mui/icons-material/Add";
import { Button, Chip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box, Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import * as React from "react";
import { connection_api, request_api } from "../../../api/Api";
import ContactFilter from "./ContactFilter";
import ContactSearchSortBy from "./ContactSearchSortBy";
import ContactTable from "./ContactTable";
import FriendRequestTable from "./FriendRequestTable";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   padding: theme.spacing(1),
//   textAlign: 'center',
// }));

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

const tableColumn = [
  {
    index: 0,
    name: "Connected",
    count: 20,
  },
  {
    index: 1,
    name: "Friend Requests",
    count: 10,
  },
  {
    index: 2,
    name: "Waiting Requests",
    count: 5,
  },
  {
    index: 3,
    name: "Blocked users",
    count: 2,
  },
]

export default function Contact(props) {

  const connections = useQuery(
    ["connections"],
    () => {
      return connection_api.get_list();
    },
    {
      keepPreviousData: true,
    }
  );

  const friendRequests = useQuery(
    ["friend-requests"],
    () => {
      return request_api.get_list();
    },
    {
      keepPreviousData: true,
    }
  );

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  return (

      <Stack spacing={2}>
        {/* <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item> */}
        {console.log(friendRequests.data)}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4">Contact</Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add User
          </Button>
        </Stack>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <Paper>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {
                  tableColumn.map((a) => (
                    <Tab key={a.index} sx={{ textTransform: 'none' }} label={
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                      >
                        {a.name}
                        <Chip size="small" variant="outlined" label={a.count} color="success" sx={{ ml: '5px' }} />
                      </Stack>
                    } {...a11yProps(a.index)} />
                  ))
                }
                {/* <Tab sx={{textTransform:'none'}} label="Connected" {...a11yProps(0)} />
              <Tab sx={{textTransform:'none'}} label={
                <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
                Friend Request
                <Chip size="small" variant="outlined" label="12" color="success" sx={{ml:'5px'}}/>
              </Stack>
                
              } {...a11yProps(1)} />
              <Tab sx={{textTransform:'none'}} label="Waiting Requests" {...a11yProps(2)} />
              <Tab sx={{textTransform:'none'}} label="Blocked users" {...a11yProps(3)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* <ContactSearchSortBy/>
            <ContactFilter/> */}
              {connections.isLoading && <Typography>loading...</Typography>}
              {connections.isError && <Typography>error</Typography>}
              {connections.data && <ContactTable data={connections.data.data}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {friendRequests.isLoading && <Typography>loading...</Typography>}
              {friendRequests.isError && <Typography>error</Typography>}
              {friendRequests.data && <FriendRequestTable data={friendRequests.data.data}/>}
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Three
            </TabPanel>
          </Paper>

        </Box>
      </Stack>

  );
}
