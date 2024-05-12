"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchUsers , addFriend } from "@/lib/api";
// import { user } from '@/app/data/data';
import useUserStore from "@/store/userStore";
import { any } from "zod";
export default function Profile() {
const { user } = useUserStore();
const [searchquery, setSearchQuery] = useState<string>("");
const [searchResults, setSearchResults] = useState<{ id: string, name: string }[]>([]);

const handleSearch = async () => {
    try {
        const token = Cookies.get("token") ?? "";
        console.log("token from profile: ", token , searchquery);
        const response = await searchUsers(searchquery ?? "", token);
        console.log("response from search: ", response);
        setSearchResults(response.map((result: any) => ({ id: result._id, name: result.name })));
    } catch (error) {
        console.error(error);
    }
};

const handleAddFriend =   () => {
    console.log("user from profile: ", user?.id  , searchResults[0].id);
    if (user?.id && searchResults[0]?.id) {
        addFriend(user.id, searchResults[0].id, Cookies.get("token") ?? "").then((res) => {
            console.log("res from add friend: ", res);
        }).catch((error) => {
            console.error(error);
        });
    }
};

  return user ? (
    <div className="p-4 bg-white border-b flex  justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Friend</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a Friend</DialogTitle>
              <DialogDescription>
                Type the name of friend to search a friend.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className=" items-center gap-4">
                <Input
                  name="searchquery"
                  value={searchquery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search friends"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSearch}> Search</Button>
            </DialogFooter>
            {searchResults.length > 0 && (
              <div>
                <div>
                  {searchResults.map((result) => (
                    <div key={result.id} className=" flex justify-between border-4 rounded-md">
                        <p>{result.name}</p>
                        <Button onClick={handleAddFriend}>+</Button> 
                        </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ) : null;
}
