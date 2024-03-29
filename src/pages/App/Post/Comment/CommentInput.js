import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";

import { LoadingButton } from "@mui/lab";
import { memo } from "react";
import { comment_api } from "../../../../api/Api";
import { setSnackbar } from "../../../../hooks/slices/snackbarSlice";
import EmojiPickerButton from "../../Global/EmojiPickerButton";

function CommentInput(props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const createComment = useMutation({
    mutationFn: (data) => {
      return comment_api.create(props.post_id, data);
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
      dispatch(setSnackbar({ type: "success", string: "Comment created" }));
      queryClient.invalidateQueries("commentlist", {
        id: JSON.stringify(props.post_id),
      });
      setInput("");
    },
  });

  const onSubmitCreateComment = (event) => {
    event.preventDefault();
    try {
      createComment.mutate({
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
        sx={{ p: "10px" }}
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
          <EmojiPickerButton value={input} setValue={setInput}/>
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
              onSubmitCreateComment(event);
            }}
            loading={createComment.isLoading}
            loadingPosition="end"
          >
            <SendIcon />
          </LoadingButton>
        </Box>
      </Stack>
    </React.Fragment>
  );
}

export default memo(CommentInput);