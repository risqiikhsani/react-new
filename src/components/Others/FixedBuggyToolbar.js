import { Toolbar } from "@mui/material";
import React from "react";

export default function FixedBuggyToolbar(props){
    return(
        <React.Fragment>
            {/* set height to 70px because there was a BUG of toolbar's height when the resolution is at "sm" */}
            <Toolbar sx={{height:'70px'}}/>
        </React.Fragment>
    )
}