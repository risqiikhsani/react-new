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

import RootApp from "../pages/RootApp";
import RootAuth from "../pages/RootAuth";

import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";


// const router = createBrowserRouter([
//     {
//         path:"/",
//         element: <Root/>,
//         errorElement: <Error/>,
//         loader:null,
//         children:[
//             {
//                 path:"",
//                 element:<Home/>,
//             },
//             {
//                 path:"post/:postId",
//                 element: <PostDetail/>,
//             },
//             {
//                 path:"user/:userId",
//                 element: <User/>,
//             },
//             {
//                 path:"chat",
//                 element:<Chat/>,
//             },
//             {
//                 path:"chat/:roomId",
//                 element:<ChatRoom/>,
//             },
//         ],
//     },
    
// ])



const router = createBrowserRouter([
    {
        path:"/",
        element: <Root/>,
        errorElement: <Error/>,
        loader:null,
        children:[
            {
                path:"",
                element:<RootApp/>,
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
            {
                path:"auth",
                element:<RootAuth/>,
                children:[
                    {
                        path:"login",
                        element:<Login/>,
                    },
                    {
                        path:"signup",
                        element: <Signup/>,
                    },
                    {
                        path:"forgot-password",
                        element: <ForgotPassword/>,
                    },
                ],
            },
        ],
    },
    
])

export {router};