import { io } from 'socket.io-client';

let socket;

export const initSocket = (token, userId) => {
  // Disconnect existing socket if any
  if (socket) {
    socket.disconnect();
  }

  // Create new socket connection
  socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
    auth: {
      token
    },
    transports: ['websocket', 'polling'] // Fallback for different environments
  });

  // Socket event handlers
  socket.on('connect', () => {
    console.log('Connected to server with socket ID:', socket.id);

    // Join user-specific room for personalized notifications
    if (userId) {
      socket.emit('join-user-room', userId);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from server:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  // Custom event handlers
  socket.on('new-appointment', (data) => {
    console.log('New appointment notification:', data);
    if (window.showNotification) {
      window.showNotification('New Appointment', `You have a new appointment: ${data.title}`);
    }
  });

  socket.on('new-document', (data) => {
    console.log('New document notification:', data);
    if (window.showNotification) {
      window.showNotification('New Document', `A new document has been uploaded: ${data.originalName}`);
    }
  });

  socket.on('case-update', (data) => {
    console.log('Case update notification:', data);
    if (window.showNotification) {
      window.showNotification('Case Update', `Your case "${data.title}" has been updated`);
    }
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('Socket not initialized. Call initSocket first.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected');
  }
};

// Helper function to emit events with error handling
export const emitWithAck = (event, data, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(new Error('Socket not connected'));
      return;
    }

    // Set timeout for the acknowledgment
    const timer = setTimeout(() => {
      reject(new Error(`Socket event ${event} timed out after ${timeout}ms`));
    }, timeout);

    socket.emit(event, data, (response) => {
      clearTimeout(timer);
      if (response && response.error) {
        reject(new Error(response.error));
      } else {
        resolve(response);
      }
    });
  });
};

// Subscribe to an event
export const subscribe = (event, callback) => {
  if (socket) {
    socket.on(event, callback);
    return () => socket.off(event, callback); // Return unsubscribe function
  }
  return () => {}; // No-op if socket not available
};

// Unsubscribe from an event
export const unsubscribe = (event, callback) => {
  if (socket) {
    socket.off(event, callback);
  }
};

export default {
  initSocket,
  getSocket,
  disconnectSocket,
  emitWithAck,
  subscribe,
  unsubscribe
};