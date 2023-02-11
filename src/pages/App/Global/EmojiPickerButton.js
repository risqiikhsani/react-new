import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { IconButton, Popover, Typography } from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React from "react";
import { memo } from "react";

function EmojiPickerButton(props) {
    const {
        value,
        setValue} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onEmojiClick = (emojiData,event) => {
        console.log(emojiData);
        setValue(value.concat(" ", emojiData.emoji," "));
    };


    return (
        <React.Fragment>
            <IconButton
                aria-describedby={id} variant="contained" onClick={handleClick}
            >
                <EmojiEmotionsIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <EmojiPicker onEmojiClick={onEmojiClick} />
            </Popover>


        </React.Fragment>
    )
}

export default memo(EmojiPickerButton);