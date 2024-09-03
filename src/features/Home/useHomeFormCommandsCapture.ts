"use client"
import { voiceControl } from "@/features/VoiceControl/VoiceControl"
import { useEffect } from "react"

export const useHomeFormCommandCapture = (commandHooks: {
  email: (data: string) => void,
  address: (data: string) => void,
  submit: () => void
}) => {
  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command, field, userInput }) => {
      if(field && field === 'email') {
        commandHooks.email(userInput);
        return;
      }
      if(field && field === 'address') {
        commandHooks.address(userInput);
        return;
      }
      if(command && command === 'submit') {
        commandHooks.submit();
        return;
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])
}