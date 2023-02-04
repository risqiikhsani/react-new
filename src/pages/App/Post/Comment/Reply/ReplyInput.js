import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";

import { LoadingButton } from "@mui/lab";
import { memo } from "react";
import AppApi from "../../../../../api/AppApi";
import { setSnackbar } from "../../../../../hooks/slices/snackbarSlice";
import { reply_api } from "../../../../../api/Api";

function ReplyInput(props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const createReply = useMutation({
    mutationFn: (data) => {
      return reply_api.create(props.comment_id, data);
    },
    onError: (error, variables, context) => {
      dispatch(
        setSnackbar({
          type: "error",
          string: "Something went wrong !",
          detail: error.message,
        })
      );
      setInput("");
    },
    onSuccess: (data, variables, context) => {
      dispatch(setSnackbar({ type: "success", string: "Reply created" }));
      queryClient.invalidateQueries("replylist", {
        id: JSON.stringify(props.comment_id),
      });
      setInput("");
    },
  });

  const onSubmitCreateReply = (event) => {
    event.preventDefault();
    try {
      createReply.mutate({
        text: input,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <React.Fragment>
      <Stack
        component="form"
        noValidate
        autoComplete="off"
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}
        sx={{ width:'100%'}}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <TextField
          sx={{ flexGrow: 1 }}
          multiline
          maxRows={4}
          id="outlined-comment"
          value={input}
          onChange={handleChange}
          size="small"
        />
        <Box>
          <IconButton color="primary">
            <EmojiEmotionsIcon />
          </IconButton>
          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <AttachFileIcon />
          </IconButton> */}

          <LoadingButton
            color="primary"
            onClick={(event) => {
              onSubmitCreateReply(event);
            }}
            loading={createReply.isLoading}
            loadingPosition="end"
          >
            <SendIcon />
          </LoadingButton>
        </Box>
      </Stack>
    </React.Fragment>
  );
}


export default memo(ReplyInput);