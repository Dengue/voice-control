"use client"
import { voiceControl } from "@/features/VoiceControl/VoiceControl"
import { useEffect } from "react"

export const useHeaderNavigationCommandCapture = (commandHooks: {
  menu1: () => void;
}) => {
  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command, }) => {
      if(!command) {
        return
      }
      switch(command) {
        case 'menu1': {
          commandHooks.menu1();
          return;
        }
        default: {
          return;
        }
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])
}