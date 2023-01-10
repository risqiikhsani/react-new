import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton } from "@mui/material";
import { Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import { TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import AppApi from "../../../api/AppApi";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";
import { LoadingButton } from "@mui/lab";
import { refetch_comment_list_toggle } from "../../../hooks/slices/refetchSlice";
export default function CommentInput(props) {

  const dispatch = useDispatch()

  const createComment = useMutation({
    mutationFn:(data) => {
      return AppApi.createComment(props.post_id,data);
    },
    onError:(error,variables,context) => {
      console.log("something went wrong");
      console.log(error.message);
      setInput("")
    },
    onSuccess:(data,variables,context) => {
      console.log("success create comment")
      dispatch(setSnackbar({type:"success",string:"Comment created"}))
      dispatch(refetch_comment_list_toggle())
      setInput("")
    }
  })

  const onSubmitCreateComment = (event) => {
    event.preventDefault();
    try{
      createComment.mutate({
        text: input,
      })
    }catch(err){
      console.log(err)
    }
  }

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
        sx={{p:"10px"}}
      >
        <Avatar
          
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
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
          onClick={(event) => {onSubmitCreateComment(event)}}
          loading={createComment.isLoading}
          loadingPosition="end"
          >
            <SendIcon/>
          </LoadingButton>
        </Box>
      </Stack>
    </React.Fragment>
  );
}
