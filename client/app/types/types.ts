// types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    friends: Friend[];
    status: 'AVAILABLE' | 'BUSY';
  }
  
  export interface Friend {
    _id: string; // Use _id instead of id for MongoDB ObjectId
    name: string;
    email: string;
    status: 'AVAILABLE' | 'BUSY';  }