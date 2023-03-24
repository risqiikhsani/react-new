import * as React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar, Box, IconButton, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import ReplyIcon from "@mui/icons-material/Reply";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import ReplyMoreMenuButton from "./ReplyMoreMenuButton";

import { like_api } from "../../../../../api/Api";
function ReplyCard(props) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const likeReply = useQuery({
    queryKey: ["like-reply"],
    queryFn: () => {
      return like_api.reply_likehandler(props.data.id);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (error, variables, context) => {
      console.log("something went wrong");
      console.log(error.message);
    },
    onSuccess: (data, variables, context) => {
      console.log("like reply success");
      console.log(data);

      let newData = data;
      queryClient.setQueryData(
        ["replylist", { id: props.data.comment }],
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

  const onSubmitLikeReply = () => {
    likeReply.refetch();
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
          p: "5px 5px 0px 5px",
          borderRadius: "5px 20px 20px 30px",
          bgcolor: "#f8f9fa",
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
          <Link underline="hover" component={LinkRouter} to={`/user/${props.data.user.id}`}>{props.data.user.profile.name}</Link>
          <Typography variant="body2" fontSize={11} fontFamily="fantasy">{props.data.natural_time}</Typography>
          <ReplyMoreMenuButton data={props.data}/>
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
              onClick={onSubmitLikeReply}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="like"
              size="small"
              color="default"
              onClick={onSubmitLikeReply}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          )}
          {props.data.likes_amount != 0 && `${props.data.likes_amount} likes`}
          <IconButton aria-label="like" size="small">
            <ReplyIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
}

export default memo(ReplyCard);
