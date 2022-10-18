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

export default function Home() {
  // const count = useSelector((state) => state.counter.value)
  // const user_id = useSelector((state) => state.user.id)
  // const user_name = useSelector((state) => state.user.name)

  // const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Stack>
      </Container>
    </React.Fragment>
  );
}
