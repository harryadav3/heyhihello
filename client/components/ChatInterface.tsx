'use client'
import { useEffect, useState , useRef} from "react";
import { Input } from "@/components/ui/input"
import useSelectedUserStore from "@/store/selectedUserStore";
import useUserStore from "@/store/userStore";
import { getMessagesBetweenUsers } from "@/lib/api";
import { Message } from "@/app/types/types";


import useChat from "@/lib/socket";

export default function ChatInterface() {

    const { selectedUser } = useSelectedUserStore();
    const { user } = useUserStore();
    const [messages, setMessages] = useState<Message[]>([]);

  const { chatMessages, sendMessage } = useChat(selectedUser?._id);

    useEffect(() => {
      if (selectedUser && user) {
        const fetchMessages = async () => {
          try {
            const messages = await getMessagesBetweenUsers(user.id, selectedUser._id);
            setMessages(messages);
          } catch (error) {
            console.error('Failed to fetch messages:', error);
          }
        };
        fetchMessages();
      }
    }, [selectedUser, user]);



    return (
        <div className="flex flex-col h-screen">
          <div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
            {selectedUser && (
              <>
                <h2 className="font-bold mb-4">
                  Chat with {selectedUser.name} ({selectedUser.email})
                </h2>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.sender === user?.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                    } p-2 rounded mb-2 ${
                      message.sender === user?.id ? 'self-start' : 'self-end'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                
              </>
            )}
          </div>
          <div className="p-4 bg-white border-t">
          <input
        type="text"
        placeholder="Type your message..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(selectedUser?._id || '', e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
          </div>
        </div>
      );


}
