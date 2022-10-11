import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const data = [
  {
    id: 1,
    room: {
      room_name: "Kucing",
      room_type: "person",
      room_image: null,
      pinned: true,
    },
    last_text: {
      message_sender: "kucing",
      text: "halo..",
    },
    timestamp: "10:30 AM",
    unread_messages: 3,
  },
  {
    id: 2,
    room: {
      room_name: "Semut",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Semut",
      text: "ui",
    },
    timestamp: "10:40 AM",
    unread_messages: 1,
  },
  {
    id: 3,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 4,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 5,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 6,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 7,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 8,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 9,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
  {
    id: 10,
    room: {
      room_name: "Boi",
      room_type: "person",
      room_image: null,
      pinned: false,
    },
    last_text: {
      message_sender: "Boi",
      text: "hello",
    },
    timestamp: "10:50 AM",
    unread_messages: 1,
  },
];

export default function Chat(props) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((item) => (
        <>
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.room.room_image} />
            </ListItemAvatar>
            <ListItemText
              primary={item.room.room_name}
              secondary={item.last_text.text}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
