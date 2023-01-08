import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import PaperLayout from "./PaperLayout";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const people = [
    {
        name: "elizabeth",
        avatar: null,
        profile: null,
    },
    {
        name: "ko",
        avatar: null,
        profile: null,
    },
    {
        name: "zayn",
        avatar: null,
        profile: null,
    },

]


export default function MutualGroups() {
    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <PaperLayout>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Google Maps"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                    <List>
                        {
                            people.map((p) => (
                                <React.Fragment>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Avatar src={p.avatar} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {p.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </React.Fragment>
                            ))
                        }

                    </List>
                </PaperLayout>
            </Container>
        </React.Fragment>
    )
}