import { Container } from "@mui/system";
import React from "react";
import PostCard from "./PostCard";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import AppApi from "../../../api/AppApi";
import { useSelector } from "react-redux";


export default function PostDetail(props){
  let {postId} = useParams();
  
  const is_post_detail_refetch = useSelector((state) => state.refetch.post_detail_refetch)
  // const postList = useQuery({
  //   queryKey: ["post-list"],
  //   queryFn: () => {
  //     return AppApi.fetchPostList();
  //   },
  // });

  const postDetail = useQuery({
    queryKey: ["post-detail"],
    queryFn: () => {
      return AppApi.fetchPostDetail(postId);
    },
  })

  React.useEffect(() => {
    postDetail.refetch()
  },[is_post_detail_refetch])

  if (postDetail.isLoading)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <p>Loading....</p>
        </Container>
      </React.Fragment>
    );

  if (postDetail.error)
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          {console.log(postDetail.error)}
          <p>Something went wrong!</p>
        </Container>
      </React.Fragment>
    );

  return(
    <React.Fragment>
      <Container maxWidth="sm">
        {console.log(postDetail)}
        <PostCard data={postDetail.data.data} detail={true}/>
      </Container>
    </React.Fragment>
  )
}