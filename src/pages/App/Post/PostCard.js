import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge, Box, Button, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { memo } from "react";
import { Link as LinkRouter } from "react-router-dom";


import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import PostMoreMenuButton from "./Buttons/PostMoreMenuButton";
import PostShareMenuButton from "./Buttons/PostShareMenuButton";

import ReactImageGallery from "react-image-gallery";
import CommentInput from "./Comment/CommentInput";
import CommentList from "./Comment/CommentList";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { like_api, save_api } from "../../../api/Api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

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

  const images = [];
  if (props.data.postmedia_set !== undefined) {
    props.data.postmedia_set.map((a) => {
      images.push({
        //'original':a.image.medium_square_crop,
        'original': a.image.full_size,
        // 'thumbnail':a.image.thumbnail,
        'originalHeight': '350px',
        'originalWidth': '500px',
        'fullscreen': a.image.full_size,
      })
    })
  }

  const queryClient = useQueryClient()
  const dispatch = useDispatch()


  const likePost = useQuery({
    queryKey: ["like-post"],
    queryFn: () => {
      return like_api.post_likehandler(props.data.id);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("like post success")
      console.log(data)
      // refetch post list
      // dispatch(refetch_post_list_toggle())


      let newData = data
      queryClient.setQueryData(["posts"], data => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          results: page.results.map((a) => a.id === newData.data.id ? newData.data : a)
        }))
      }))

      // refetch post detail
      queryClient.setQueryData(['post-detail', { id: JSON.stringify(props.data.id) }], newData)


      // queryClient.invalidateQueries("posts")

    }
  })


  const onSubmitLikePost = () => {
    likePost.refetch()
  }

  const savePost = useQuery({
    queryKey: ["save-post"],
    queryFn: () => {
      return save_api.post_savehandler(props.data.id);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("save post success")
      console.log(data)
      // refetch post list
      // dispatch(refetch_post_list_toggle())


      let newData = data
      queryClient.setQueryData(["posts"], data => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          results: page.results.map((a) => a.id === newData.data.id ? newData.data : a)
        }))
      }))

      // refetch post detail
      queryClient.setQueryData(['post-detail', { id: JSON.stringify(props.data.id) }], newData)

    }
  })

  const onSubmitSavePost = () => {
    savePost.refetch()
  }

  return (

    <Card sx={{ borderRadius: "10px", width: "100%" }}>
      {console.log("PostCard is rendering")}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
          //src={props.data.user.profile.profile_picture} 
          />
        }
        action={
          // <IconButton aria-label="settings">
          //   <MoreVertIcon />
          // </IconButton>
          <PostMoreMenuButton data={props.data} />
        }
        title={<Link underline="hover" component={LinkRouter} to={`/user/${props.data.user.id}`}>{props.data.user.profile.name}</Link>}
        subheader={props.data.natural_time}
      />
      {images.length!==0 && (
        <ReactImageGallery
          items={images}
          showBullets={true}
          showPlayButton={false}
          renderLeftNav={(onClick, disabled) => (
            <IconButton onClick={onClick} disabled={disabled} sx={{ position: 'absolute', top: '40%', bgcolor: "transparent", cursor: 'pointer', zIndex: '4', m: '5px' }}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          renderRightNav={(onClick, disabled) => (
            <IconButton onClick={onClick} disabled={disabled} sx={{ position: 'absolute', top: '40%', right: 0, bgcolor: "transparent", cursor: 'pointer', zIndex: '4', m: '5px' }}>
              <ArrowForwardIosIcon />
            </IconButton>
          )}
          renderFullscreenButton={(onClick, isFullscreen) => (
            <IconButton onClick={onClick} sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: "transparent", cursor: 'pointer', zIndex: '4', m: '5px' }}>
              {isFullscreen ? <FullscreenExitIcon color="primary" /> : <FullscreenIcon />}
            </IconButton>
          )}
        />
      )}
      <Divider />
      <CardContent>
        <Typography variant="body2" >
          {props.data.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ alignItems: "flex-end" }}>
        
          <StyledBadge
            badgeContent={props.data.likes_amount}
            color="primary"
          >

            {props.data.liked == true ? (
              <IconButton aria-label="like" color="error" onClick={onSubmitLikePost}>
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="like" color="default" onClick={onSubmitLikePost}>
                <FavoriteIcon />
              </IconButton>
            )}

          </StyledBadge>
          {/* <Typography fontSize={10}>{props.data.likes_amount}</Typography> */}
        

        
          <StyledBadge
            badgeContent={props.data.comments_amount}
            color="primary"
          >
            {
              props.detail == true ? (
                <IconButton>
                  <CommentIcon />
                </IconButton>
              ) : (
                <IconButton component={LinkRouter} to={`post/${props.data.id}`}>
                  <CommentIcon />
                </IconButton>
              )
            }
          </StyledBadge>





        {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
        
          <StyledBadge
            badgeContent={props.data.shares_amount}
            color="primary"
          >
            <PostShareMenuButton post_id={props.data.id} post_user_id={props.data.user.id} />

          </StyledBadge>


        <Box sx={{ flexGrow: 1 }} />

        {props.detail != true && (<Button sx={{ textTransform: 'none' }} component={LinkRouter} to={`post/${props.data.id}`} variant="text" size="small">View Comments</Button>)}
        <Box sx={{ flexGrow: 1 }} />
        {props.data.saved ? (
          <IconButton color="primary" onClick={onSubmitSavePost}>

            <BookmarkAddedIcon />
          </IconButton>
        ) : (
          <IconButton color="default" onClick={onSubmitSavePost}>
            <BookmarkAddIcon />

          </IconButton>
        )}

      </CardActions>
      <Divider />
      {props.detail == true && (
        <CommentList post_id={props.data.id} />
      )}
      <CommentInput post_id={props.data.id} />
    </Card>
  );
}

export default memo(PostCard);