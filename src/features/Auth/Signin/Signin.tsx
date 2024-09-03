"use client"
import React, { useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { useSigninCommandsCapture } from "./useSigninCommandsCapture";
import { useRouter } from "next/navigation";
import { useLogin } from "../useLogin";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const SigninComponent = () => {
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const login = useLogin();

  useSigninCommandsCapture({
    signin: () => {
      submitRef.current?.click();
    },
    username: (data) => {
      form.setFocus("username");
      form.setValue("username", data);
    }
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data);
    router.push('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6 p-4 rounded border-[#bbd3df] border-2 border-solid">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button ref={submitRef} type="submit">Submit</Button>
      </form>
    </Form>
  )
}