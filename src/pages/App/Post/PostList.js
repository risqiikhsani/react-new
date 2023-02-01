import {
    useInfiniteQuery, useQuery, useQueryClient
} from "@tanstack/react-query";
import * as React from "react";

import { Box } from "@mui/material";

import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";
import { useInView } from "react-intersection-observer";


import AppApi from "../../../api/AppApi";
import PostSkeleton from "../../../components/SuspenseFallback/PostSkeleton";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";
import PostCard from "../Post/PostCard";
import { useDispatch, useSelector } from "react-redux";


export default function PostList(props) {
    // const count = useSelector((state) => state.counter.value)
    const authenticated_user_id = useSelector((state) => state.user.id);
    const authenticated_user_name = useSelector((state) => state.user.name);

    const queryClient = useQueryClient();

    
    const dispatch = useDispatch();

    const { ref, inView } = useInView();

    const postInfiniteList = useInfiniteQuery(
        ["posts"],
        async ({ pageParam = 1 }) => {
            const res = await AppApi.fetchPostList(`?page=${pageParam}`);
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
            postInfiniteList.fetchNextPage();
        }
    }, [inView]);

    // const postList = useQuery({
    //   queryKey: ["post-list"],
    //   queryFn: () => {
    //     return AppApi.fetchPostList();
    //   },
    // });


    if (postInfiniteList.isLoading)
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <PostSkeleton />
                </Container>
            </React.Fragment>
        );
    if (postInfiniteList.isError)
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <p>something wrong</p>
                </Container>
            </React.Fragment>
        );


    return (
        <React.Fragment>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >

                {postInfiniteList.data.pages.map((a) => (
                    <>
                        {/* {a.data.data.results.length == 0 && (<Typography>no posts found.</Typography>)} */}
                        {a.results.map((post) => (
                            <PostCard key={post.id} data={post} />
                        ))}
                    </>
                ))}
                <Box ref={ref}>
                    {postInfiniteList.isFetchingNextPage ? (
                        <PostSkeleton />
                    ) : postInfiniteList.hasNextPage ? (
                        "Load Newer"
                    ) : (
                        "Nothing more to load"
                    )}
                </Box>
            </Stack>
        </React.Fragment>
    )
}