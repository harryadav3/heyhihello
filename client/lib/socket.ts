// src/utils/socket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '@/app/types/types';
import Cookies from 'js-cookie';
import useUserStore from '@/store/userStore';
import useMessageStore from '@/store/messageStore';

let socket: Socket | null = null;

// export const initSocket = () => {



//   const { user } = useUserStore.getState();
//   if (!user) {
//     console.error('User not authenticated');
//     return;
//   }

//   socket = io('http://localhost:3001', {

//     query: {
//       token: user.token,
//     },
//   });

//   socket.on('connect', () => {
//     console.log('Connected to WebSocket server');
//     socket.emit('authenticate', { token: user.token });
//   });

//   socket.on('error', (error) => {
//     console.error('WebSocket error:', error);
//   });

//   socket.on('receive-message', (message: Message) => {
//     useMessageStore.getState().addMessage(message);
//   });
// };

// export const sendPrivateMessage = (receiver: string, content: string) => {
//   if (!socket) {
//     console.error('WebSocket connection not established');
//     return;
//   }

//   socket.emit('private-message', { receiver, content });
// };


 socket = io('http://localhost:3001'); // Replace with your server URL

 const useChat = (selectedUser: string | undefined) => {
    const { user } = useUserStore();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
  
    useEffect(() => {
      // Connect to the server
      socket.connect();
  
      // Authenticate the user
      socket.emit('authenticate', { token: Cookies.get("token") });
  
      // Listen for incoming messages
      socket.on('receive-message', (message: Message) => {
        // Check if the message is for the current chat
        if (message.sender === selectedUser || message.receiver === user?.id) {
          setChatMessages((prevMessages) => [...prevMessages, message]);
        }
      });
  
      // Clean up the event listener on unmount
      return () => {
        socket.off('receive-message');
        socket.disconnect();
      };
    }, [user, selectedUser]);
    const sendMessage = (receiver: string, content: string) => {
      console.log('receiver', receiver);
      console.log('content', content);
      socket.emit('private-message', { receiver, content });
    };
  
    return { chatMessages, sendMessage };
  };
  
  export default useChat