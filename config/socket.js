// config/socket.js

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
    socket.on("send-message", ({ from, to, message }) => {
      console.log(`✉️ Message from ${from} to ${to}: ${message}`);
      console.log("online USer =>>>>", onlineUsers)
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
