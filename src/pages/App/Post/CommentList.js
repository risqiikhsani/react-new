import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import AppApi from "../../../api/AppApi";
import CommentCard from "./CommentCard";

function CommentList(props){

    const dispatch = useDispatch()
    const is_comment_list_refetch = useSelector((state) => state.refetch.comment_list_refetch)

    const {ref,inView} = useInView()

    const commentInfiniteList = useInfiniteQuery(
        ['comments'],
        async({pageParam=1}) => {
            const res = await AppApi.fetchCommentList(props.post_id,`?page=${pageParam}`)
            return res.data
        },
        {
            getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
            getNextPageParam: (lastPage) => lastPage.next ?? undefined,
        }
    )



    // const fetchMoreComments = () => {
    //     commentInfiniteList.fetchNextPage()
    // }

    React.useEffect(() => {
        commentInfiniteList.refetch()
    },[is_comment_list_refetch])


    if(commentInfiniteList.isLoading){
        return(
            <React.Fragment>
                Load comments ...
            </React.Fragment>
        )
    }

    if(commentInfiniteList.error){
        return(
            <React.Fragment>
                <Typography>something went wrong!</Typography>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            {console.log("CommentList is running")}
            <Stack
                   direction="column"
                   justifyContent="flex-start"
                   alignItems="left"
                   spacing={1} 
                   sx={{m:'10px'}}
            >
                {
                    commentInfiniteList.data.pages.map((a) => (
                        <>
                            {a.results.map((comment) => (
                                
                                    <CommentCard key={comment.id} data={comment}/>
                                
                            ))}
                        </>
                    ))
                }
                {/* {commentInfiniteList.hasNextPage&&(
                <LoadingButton
                    loading={commentInfiniteList.isLoading}
                    loadingPosition="end"
                    onClick={fetchMoreComments()}
                >
                    load more comments ..
                </LoadingButton>)} */}


            </Stack>
        </React.Fragment>
    )
}

export default memo(CommentList);