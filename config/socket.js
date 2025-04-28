// config/socket.js
import { saveMessageService } from "../controllers/chatController.js";
let onlineUsers = new Map();

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    // Handle new user connection
    socket.on("add-user", (userId) => {
      console.log(`👤 Adding user: ${userId}`);
      onlineUsers.set(userId, { socketId: socket.id, userId });
      
      // Notify all clients about updated online users
      io.emit("user-online", Array.from(onlineUsers.values()));
    });

    // Handle sending message 
    socket.on("send-message", async ({ from, to, message }) => {
      console.log(`✉️ Message from ${from} to ${to}: ${message}`);
      // 🔥 Save the message to the database first
      try {
        console.log("from => ", from + " ", "to => ", to + " ", "msg=> ", message)
        await saveMessageService({ senderId: from, receiverId: to, message } );
      } catch (error) {
        console.error("Failed to save message:", error);
      }

      const receiver = onlineUsers.get(to); // to = userId
      console.log("recerver =>", receiver)
      if (receiver) {
        io.to(receiver.socketId).emit("receive-message", { from, message });
        console.log(`📤 Sent to ${receiver.socketId}`);
      } else {
        console.log("❌ Receiver not online");
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
      
      // Find and remove user from onlineUsers
      let disconnectedUserId = null;
      for (let [userId, userInfo] of onlineUsers.entries()) {
        if (userInfo.socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        console.log(`🛑 Removed user: ${disconnectedUserId}`);
        io.emit("user-online", Array.from(onlineUsers.values()));
      }
    });
  });
};

export default setupSocket;
