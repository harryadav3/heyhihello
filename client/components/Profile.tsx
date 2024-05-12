
import React from 'react';
import { user } from '@/app/data/data';

export default function Profile() {
  
    return (
        <div className="p-4 bg-white border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
    );
}
