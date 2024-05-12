import { Input } from "@/components/ui/input"

export default function ChatInterface() {
    return (
        <div className="flex flex-col  h-[100vh]" >
          <div className="flex-grow p-4   bg-gray-100 overflow-y-auto">
          </div>
          <div className="p-4 bg-white border-t">
            <Input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 "
            />
          </div>
        </div>
      );
}
