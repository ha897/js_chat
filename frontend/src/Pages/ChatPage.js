import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/chatProvider";

import SideDrawer from "../components/miscellaneous/SideDrawer.js";
import MyChats from "../components/MyChats.js";
import ChatBox from "../components/ChatBox.js";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ChatState } from "../context/ChatProvider";

// const ChatPage = () => {
//   const {user} = ChatState();
//   const [chats, setChats] = useState(["eee", "eee", "eee"]);

//   return (
//     <div className="chat-page">
//       <div className="chat-header">
//         <h2>Chats</h2>
//       </div>
//       <div className="chat-info">
//         <div className="chat-list">
//         <div className="chat-list-header">
//           My Chats <button>New Group Chat +</button>
//       </div>
//         <div className="chats">
//           {chats.map((chat) => {
//             return (
//               <div key={chat} className="chat-item">
//                 <h3>{chat}</h3>
//               </div>
//             );
//           })}
//           </div>
//         </div>
//         <div className="chat-view"></div>
//       </div>
//     </div>
//   );
// };
export default ChatPage;
