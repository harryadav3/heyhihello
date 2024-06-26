"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import useUserStore from "@/store/userStore"
import { loginUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
  email : z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function LoginForm() {
  // ...
  const router = useRouter()
  const { toast } = useToast();
 // 1. Define your form.
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

   loginUser(values.email , values.password).then((res) => {

    if(res){

         console.log(res)
         
         toast({
                title: "Login Success",
                description: "You have successfully logged in",
            
         })
         router.push("/chat")
    }
    }).catch((err) => {
        console.log(err)
        toast({
            variant:"destructive",
            title: "Login Failed",
            description: "Please check your email and password",
    });

  }
    )
    }

  return (
    <Card className="p-6 min-w-96   "> 
    <div className="text-center">
    <h1 className="text-3xl font-semibold  ">Login</h1> 
       </div>
       
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />

              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password"{...field} />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full " type="submit">Submit</Button>
        <div className="  italic text-center ">
            <p>Don't have a account  <Link href="/auth/signup" className="text-blue-600"><span>Signup here</span></Link></p>
        </div>
      </form>
    </Form>
    </Card>

  )
}
