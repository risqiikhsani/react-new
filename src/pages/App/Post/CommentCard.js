import * as React from "react";

import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { Divider, IconButton, Box } from "@mui/material";
import { Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Collapse } from "@mui/material";

import ReplyIcon from '@mui/icons-material/Reply';
import { memo } from "react";



function CommentCard(props) {



    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />

            <Box sx={{ px: '5px', borderRadius: '5px 20px 20px 20px',bgcolor:'gray' }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Typography variant="subtitle2">{props.data.user.profile.name}</Typography>
                    <Typography variant="body2">{props.data.time_creation}</Typography>
                </Stack>
                <Typography variant="body1">
                    {props.data.text}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <IconButton aria-label="like" size="small">
                        <FavoriteIcon fontSize="small" />
                    </IconButton>

                    <IconButton aria-label="like" size="small">
                        <ReplyIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>
        </Stack>
    );
}

export default memo(CommentCard);
