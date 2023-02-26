import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function ChatRoom2(props){
    return(
        <React.Fragment>
            <Container maxWidth="sm" sx={{bottom:0, bgcolor:'white'}}>
                <Paper>
                    <AppBar position="sticky">
                        <Toolbar/>
                    </AppBar>
                    <Typography>test</Typography>
                    <Typography>test</Typography>
                    <Typography>test</Typography>
                    <Typography>test</Typography>
                    <AppBar position="sticky" sx={{ top: 'auto', bottom: 0 }}>
                        <Toolbar/>
                    </AppBar>
                </Paper>
            </Container>
        </React.Fragment>
    )
}