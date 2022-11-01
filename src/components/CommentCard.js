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
import ReplyCard from "./ReplyCard";
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyInput from "./Input/ReplyInput";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CommentCard(props) {

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };


  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{ mx: '10px', my: '20px' }}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
      <Box>
        <Paper sx={{ pt: '5px', px: '5px', borderRadius: '5px 20px 20px 20px' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="subtitle2">Kucing imut</Typography>
            <Typography variant="body2">3 hours ago</Typography>
          </Stack>
          <Typography variant="body1">
            That’s actually deep. Thanks for the design, would you consider making
            an interaction?
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


            {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            size="small"
          >
            <ReplyIcon />
          </ExpandMore> */}

            <IconButton>
              <ReplyIcon />
            </IconButton>

          </Stack>

        </Paper>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ReplyCard/>
            <ReplyCard/>
            <ReplyCard/>
            <ReplyInput/>
        </Collapse> */}
      </Box>

    </Stack>
  );
}
