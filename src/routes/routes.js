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
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

// import Error from "../pages/Others/Error";
// import Root from "../pages/Root";
// import Home from "../pages/App/Home/Home";

// import Chat from "../pages/App/Chat/Chat";
// import ChatRoom from "../pages/App/Chat/ChatRoom";


// import PostDetail from "../pages/App/Post/PostDetail";


// import Profile from "../pages/App/Profile/Profile";


// import RootApp from "../pages/RootApp";
// import RootAuth from "../pages/RootAuth";
// import RootSetting from "../pages/RootSetting";

// import Group from "../pages/App/Group/Group";
// import GroupDetail from "../pages/App/Group/GroupDetail";

// import Contact from "../pages/App/Contact/Contact";


// import AccountSettings from "../pages/Settings/user/AccountSettings";
// import ProfileSettings from "../pages/Settings/user/ProfileSettings";
// import PrivacySettings from "../pages/Settings/user/PrivacySettings";
// import DevicesSettings from "../pages/Settings/user/DevicesSettings";
// import ConnectionsSettings from "../pages/Settings/user/ConnectionsSettings";


// import MediaSettings from "../pages/Settings/app/MediaSettings";
// import NotificationSettings from "../pages/Settings/app/NotificationSettings";


// import HistorySettings from "../pages/Settings/Activity/HistorySettings";
// import loadable from "@loadable/component";


// import Signup from "../pages/Auth/Signup";
// import Login from "../pages/Auth/Login";
// import ForgotPassword from "../pages/Auth/ForgotPassword";
// import SignupProgress from "../pages/Auth/SignupProgress";
const Error = loadable(() => import("../pages/Others/Error"));
const Root = loadable(() => import("../pages/Root"));
const Home = loadable(() => import("../pages/App/Home/Home"));
// const Home = loadable(() =>
//   pMinDelay(import("../pages/App/Home/Home"), 4000)
// )

const Chat = loadable(() => import("../pages/App/Chat/Chat"));
const ChatRoom = loadable(() => import("../pages/App/Chat/ChatRoom"));


const PostDetail = loadable(() => import("../pages/App/Post/PostDetail"));


const Profile = loadable(() => import("../pages/App/Profile/Profile"));


const RootApp = loadable(() => import("../pages/RootApp"));
const RootAuth = loadable(() => import("../pages/RootAuth"));
const RootSetting = loadable(() => import("../pages/RootSetting"));

const Group = loadable(() => import("../pages/App/Group/Group"));
const GroupDetail = loadable(() => import("../pages/App/Group/GroupDetail"));

const Contact = loadable(() => import("../pages/App/Contact/Contact"));


const AccountSettings = loadable(() => import("../pages/Settings/user/AccountSettings"));
const ProfileSettings = loadable(() => import("../pages/Settings/user/ProfileSettings"));
const PrivacySettings = loadable(() => import("../pages/Settings/user/PrivacySettings"));
const DevicesSettings = loadable(() => import("../pages/Settings/user/DevicesSettings"));
const ConnectionsSettings = loadable(() => import("../pages/Settings/user/ConnectionsSettings"));


const MediaSettings = loadable(() => import("../pages/Settings/app/MediaSettings"));
const NotificationSettings = loadable(() => import("../pages/Settings/app/NotificationSettings"));


const HistorySettings = loadable(() => import("../pages/Settings/Activity/HistorySettings"));


const Signup = loadable(() => import('../pages/Auth/Signup'))
const Login = loadable(() => import('../pages/Auth/Login'))
const ForgotPassword = loadable(() => import('../pages/Auth/ForgotPassword'))
const SignupProgress = loadable(() => import('../pages/Auth/SignupProgress'))



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
            element: <Home/>,
          },

          {
            path: "post/:postId",
            element: <PostDetail />,
          },
          {
            path: "user/:userId",
            element: null,
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
            path: "profile",
            element: <Profile />,
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
          {
            path: "signup-completion",
            element: <SignupProgress/>,
          },

        ],
      },
      {
        element:<RootSetting/>,
        path:"setting",
        loader:null,
        children:[
          {
            path: "user/profile",
            element: <ProfileSettings/>,
          },
          {
            path: "user/account",
            element: <AccountSettings/>,
          },
          {
            path: "user/devices",
            element: <DevicesSettings/>,
          },
          {
            path: "user/privacy",
            element: <PrivacySettings/>,
          },
          {
            path: "user/connections",
            element: <ConnectionsSettings/>,
          },
          {
            path: "app/media",
            element: <MediaSettings/>,
          },
          {
            path: "app/notification",
            element: <NotificationSettings/>,
          },
          {
            path: "activity/history",
            element: <HistorySettings/>,
          },
        ],
      },
    ],
  },
]);



export { router };
