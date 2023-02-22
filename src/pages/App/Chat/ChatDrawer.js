import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
const drawerWidth = 400;
const drawerWidthOuter = 240;

const ChatBarColor = "#ade8f4";

export default function ChatDrawer(props) {
    return (
        <React.Fragment>
            <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center", m: "10px" }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Chat"
                    inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>

            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                    <>
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography>Tyler</Typography>}
                                    secondary={text}
                                />
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={0}
                                >
                                    <Chip label={122} color="success" size="small" />
                                    <Typography variant="caption">3h</Typography>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </React.Fragment>
    )
}