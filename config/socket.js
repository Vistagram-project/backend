// config/socket.js
let onlineUsers = new Map();

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("add-user", (userId) => {
        console.log(userId);
      onlineUsers.set(socket.id,{ id:socket.id, userId:userId });
      io.emit("user-online",Array.from(onlineUsers.values()))
      io.emit()
    });

    socket.on("send-message", ({ to, from, message }) => {
        console.log(to + " " + from + " " + message);

      const receiverSocketId = onlineUsers.get(to);
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("receive-message", { from, message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
      [...onlineUsers.entries()].forEach(([key, value]) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      });
    });
  });
};

export default  setupSocket;
