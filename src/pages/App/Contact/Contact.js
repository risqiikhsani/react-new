import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box, Stack } from "@mui/system";
import PropTypes from "prop-types";
import * as React from "react";
import BlockTable from "./BlockTable";
import ContactTable from "./ContactTable";
import FriendRequestTable from "./FriendRequestTable";
import WaitingRequestTable from "./WaitingRequestTable";

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



export default function Contact(props) {

  


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  return (

    <Stack spacing={2}>
      {/* <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item> */}


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


      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab key={0} sx={{ textTransform: 'none' }} label="Connected users" {...a11yProps(0)} />
          <Tab key={1} sx={{ textTransform: 'none' }} label="Friend requests" {...a11yProps(1)} />
          <Tab key={2} sx={{ textTransform: 'none' }} label="Waiting requests" {...a11yProps(2)} />
          <Tab key={3} sx={{ textTransform: 'none' }} label="Blocked users" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ContactTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FriendRequestTable  />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WaitingRequestTable/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BlockTable/>
      </TabPanel>


    </Stack>

  );
}
