'use client'
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api";
import { useRouter } from "next/navigation";


export default function Logout() {

    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    }

        return (
                <div className="p-4 bg-white border-t">
                    <Button className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                    onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            );
}
