"use client"
import React, { useRef } from "react";
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import { useHomeFormCommandCapture } from "./useHomeFormCommandsCapture";

const FormSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  address: z.string()
});

export const HomeComponent = () => {
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      address: "",
    },
  })

  useHomeFormCommandCapture({
    email(data) {
      form.setFocus("email");
      form.setValue("email", data);
    },
    submit() {
      submitRef.current?.click();
    },
    address(data) {
      form.setFocus("address");
      form.setValue("address", data);
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6 p-4 rounded border-[#bbd3df] border-2 border-solid">
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button ref={submitRef} type="submit">Submit</Button>
      </form>
    </Form>
  )
}