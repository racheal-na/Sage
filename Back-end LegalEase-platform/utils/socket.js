const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Join user to their room for personalized notifications
    socket.on('join-user-room', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined their room`);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getIo };