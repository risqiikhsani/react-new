import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useSelector,useDispatch } from "react-redux";
import { decrement,increment, } from "../redux/slices/counterSlice";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";



export default function Home() {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => dispatch(increment())}>Add</Button>
        <p>{count}</p>
        <Button variant="contained" onClick={() => dispatch(decrement())}>Remove</Button>
      </Stack>
    </React.Fragment>
  );
}
