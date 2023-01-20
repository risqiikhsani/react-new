import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Divider, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { memo } from "react";
import { Link as LinkRouter } from "react-router-dom";


import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import AppApi from "../../../api/AppApi";
import PostMoreMenuButton from "./Buttons/PostMoreMenuButton";
import PostShareMenuButton from "./Buttons/PostShareMenuButton";
import CommentInput from "./CommentInput";



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
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const authenticated_user_id = useSelector((state) => state.user.id)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likePost = useQuery({
    queryKey: ["like-post"],
    queryFn: () => {
      return AppApi.likePost(props.data.id);
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



      let oldData = queryClient.getQueryData(["posts"]);
      console.log("old data in setQuery")
      console.log(oldData)
      console.log(data)
      let newData = data
      queryClient.setQueryData(["posts"], data => ({
        ...data,
        pages:data.pages.map((page) => ({
          ...page,
          results:page.results.map((a) => a.id === newData.data.id ? newData.data : a)
        }))
      }))




      // let oldData2 = queryClient.getQueryData(["posts"]);
      // console.log("new data in setQuery")
      // console.log(oldData2)
      // // refetch post detail too 
      // // dispatch(refetch_post_detail_toggle())

      // let oldData1 = queryClient.getQueryData(['post-detail',{id:JSON.stringify(props.data.id)}]);
      // console.log("old data in setQuery's detail")
      // console.log(oldData1)
      // let x= queryClient.getQueryCache();
      // console.log("cobacoba query cache")
      // console.log(x)
      // let g = queryClient.getMutationCache();
      // console.log("cobacoba mutation cache")
      // console.log(g)

      let oldData1 = queryClient.getQueryData(['post-detail',{id:JSON.stringify(props.data.id)}]);
      console.log("old data in setQuery's detail")
      console.log(oldData1)
      queryClient.setQueryData(['post-detail',{id:JSON.stringify(props.data.id)}], newData)
      let newData1 = queryClient.getQueryData(['post-detail',{id:JSON.stringify(props.data.id)}]);
      console.log("new data in setQuery's detail")
      console.log(newData1)

      // queryClient.invalidateQueries("posts")
      
    }
  })


  const onSubmitLikePost = () => {
    likePost.refetch()
  }

  const savePost = useQuery({
    queryKey: ["save-post"],
    queryFn: () => {
      return AppApi.savePost(props.data.id);
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
      queryClient.setQueryData('posts', data => ({
        ...data,
        pages:data.pages.map((page) => page.results.map((a) => a.id === newData.id ? newData : a))
      }))
      // refetch post detail too 
      // dispatch(refetch_post_detail_toggle())
      queryClient.setQueryData(['post-detail', newData.id], newData)
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
        title={<Link underline="hover" component={LinkRouter} to={`user/${props.data.user.id}`}>{props.data.user.profile.name}</Link>}
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
          {props.data.liked == true ? (
            <IconButton aria-label="like" color="error" onClick={onSubmitLikePost}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="like" color="default" onClick={onSubmitLikePost}>
              <FavoriteIcon />
            </IconButton>
          )}

          <Typography fontSize={10}>{props.data.likes_amount}</Typography>
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
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
          <PostShareMenuButton post_id={props.data.id} post_user_id={props.data.user.id} />
          <Typography fontSize={10}>{props.data.shares_amount}</Typography>
        </Stack>

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
      {/* {props.detail == true && (
        <CommentList post_id={props.data.id}/>
      )} */}
      <CommentInput post_id={props.data.id} />
    </Card>
  );
}

export default memo(PostCard);