import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { post_api } from "../../../api/Api";
import PostCard from "./PostCard";

export default function PostDetail(props) {
  const navigate = useNavigate();
  let { postId } = useParams();

  // const postList = useQuery({
  //   queryKey: ["post-list"],
  //   queryFn: () => {
  //     return AppApi.fetchPostList();
  //   },
  // });

  // const postDetail = useQuery({
  //   queryKey: ["postdetail",{id:postId}],
  //   queryFn: () => {
  //     return AppApi.fetchPostDetail(postId);
  //   },
  //   keepPreviousData:true,
  //   // refetchOnWindowFocus: false,
  //   // enabled: false,
  // })

  const postDetail = useQuery(
    ["post-detail",{id:postId}],
    () => {
      return post_api.get_detail(postId);
    },
    {
      keepPreviousData: true,
    }
  );

  React.useEffect(() => {
    console.log("POST DETAIL IS RUNNING~~~~~~~~~~~~~~~~~~~~~~");
  }, []);

  // React.useEffect(() => {
  //   postDetail.refetch()

  // },[is_post_detail_refetch])

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
          {/* {console.log(postDetail.error)} */}
          <p>Something went wrong!</p>
        </Container>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      {console.log("postDetail's JSX is running ~~~~~~~~~~~")}
      <Container maxWidth="sm">
        <PostCard data={postDetail.data.data} detail={true} />
      </Container>
    </React.Fragment>
  );
}
