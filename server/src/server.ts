import  app  from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './utils/socketUtils';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// const server = app.listen(app.get('port'), () => {
//     console.log(`Server running on server port ${app.get('port')}`);
// });



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', socketHandler);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});