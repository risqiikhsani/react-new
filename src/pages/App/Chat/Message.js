import { Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";

function Message(props) {
  const authenticated_user_id = useSelector((state) => state.user.id);

  const {data} = props;

  const mine = data.sender.id == authenticated_user_id ? true : false;

  return (
    <React.Fragment>
      <ListItem
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        sx={mine ? {justifyContent:'flex-end'} : {justifyContent:'flex-start'}}
      >
        <Box sx={{mb:'10px',bgcolor:'white',p:'10px',borderRadius:'10px'}}>        
        <ListItemText
          primary={null}
          secondary={data.text}
        />
        <Typography sx={{fontSize:'10px',textAlign:'right'}}>{data.time_creation}</Typography>
        </Box>
      </ListItem>
    </React.Fragment>
  );
}


export default memo(Message);