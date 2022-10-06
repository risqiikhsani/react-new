import HomeContainer from "../layouts/HomeContainer";


import * as React from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";



const user = {
  id: 1,
  name: "Meow",
}

export default function Root() {
  return (
    <React.Fragment>
      <HomeContainer
        user={user}
      >
        <Outlet/>
      </HomeContainer>
    </React.Fragment>
  );
}