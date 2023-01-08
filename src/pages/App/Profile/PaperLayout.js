import { Paper } from "@mui/material";
import * as React from "react";


export default function PaperLayout(props){
    return(
        <React.Fragment>
            <Paper sx={{ width: "100%",borderRadius:'10px',py:'10px' }}>
                {props.children}
            </Paper>
        </React.Fragment>
    )
}