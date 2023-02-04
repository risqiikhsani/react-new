import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { comment_api } from "../../../../api/Api";

import AppApi from "../../../../api/AppApi";
import CommentSkeleton from "../../../../components/SuspenseFallback/CommentSkeleton";
import CommentCard from "./CommentCard";

export default function CommentList(props) {
  
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const { ref, inView } = useInView();
  
  const commentInfiniteList = useInfiniteQuery(
    ["commentlist",{id:props.post_id}],
    async ({ pageParam = 1 }) => {
      const res = await comment_api.get_list(
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
            variant="outlined" size="small" sx={{borderRadius:'20px', textTransform: "none" }}
          >
            load more comments ..
          </LoadingButton>
        ) : null}
      </Stack>
    </React.Fragment>
  );
}


