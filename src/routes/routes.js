import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  redirect,
  createRoutesFromElements,
} from "react-router-dom";

import Error from "../pages/Error";
import Root from "../pages/Root";
import Home from "../pages/Home";

import Chat from "../pages/Chat/Chat";
import ChatRoom from "../pages/Chat/ChatRoom";

import PostDetail from "../pages/Post/PostDetail";

import UserDetail from "../pages/UserDetail";
import MyUserProfile from "../pages/MyUserProfile";
import MySettings from "../pages/MySettings";


import RootApp from "../pages/RootApp";
import RootAuth from "../pages/RootAuth";

import Group from "../pages/Group/Group";
import GroupDetail from "../pages/Group/GroupDetail";

import Contact from "../pages/Contact";


import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";



let user = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        element: <RootApp />,
        loader: null,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "post/:postId",
            element: <PostDetail />,
          },
          {
            path: "user/:userId",
            element: <UserDetail />,
          },
          {
            path: "chats",
            element: <Chat />,
          },
          {
            path: "chat/:roomId",
            element: <ChatRoom />,
          },
          {
            path: "myprofile",
            element: <MyUserProfile />,
          },
          {
            path: "setting",
            element: <MySettings />,
          },
          {
            path: "groups",
            element: <Group/>,
          },
          {
            path: "group/:groupId",
            element: <GroupDetail/>,
          },
          {
            path: "contact",
            element: <Contact/>,
          },
        ],
      },
      {
        element: <RootAuth />,
        path:"auth",
        loader: null,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  },
]);



export { router };
