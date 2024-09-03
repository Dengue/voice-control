"use client"
import { voiceControl } from "@/features/VoiceControl/VoiceControl"
import { useEffect } from "react"

export const useSignupCommandsCapture = (commandHooks: {
  username: (data: string) => void,
  signin: () => void,
}) => {
  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command, field, userInput }) => {
      if(command && (command === 'signup' || command === 'submit')) {
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