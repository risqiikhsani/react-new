import * as React from "react";
import { Link } from "react-router-dom";

import { Avatar, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { connection_api } from "../../api/Api";

const fontDrawerColor = "#9A9FA7";
const iconDrawerColor = "#F9FAFC";


export default function RightDrawerContact(props) {
  const [name, setName] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const connections = useQuery(
    ["connections"],
    () => {
      return connection_api.get_list();
    },
    {
      keepPreviousData: true,
    }
  );

  
  return (
    <React.Fragment>
      <Toolbar>
        <TextField
        sx={{width:'100%',mx:'20px'}}
          id="search"
          placeholder="Search"
          value={name}
          onChange={handleChange}
          
          size="small"
        />
      </Toolbar>
      <Divider />
      <List sx={{ color: fontDrawerColor }}>
      {connections.isLoading && <Typography>loading...</Typography>}
      {connections.isError && <Typography>error</Typography>}
      {connections.data && connections.data.data.map((a,i) => (
        <ListItem key={i} disablePadding>
            <ListItemButton component={Link} to={null}>
              <ListItemIcon>
                <Avatar src={a.user.profile.profile_picture.small} />
              </ListItemIcon>
              <ListItemText primary={a.user.profile.name} />
              {/* {item.is_online ? (
                <Box
                  sx={{
                    bgcolor: "green",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Typography variant="body2">3 hours ago</Typography>
              )} */}
            </ListItemButton>
          </ListItem>
      ))}


      </List>
    </React.Fragment>
  );
}
