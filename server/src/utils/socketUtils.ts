// import { Server, Socket } from 'socket.io';
// import Message, { IMessage } from '../models/messageModel';
// import User, { IUser } from '../models/userModel';
// import { languageModelResponse } from './languageModel';

// let io: Server;
// let onlineUsers: { [userId: string]: string } = {}; // Store online users

// export const initSocket = (server: any) => {
//   io = new Server(server, {
//     cors: {
//       origin: '*',
//     },
//   });

//   io.on('connection', (socket: Socket) => {
//     console.log('New client connected');

//     socket.on('message', async (data) => {
//       const { sender, receiver, content } = data;
//       const newMessage = new Message({ sender, receiver, content });
//       await newMessage.save();

//       const receiverUser = await User.findById(receiver);
//       if (receiverUser && receiverUser.status === 'BUSY') {
//         const response = await languageModelResponse(content);
//         const botMessage = new Message({
//           sender: receiver,
//           receiver: sender,
//           content: response,
//         });
//         await botMessage.save();
//         io.to(socket.id).emit('message', botMessage);
//       } else {
//         io.emit('message', newMessage);
//       }
//     });

//     socket.on('typing', (data) => {
//       io.emit('typing', data);
//     });

//     socket.on('online', async (userId, userName) => {
//       console.log(userId)
//       const user = await User.findById(userId);
//       if (user) {
//         user.status = 'AVAILABLE';
//         await user.save();
//         onlineUsers[userId] = userName; // Add user to online users
//         io.emit('onlineUsers', onlineUsers); //
//             }
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//       // Remove user from online users when they disconnect
//       const disconnectedUser = Object.entries(onlineUsers).find(
//         ([, name]) => name === socket.handshake.query.name
//       );
//       if (disconnectedUser) {
//         delete onlineUsers[disconnectedUser[0]];
//         io.emit('onlineUsers', onlineUsers);
//       }
//         });
//   });
// };

// export const getIO = () => io;

import jwt from "jsonwebtoken";
import User from "../models/userModel";
import Message from "../models/messageModel";
import generateText from "../utils/languageModel";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticateData {
  token: string;
}

interface PrivateMessageData {
  receiver: string;
  content: string;
}

const socketHandler = (socket: any) => {
  console.log("New connection");

  // Authenticate the user
  socket.on("authenticate", (data: AuthenticateData) => {
    // console.log(data);
    const { token } = data;
    // const token = data.token;
    // console.log(token);
    try {
      jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
          return socket.emit("error", "Invalid token");
        }

        socket.userId = (user as { userId: string }).userId;
        socket.join(socket.userId);
        console.log(`User authenticated with ${socket.userId}`);
        console.log(`Socket ID: ${socket.userId}`);
      });
    } catch (err) {
      socket.disconnect();
      return socket.emit("error", "Invalid token");
    }
  });

  // Send a private message
  socket.on("private-message", async (data: PrivateMessageData) => {
    const { receiver, content } = data;

    try {
      const recipientUser = await User.findById(receiver);

      if (!recipientUser) {
        return socket.emit("error", "User not found");
      }

      if (recipientUser.status === "BUSY") {
        const llmResponse = await generateText(content);
        const senderMessage = new Message({
          sender: socket.userId,
          receiver,
          content,
        });
        const llmResponseMessage = new Message({
          sender: receiver,
          receiver: socket.userId,
          content: llmResponse,
        });

        await senderMessage.save();
        await llmResponseMessage.save();

        socket.to(receiver).emit("receive-message", senderMessage);
        socket.to(socket.userId).emit("receive-message", llmResponseMessage);
      } else {
        // Create a new message
        const newMessage = new Message({
          sender: socket.userId,
          receiver, 
          content,
        });

        // Save the message to the database
        await newMessage.save();

        // Emit the message to the recipient
        socket.to(receiver).emit("receive-message", newMessage);
      }
    } catch (err) {
      console.error("Error sending private message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
};

export default socketHandler;
