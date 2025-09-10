const Message  = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const asyncHandler = require("express-async-handler");

const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.json(message);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
});

const allMessages = asyncHandler(async (req,res)=>{
    try {
    const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");

    res.json(messages);
} catch (error) {
    res.status(400);
    throw new Error(error.message);
}

})

module.exports={sendMessages,allMessages};