// src/components/UserItem.tsx
import React from 'react';
import { Friend } from '@/app/types/types';

interface UserItemProps {
  user: Friend;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="p-4 bg-white border-b flex items-center cursor-pointer">
      <div
        className={`w-3 h-3 rounded-full mr-2 ${
          user.status === 'AVAILABLE'
            ? 'bg-green-500'
            : user.status === 'BUSY'
            ? 'bg-yellow-500'
            : 'bg-gray-500'
        }`}
      ></div>
      <div>
        <h3 className="font-bold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserItem;