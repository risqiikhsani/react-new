import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled, Box, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactTable from "./ContactTable";
import ContactSearchSortBy from "./ContactSearchSortBy";
import ContactFilter from "./ContactFilter";

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
    <Box sx={{ width: "100%" }}>
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
              <Tab label="Connected" {...a11yProps(0)} />
              <Tab label="Request in Pending" {...a11yProps(1)} />
              <Tab label="Request out Pending" {...a11yProps(2)} />
              <Tab label="Blocked" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ContactSearchSortBy/>
            <ContactFilter/>
            <ContactTable/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Three
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
    </Box>
  );
}
