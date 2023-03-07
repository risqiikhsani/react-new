
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import * as React from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { setChatroom } from "../../../hooks/slices/chatroomSlice";


function ChatDrawerItem(props) {
    const { data } = props;
    const dispatch = useDispatch()

    const chatRoomClickOpen = (data) => {
        dispatch(setChatroom({
            open: true,
            data: data
        }))
    }


    return (
        <React.Fragment>
            <ListItem key={data.id} disablePadding>
                <ListItemButton onClick={() => chatRoomClickOpen(data)}>
                    <ListItemIcon>
                        {data.type === "twoperson" ? <Avatar alt={data.display.profile.name} src={data.display.profile.profile_picture.small} /> : <Avatar alt="Group" src="/static/images/avatar/1.jpg" />}
                    </ListItemIcon>
                    {data.type === "twoperson" ? <ListItemText
                        primary={<Typography>{data.display.profile.name}</Typography>}
                        secondary={data.last_chat ? data.last_chat.text : null}
                    /> : <ListItemText
                        primary={<Typography>Group name</Typography>}
                        secondary={data.last_chat ? data.last_chat.text : null}
                    />}

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
        </React.Fragment>
    )
}

export default memo(ChatDrawerItem);