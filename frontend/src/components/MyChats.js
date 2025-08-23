import { useState,useEffect } from "react";
import { ChatState } from "../context/chatProvider";
import { getSender } from "../config/ChatLogics";
import toast from "../utils/toast";
import axios from "axios";

import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const MyChats = () => {
  const [ loggedUser,setLoggedUser] = useState();
  const [ loadingChat,setLoadingChat] = useState(true);
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const fetchChats = async () => {
  // console.log(user._id);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get("http://127.0.0.1:5000/api/chat", config);
    setChats(data);
    setLoadingChat(false);
  } catch (error) {
    toast("Error Occured: "+error,"error");
  }
};
useEffect(() => {
  setLoggedUser(JSON.parse(localStorage.getItem("user-info")));
  fetchChats();
}, []);

  return (
    <Paper
      elevation={3}
      width= {{
          xs: "95%",   // للشاشات الصغيرة (موبايل)
          sm: "80%",   // للشاشات المتوسطة (تابلت)
          md: "60%",   // للشاشات الكبيرة (لابتوب)
          lg: "50%",   // للشاشات الأكبر (ديسكتوب)
        }}
      
      sx={{
        width: {
          xs: "100%",   // للشاشات الصغيرة (موبايل)
          sm: "30%",   // للشاشات المتوسطة (تابلت)
          md: "25%",   // للشاشات الكبيرة (لابتوب)
          lg: "25%",   // للشاشات الأكبر (ديسكتوب)
        },
        height: "100%",
        borderRadius: "10px",
        p: 2,
        display:{
          xs: selectedChat?"none":"flex",
          sm: "flex",
          md: "flex",
          lg: "flex",
        },
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          My Chats
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "12px" }}
        >
          New Group Chat +
        </Button>
      </Box>

      {/* Chats List */}
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* هنا يمكن استبدال العنصر الثابت بالـ chats.map */}
        {loadingChat &&
          <span>
        loading...
        </span>
        }
        {chats && chats.length > 0  ? (
          chats.map((chat) => (
            <ListItem
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              sx={{
                bgcolor: selectedChat?._id === chat._id ? "primary.main" : "#333",
                borderRadius: "10px",
                cursor: "pointer",
                color: "white",
                "&:hover": {
                  bgcolor:
                    selectedChat?._id === chat._id ? "primary.dark" : "grey.700",
                },
              }}
            >
              <ListItemText
                // primary={chat.isGroupChat? chat.chatName:chat.users[1].name }
                primary={chat.isGroupChat? chat.chatName: getSender(loggedUser, chat.users) }
                primaryTypographyProps={{ fontSize: "15px", fontWeight: 500 }}
              />
            </ListItem>
          ))
        ) : !loadingChat&& (
          <Typography variant="body2" color="text.secondary">
            no chats yet
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default MyChats;
