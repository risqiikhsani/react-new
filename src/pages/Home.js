import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useSelector,useDispatch } from "react-redux";
import { decrement,decrementByAmount,increment, incrementByAmount, } from "../redux/slices/counterSlice";
import { setUser,clearUser } from "../redux/slices/userSlice";



import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";



export default function Home() {

  const count = useSelector((state) => state.counter.value)
  const user_id = useSelector((state) => state.user.id)
  const user_name = useSelector((state) => state.user.name)

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => dispatch(setUser({id:1,name:"kucing"}))}>Change User Name</Button>
        <Button variant="contained" onClick={() => dispatch(clearUser())}>Clear User</Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <p>user id = {user_id}</p>
        <p>user name = {user_name}</p>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => dispatch(increment())}>Add</Button>
        <p>{count}</p>
        <Button variant="contained" onClick={() => dispatch(decrement())}>Remove</Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => dispatch(incrementByAmount(10))}>Add by 10</Button>
        <Button variant="contained" onClick={() => dispatch(decrementByAmount(10))}>Remove by 10</Button>
      </Stack>
    </React.Fragment>
  );
}
