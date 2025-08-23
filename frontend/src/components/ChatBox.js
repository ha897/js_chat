import { ChatState } from "../context/chatProvider";
import MessageBubble from "./MessageBubble";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
const ChatBox = () => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  return (
    <Paper
      elevation={3}
      width={{
        xs: "95%", // للشاشات الصغيرة (موبايل)
        sm: "80%", // للشاشات المتوسطة (تابلت)
        md: "60%", // للشاشات الكبيرة (لابتوب)
        lg: "50%", // للشاشات الأكبر (ديسكتوب)
      }}
      sx={{
        width: {
          xs: "100%", // للشاشات الصغيرة (موبايل)
          sm: "69%", // للشاشات المتوسطة (تابلت)
          md: "74%", // للشاشات الكبيرة (لابتوب)
          lg: "74%", // للشاشات الأكبر (ديسكتوب)
        },
        height: "100%",
        borderRadius: "10px",
        p: 1.5,
        
        display: {
          xs: selectedChat ? "flex" : "none",
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
        {selectedChat ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "4px",
              }}
            >
                
                {/* back to chat list */}
              <Button
                size="small"
                onClick={() => setSelectedChat(undefined)}
                sx={{
                  width: "30px", // العرض
                  minWidth: "30px", // مهم جدًا لإلغاء العرض الافتراضي للزر
                  height: "30px", // الطول
                  borderRadius: "50%", // دائري
                  textTransform: "none",
                  fontSize: "12px",
                  display: {
                    xs: "flex",
                    sm: "none",
                    md: "none",
                    lg: "none",
                  },
                }}
                >
                <i className="fa-solid fa-arrow-left"></i>
              </Button>

              <Typography variant="h6" fontWeight={600}>
                {selectedChat.chatName}
              </Typography>
            </Box>
            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", fontSize: "12px" }}
            >
              New Group Chat +
            </Button>
          </>
        ) : (
          "null"
        )}
      </Box>
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "100%",
          borderRadius: "10px",
        overflow: "hidden",

        //   overflowY: "scroll",
        }}
      >
        {selectedChat ? (
            <>
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "89%",
          p:1,
          overflowY: "auto",
        }}
      >
            <MessageBubble text="السلام عليكم 👋" sender="other" />
            <MessageBubble text="وعليكم السلام! 🌹" sender="me" />
            <MessageBubble text="كيف حالك؟" sender="other" />
            <MessageBubble text="تمام الحمدلله، وأنت؟" sender="me" />
      </Box>
      <Box
        sx={{
            height: "11%",
          display: "flex",
          alignItems: "center",
          p:1,
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="write message..."
          sx={{
            bgcolor: "white",
            borderRadius: "20px",
            "& fieldset": { border: "none" }, //no border
          }}
        />
        <IconButton
          color="primary"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            fontSize: "18px",
            p:'12px',
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {/* <SendIcon /> */}
          <i class="fa-solid fa-paper-plane"></i>
        </IconButton>
      </Box>
          </>
        ) : (
          ""
        )}
      </Box>
      {/*  */}
    </Paper>
  );
};
export default ChatBox;