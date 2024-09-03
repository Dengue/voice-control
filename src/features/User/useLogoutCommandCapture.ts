"use client"
import { voiceControl } from "@/features/VoiceControl/VoiceControl"
import { useEffect } from "react"

export const useLogoutCommandCapture = (commandHooks: {
  logout: () => void;
}) => {
  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command, }) => {
      if(command && command === 'logout') {
        commandHooks.logout();
        return;
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])
}