import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



import Error from "../pages/Error";
import Root from "../pages/Root";
import Home from "../pages/Home";

import Chat from "../pages/Chat/Chat";
import ChatRoom from "../pages/Chat/ChatRoom";

import PostDetail from "../pages/Post/PostDetail";

import User from "../pages/User";




const router = createBrowserRouter([
    {
        path:"/",
        element: <Root/>,
        errorElement: <Error/>,
        loader:null,
        children:[
            {
                path:"",
                element:<Home/>,
            },
            {
                path:"post/:postId",
                element: <PostDetail/>,
            },
            {
                path:"user/:userId",
                element: <User/>,
            },
            {
                path:"chat",
                element:<Chat/>,
            },
            {
                path:"chat/:roomId",
                element:<ChatRoom/>,
            },
        ],
    },
    
])

export {router};