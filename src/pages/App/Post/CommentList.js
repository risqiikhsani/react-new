import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import AppApi from "../../../api/AppApi";
import CommentSkeleton from "../../../components/SuspenseFallback/CommentSkeleton";
import CommentCard from "./CommentCard";

export default function CommentList(props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const { ref, inView } = useInView();

  const commentInfiniteList = useInfiniteQuery(
    ["post-detail",{id:props.post_id},"comments"],
    async ({ pageParam = 1 }) => {
      const res = await AppApi.fetchCommentList(
        props.post_id,
        `?page=${pageParam}`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    }
  );

//   React.useEffect(() => {
//     queryClient.invalidateQueries("comments")
//   },[])

  const fetchMoreComments = () => {
    commentInfiniteList.fetchNextPage();
  }

  if (commentInfiniteList.isLoading) {
    return <React.Fragment>Load comments ...</React.Fragment>;
  }

  if (commentInfiniteList.isError) {
    return (
      <React.Fragment>
        <Typography>something went wrong!</Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {console.log("CommentList is running")}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="left"
        spacing={1}
        sx={{ m: "10px" }}
      >
        {commentInfiniteList.data.pages.map((a) => (
          <>
            {a.results.map((comment) => (
              <CommentCard key={comment.id} data={comment} />
            ))}
          </>
        ))}

        {commentInfiniteList.isFetchingNextPage ? (
          <CommentSkeleton />
        ) : commentInfiniteList.hasNextPage ? (
          <LoadingButton
            loading={commentInfiniteList.isLoading}
            loadingPosition="end"
            onClick={fetchMoreComments}
          >
            load more comments ..
          </LoadingButton>
        ) : (
          "Nothing more to load"
        )}
      </Stack>
    </React.Fragment>
  );
}


