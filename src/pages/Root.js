

import * as React from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";





export default function Root() {
  return (
    <React.Fragment>

        <Outlet/>

    </React.Fragment>
  );
}