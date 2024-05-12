
import React from 'react';
import { Avatar , AvatarFallback, AvatarImage} from "@/components/ui/avatar"
// import { user } from '@/app/data/data';
import useUserStore from '@/store/userStore';

export default function Profile() {
    const { user } = useUserStore();

    return (
        
        <div className="p-4 bg-white border-b">
          <div className="flex items-center gap-2">
            {/* <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div> */}
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
    );
}
