import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { reply_api } from "../../../../../api/Api";



import CommentSkeleton from "../../../../../components/SuspenseFallback/CommentSkeleton";
import ReplyCard from "./ReplyCard";


export default function ReplyList(props) {
  
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  
  const replyInfiniteList = useInfiniteQuery(
    ["replylist",{id:props.comment_id}],
    async ({ pageParam = 1 }) => {
      const res = await reply_api.get_list(
        props.comment_id,
        `?page=${pageParam}`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    }
  );



  const fetchMoreReplies = () => {
    replyInfiniteList.fetchNextPage();
  }

  if (replyInfiniteList.isLoading) {
    return <React.Fragment>Load replies ...</React.Fragment>;
  }

  if (replyInfiniteList.isError) {
    return (
      <React.Fragment>
        <Typography>something went wrong!</Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {console.log("ReplyList is running")}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="left"
        spacing={1}
        sx={{ m: "10px" }}
      >
        {replyInfiniteList.data.pages.map((a) => (
          <>
            {a.results.map((reply) => (
              <ReplyCard key={reply.id} data={reply} />
            ))}
          </>
        ))}

        {replyInfiniteList.isFetchingNextPage ? (
          <CommentSkeleton />
        ) : replyInfiniteList.hasNextPage ? (
          <LoadingButton
            loading={replyInfiniteList.isLoading}
            loadingPosition="end"
            onClick={fetchMoreReplies}
            variant="outlined" size="small" sx={{borderRadius:'20px', textTransform: "none" }}
          >
            load more replies ..
          </LoadingButton>
        ) : null}
      </Stack>
    </React.Fragment>
  );
}


