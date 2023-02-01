import * as React from "react";


import { Container } from "@mui/system";
import CreatePostDial from "../Global/CreatePostDial";
import PostList from "../Post/PostList";


export default function Home() {



  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <CreatePostDial/>
        <PostList/>
      </Container>
    </React.Fragment>
  );
}
