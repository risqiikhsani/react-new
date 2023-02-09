import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { memo } from "react";

function DialogConfirmation(props){
    const {
        is_open,
        title,
        text,
        submitfunction,
        handleClose,
    } = props
    

    return(
        <React.Fragment>
            <Dialog open={is_open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent sx={{ minWidth: "500px" }}>
                    <Typography>{text}</Typography>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(event)=>{submitfunction(event);handleClose(event);}}>Continue</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
export default memo(DialogConfirmation)