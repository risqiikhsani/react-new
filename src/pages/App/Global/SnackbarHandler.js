import * as React from "react";
import { useSelector } from "react-redux";

import {
    Alert, Snackbar,
    Typography
} from "@mui/material";

export default function SnackbarHandler(props) {
    const snackbar_type = useSelector((state) => state.snackbar.type);
    const snackbar_string = useSelector((state) => state.snackbar.string);
    const snackbar_detail = useSelector((state) => state.snackbar.detail);
    const snackbar_trigger = useSelector((state) => state.snackbar.count);


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

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={handleCloseSnackbar}
                open={openSnackbar}
                autoHideDuration={5000}
            >
                <Alert variant="filled" severity={snackbar_type == "error" ? "error" : "success"} sx={{ width: "100%" }}>
                    {snackbar_string}
                    <Typography>{snackbar_detail}</Typography>
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}