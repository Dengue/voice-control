"use client"
import { voiceControl } from "@/features/VoiceControl/VoiceControl"
import { useEffect } from "react"

export const useSigninCommandsCapture = (commandHooks: {
  username: (data: string) => void,
  signin: () => void,
}) => {
  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command, field, userInput }) => {
      if(command && (command === 'signin' || command === 'submit')) {
        commandHooks.signin();
        return;
      }
      if(field && field === 'username') {
        commandHooks.username(userInput);
        return;
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])
}