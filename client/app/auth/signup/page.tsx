
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import Link from "next/link"
import { registerUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import useUserStore from "@/store/userStore"
import { use } from "react"
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function SignupForm() {
  // ...
  const { setUser } = useUserStore()
  const router = useRouter()
  const { toast } = useToast();
 // 1. Define your form.
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email:"",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { name , email , password } = values
    // console.log("values from signup: ", values)
    registerUser(name , email , password).then((res) => {
        console.log(res)
        // const { token, ...user } = res.data
        // console.log(user)
        // setUser({ ...user , token})
        if(res){
            console.log("user created")
            toast({
                
                description: "Registration successful",
            })
            router.push("/auth/login")
        }
    }).catch((error) => {
        toast({
            variant: "destructive",
            title: "Registration failed",
            description:" Some Error occurent please try again"
        })
        console.log(error)
    });
  }
  return (
    <Card className="p-6 min-w-96   "> 
    <div className="text-center">
    <h1 className="text-3xl font-semibold  ">Sing Up</h1> 
       </div>
       
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" type="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />

              </FormControl>
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
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password"{...field} />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className="w-full " type="submit">Submit</Button>

        <div className="  italic text-center ">
            <p>Already have a account <Link href="/auth/login" className="text-blue-500"><span>Login here</span></Link></p>
        </div>
      </form>
    </Form>
    </Card>

  )
}

