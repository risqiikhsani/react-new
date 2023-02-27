import * as React from "react";
import { useSelector } from "react-redux";

import {
    Alert, Snackbar,
    Typography
} from "@mui/material";

export default function SnackbarHandler(props) {
    const snackbar_event = useSelector((state) => state.snackbar.event);
    const snackbar_type = useSelector((state) => state.snackbar.type);
    const snackbar_string = useSelector((state) => state.snackbar.string);
    const snackbar_detail = useSelector((state) => state.snackbar.detail);
    const snackbar_trigger = useSelector((state) => state.snackbar.count);
    const snackbar_url = useSelector((state) => state.snackbar.url);


    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    React.useEffect(() => {
        if (snackbar_trigger > 0) {
            setOpenSnackbar(true);
        }
    }, [snackbar_trigger]);

    let position = {vertical: "bottom", horizontal: "center"};
    if(snackbar_event==="app_notification"){
        position = {vertical: "bottom", horizontal: "left"};
    }
    else if(snackbar_event==="chat_notification"){
        position = {vertical: "bottom", horizontal: "right"};
    }

    let severity = "success";
    if(snackbar_type !== null){
        severity = snackbar_type;
    }

    const snackbarClick = () => {
        console.log("clicked")
    }

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={position}
                onClose={handleCloseSnackbar}
                open={openSnackbar}
                autoHideDuration={5000}
                onClick={snackbarClick}
            >
                <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
                    {snackbar_string}
                    <Typography>{snackbar_detail}</Typography>
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}