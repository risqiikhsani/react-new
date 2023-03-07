import { Avatar, Box, Divider, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { memo } from "react";


function NotificationMenuItem(props) {
    const {
        data,
        handleClose
    } = props;

    let txt;
    let url;

    switch(data.event){
      case "liked_post":
        txt = `${data.sender.profile.name} has liked your post.`;
        break;
      case "liked_comment":
        txt = `${data.sender.profile.name} has liked your comment.`;
        break;
      case "liked_reply":
        txt = `${data.sender.profile.name} has liked your reply.`;
        break;
      case "commented_post":
        txt = `${data.sender.profile.name} commented on your post.`;
        break;
      case "replied_comment":
        txt = `${data.sender.profile.name} replied on your comment.`;
        break;
      default:
        txt = ""
        break;
    }


    return (
        <React.Fragment>
            <MenuItem onClick={handleClose}>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Avatar alt={null} src={data.sender.profile.profile_picture.small || null} />
                    <Box>
                        <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'initial', wordWrap: 'break-word', wordBreak: 'break-word' }}>{txt}</Typography>
                        <Typography variant="body2" gutterBottom sx={{ textAlign: 'right' }}>{data.natural_time}</Typography>
                    </Box>
                </Stack>
            </MenuItem>
            <Divider/>
        </React.Fragment>
    )
}

export default memo(NotificationMenuItem);