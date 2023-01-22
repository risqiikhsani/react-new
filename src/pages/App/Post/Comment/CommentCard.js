import * as React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar, Box, IconButton, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import ReplyIcon from "@mui/icons-material/Reply";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { useDispatch } from "react-redux";
import AppApi from "../../../../api/AppApi";
import CommentMoreMenuButton from "./CommentMoreMenuButton";
import { Link as LinkRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CommentCard(props) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

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
        sx={{ width: 30, height: 30 ,mt:'5px'}}
      />

      <Box
        sx={{
          p: "5px",
          borderRadius: "5px 20px 20px 20px",
          bgcolor: "#f8f9fa",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Link underline="hover" component={LinkRouter} to={`/user/${props.data.user.id}`}>{props.data.user.profile.name}</Link>
          <Typography variant="body2">{props.data.natural_time}</Typography>
          <CommentMoreMenuButton data={props.data}/>
        </Stack>
        <Typography variant="body1">{props.data.text}</Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={2}
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
          <IconButton aria-label="like" size="small">
            <ReplyIcon fontSize="small" />
          </IconButton>
          {props.data.replies_amount != 0 ?
            `${props.data.replies_amount} replies` : "reply"}
        </Stack>
      </Box>
    </Stack>
  );
}

export default memo(CommentCard);
