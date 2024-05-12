import { friends } from "@/app/data/data";

export default function FriendsList() {
    return (
        <div className="flex-grow overflow-y-auto h-full bg-white">
          {friends.map((friend) => (
            <div key={friend.id} className="p-4 bg-white border-b flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${friend.status === 'ONLINE' ? 'bg-green-500' : friend.status === 'BUSY' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
              <div>
                <h3 className="font-bold">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.email}</p>
              </div>
            </div>
          ))}
        </div>
      );
}
