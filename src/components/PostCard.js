import * as React from "react";
import { styled } from "@mui/material/styles";
import { CardActionArea, Box, Divider, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Link from '@mui/material/Link';

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CommentCard from "./CommentCard";
import CommentInput from "./Input/CommentInput";

import PostMoreMenuButton from "../pages/App/Post/Buttons/PostMoreMenuButton";
import PostShareMenuButton from "../pages/App/Post/Buttons/PostShareMenuButton";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ borderRadius: "10px", width: "100%" }}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            // <IconButton aria-label="settings">
            //   <MoreVertIcon />
            // </IconButton>
            <PostMoreMenuButton />
          }
          title={props.user_name}
          subheader={props.time_creation}
        />
        {props.images && (
          <CardMedia
            component="img"
            image="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=3qHaqQ56"
            alt="Paella dish"
          />
        )}
        <Divider/>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ alignItems: "flex-start" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <IconButton aria-label="like">
              <FavoriteIcon />
            </IconButton>
            <Typography fontSize={10}>100</Typography>
          </Stack>

          <IconButton>
            <CommentIcon />
          </IconButton>

          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
          <PostShareMenuButton />
          <Typography fontSize={10}>23</Typography>
          </Stack>


          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <BookmarkAddIcon />
          </IconButton>
        </CardActions>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
                <Link variant="body2" underline="hover">
        {"view 100 comments"}
      </Link>
        </Stack>
        <Divider />

        <CommentInput />
      </CardActionArea>
    </Card>
  );
}
