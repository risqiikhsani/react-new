import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { chatroom_api } from "../../../api/Api";
import { setChatroom } from "../../../hooks/slices/chatroomSlice";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";
import ChatDrawerItem from "./ChatDrawerItem";
const drawerWidth = 400;
const drawerWidthOuter = 240;

const ChatBarColor = "#ade8f4";

export default function ChatDrawer(props) {
    const { onOpen } = props;

    const dispatch = useDispatch();

    const { ref, inView } = useInView();

    const chatroomInfiniteList = useInfiniteQuery(
        ["chatrooms"],
        async ({ pageParam = 1 }) => {
            const res = await chatroom_api.get_list(`?page=${pageParam}`);
            // const res = await AppApi.post().get_list(`?page=${pageParam}`);
            return res.data;
        },
        {
            getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
            getNextPageParam: (lastPage) => lastPage.next ?? undefined,
            keepPreviousData: true,
            onError: (error, variables, context) => {
                dispatch(
                    setSnackbar({
                        type: "error",
                        string: "Something went wrong !",
                        detail: error.message,
                    })
                );
            },
        }
    );

    React.useEffect(() => {
        if (inView) {
            chatroomInfiniteList.fetchNextPage();
        }
    }, [inView]);



    if (chatroomInfiniteList.isLoading)
        return (
            <Typography>Loading....</Typography>
        );
    if (chatroomInfiniteList.isError)
        return (
            <Typography>Something went wrong</Typography>
        );



    return (
        <React.Fragment>
            <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center", m: "10px" }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Chat"
                    inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>

            <List>
                {chatroomInfiniteList.data.pages.map((a) => (
                    <>
                        {a.results.map((chatroom) => (
                            <ChatDrawerItem data={chatroom} />
                        ))}
                    </>
                ))}
            </List>

            <Box ref={ref}>
                {chatroomInfiniteList.isFetchingNextPage ? (
                    "Loading..."
                ) : chatroomInfiniteList.hasNextPage ? (
                    "Load Newer"
                ) : (
                    "Nothing more to load"
                )}
            </Box>



        </React.Fragment>
    )
}