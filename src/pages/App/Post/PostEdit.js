import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Container } from "@mui/system";
import Alert from "@mui/material/Alert";

export default function PostEdit(props){
    return(
        <React.Fragment>
                    <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent sx={{ minWidth: "500px" }}>
            {createPost.isError && (
              <Alert variant="filled" severity="error">
                Something went wrong !
              </Alert>
            )}
            <DialogContentText>
              Create post about your feelings ....
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              sx={{ flexGrow: 1 }}
              size="small"
              placeholder="What's on your mind?"
              multiline
              fullWidth
              rows={4}
              value={value}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton>
              <ImageIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={createPost.isLoading}
              loadingPosition="end"
              onClick={onSubmitCreatePost}
            >
              Post
            </LoadingButton>
          </DialogActions>
        </Dialog>
        </React.Fragment>
    )
}