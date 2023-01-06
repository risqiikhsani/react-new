import * as React from "react";
import { memo } from "react";
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
import Link from "@mui/material/Link";

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

import { useDispatch,useSelector } from "react-redux";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostCard(props) {
  const authenticated_user_id = useSelector((state) => state.user.id)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Card sx={{ borderRadius: "10px", width: "100%" }}>
    {console.log("PostCard is rendering")}
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.data.user.profile.profile_picture}/>
          }
          action={
            // <IconButton aria-label="settings">
            //   <MoreVertIcon />
            // </IconButton>
            <PostMoreMenuButton post_id={props.data.id} post_user_id={props.data.user.id}/>
          }
          title={props.data.user.profile.name}
          subheader={props.data.time_creation}
        />
        {props.data.images && (
          <CardMedia
            component="img"
            image="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=3qHaqQ56"
            alt="Paella dish"
          />
        )}
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.data.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ alignItems: "flex-end" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <IconButton aria-label="like" color="success">
              <FavoriteIcon />
            </IconButton>
            <Typography fontSize={10}>{props.data.likes_amount}</Typography>
          </Stack>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
          <IconButton>
            <CommentIcon />
          </IconButton>
            <Typography fontSize={10}>{props.data.comments_amount}</Typography>
          </Stack>



          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <PostShareMenuButton post_id={props.data.id} post_user_id={props.data.user.id}/>
            <Typography fontSize={10}>{props.data.shares_amount}</Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Link variant="body2" underline="hover">
            {"view comments"}
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="primary">
            {
              props.data.saved?<BookmarkAddedIcon/>:<BookmarkAddIcon/>
            }
          </IconButton>
        </CardActions>
        <Divider />

        <CommentInput post_id={props.data.id}/>
      </CardActionArea>
    </Card>
  );
}

export default memo(PostCard);