import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="p-4 bg-white border-b">
    <Input
      type="text"
      placeholder="Search friends"
      className="w-full px-4 py-2 "
    />
  </div>  )
}
