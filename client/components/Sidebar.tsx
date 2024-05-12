import Profile from "./Profile"
import SearchBar from "./SearchBar"
import FriendsList from "./FriendsList"
import Logout from "./Logout"
export default function Sidebar() {

  return (
    <div className="flex flex-col h-[100vh]  bg-green-500 border-r">
        <Profile />
        <SearchBar />
        <FriendsList />
        <Logout /> 
    </div>
  )
}
