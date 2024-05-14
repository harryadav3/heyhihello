// src/components/FriendList.tsx
'use client'
import React, { useEffect } from 'react';
import useUserStore from '../store/userStore';
import UserItem from "./UserItem";

const FriendList: React.FC = () => {
  const { user } = useUserStore();

  useEffect(() => {
    console.log("user from friendlist: ", user);
  },[user?.friends]);

  return (
    <div className="flex-grow overflow-y-auto">
      {user?.friends.map((friend) => (
        <UserItem key={friend._id} user={friend} />
      ))}
    </div>
  );
};

export default FriendList;