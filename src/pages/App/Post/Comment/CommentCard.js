import * as React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar, Box, Button, IconButton, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import ReplyIcon from "@mui/icons-material/Reply";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import AppApi from "../../../../api/AppApi";
import CommentMoreMenuButton from "./CommentMoreMenuButton";
import ReplyList from "./Reply/ReplyList";
import ReplyInput from "./Reply/ReplyInput";
function CommentCard(props) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showReply, setShowReply] = React.useState(false);
  const showReplyButton = () => {
    setShowReply(!showReply);
    console.log(showReply);
  };

  const likeComment = useQuery({
    queryKey: ["like-comment"],
    queryFn: () => {
      return AppApi.likeComment(props.data.id);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("like comment success");
      console.log(data);

      let newData = data;
      queryClient.setQueryData(
        ["commentlist", { id: props.data.post }],
        (data) => ({
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            results: page.results.map((a) =>
              a.id === newData.data.id ? newData.data : a
            ),
          })),
        })
      );
    },
  });

  const onSubmitLikeComment = () => {
    likeComment.refetch();
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 30, height: 30, mt: "5px" }}
      />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
        sx={{ width:'100%', }}
      >
        <Box
          sx={{
            p: "5px 5px 0px 5px",
            borderRadius: "5px 20px 20px 30px",
            bgcolor: "#f8f9fa",
            display: "inline-table",
            border:1,
            borderColor:'#e5e5e5',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Link
              underline="hover"
              component={LinkRouter}
              to={`/user/${props.data.user.id}`}
            >
              {props.data.user.profile.name}
            </Link>
            <Typography variant="body2" fontSize={11} fontFamily="fantasy">{props.data.natural_time}</Typography>
            <CommentMoreMenuButton data={props.data} />
          </Stack>
          <Typography variant="body2" >{props.data.text}</Typography>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{fontSize:11,fontFamily:'fantasy'}}
          >
            {props.data.liked == true ? (
              <IconButton
                aria-label="like"
                size="small"
                color="error"
                onClick={onSubmitLikeComment}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="like"
                size="small"
                color="default"
                onClick={onSubmitLikeComment}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            )}
            {props.data.likes_amount != 0 && `${props.data.likes_amount} likes`}
            <IconButton
              aria-label="like"
              size="small"
              onClick={showReplyButton}
            >
              <ReplyIcon fontSize="small" />
            </IconButton>
            {props.data.replies_amount != 0
              ? `${props.data.replies_amount} replies`
              : "reply"}
          </Stack>
        </Box>
        {props.data.replies_amount != 0 && (
          <Button onClick={showReplyButton} variant="outlined" size="small" sx={{borderRadius:'20px', textTransform: "none" }}>
            {showReply ? `hide replies` : `show replies`}
          </Button>
        )}
        {showReply && (
          <>
          <Box sx={{width:'100%',borderLeft:1,borderRadius:'0px 0px 0px 10px',pl:'5px',borderColor: '#e5e5e5',borderWidth:'5px'}}>
          <ReplyList comment_id={props.data.id} />
          <ReplyInput comment_id={props.data.id} />
          </Box>

          </>
        )}
      </Stack>
    </Stack>
  );
}

export default memo(CommentCard);
