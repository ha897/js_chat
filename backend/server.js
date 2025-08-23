const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const chats = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const cors = require('cors');
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();
connectDB()
const app = express();

app.use(cors({
  origin: '*',
  // origin: 'http://localhost:3000',
  // credentials: true
}));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
// app.get("/api/chats", (req, res) => {
//   res.send(chats);
// });
// app.get("/api/chats/:id", (req, res) => {
//   const chat = chats.find((chat) => {
//     return chat._id === req.params.id;
//   });

//   res.send(chat);
// });
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold);
});
