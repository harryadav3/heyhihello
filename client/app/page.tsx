import Image from "next/image";
import Link from "next/link";
import { Button} from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Card className="bg-background p-4"> 
       <h1 className=" text-5xl  font-bold "> 
         Welcome to the HeyHiHello Chatting App! 😝😝
      </h1>
      <div className="p-4 ">    
        <ol className="text-2xl text-gray-700 ">
        <li className=""> 
          Get connected with your friends 
        </li>
        <li>
          Smart Ai to answer if you are busy
        </li>
        <li>
          Easy to use
        </li>
      </ol>
</div>

      <div className=" text-2xl text-gray-500">
        Login or Signup to get started
        <div className=" flex gap-4 items-center align-center w-full">

          <Link href="/auth/login">
          <Button>Loging</Button></Link>
          <Link href="/auth/signup">
            <Button> Signup</Button>
            </Link>

        </div>
      </div></Card>

    </main>
  );
}
