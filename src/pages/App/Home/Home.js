import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../../../redux/slices/counterSlice";
import { setUser, clearUser } from "../../../redux/slices/userSlice";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PostCard from "../../../components/PostCard";
import { Container } from "@mui/system";
import BannerCard from "../../../components/BannerCard";


import AppApi from "../../../api/AppApi";

export default function Home() {
  // const count = useSelector((state) => state.counter.value)
  // const user_id = useSelector((state) => state.user.id)
  // const user_name = useSelector((state) => state.user.name)

  // const dispatch = useDispatch()

  const { isLoading, error, data } = useQuery(['post-list'], () => {
    return AppApi.fetchPostList(),
    {
      onError:() => {
        console.log("error")
      },
      onSuccess: (data, variables, context) => {
        console.log("onSuccess running")
      },
    }

  })

  if(isLoading) return (
    <React.Fragment>
      <Container maxWidth="sm">
          <p>Loading....</p>
      </Container>
    </React.Fragment>
  )

  if(error) return (
    <React.Fragment>
      <Container maxWidth="sm">
          <p>Something went wrong!</p>
      </Container>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {
            data.data.results.map((post) => (
              <React.Fragment>
                <PostCard/>
              </React.Fragment>
            ))
          }

        </Stack>
      </Container>
    </React.Fragment>
  );
}
