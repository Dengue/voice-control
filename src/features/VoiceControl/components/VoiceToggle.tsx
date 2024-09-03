"use client"

import { Mic } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { useSyncExternalStore } from "react";
import { speechRecognition } from "../SpeechRecognition";
import { cn } from "@/lib/utils";
 
export const VoiceToggle = () => {
  const { isActive } = useSyncExternalStore(speechRecognition.subscribe, speechRecognition.getSnapshot, speechRecognition.getSnapshot);
  return (
    <Button onClick={() => {
      if(isActive) {
        speechRecognition.stop();
        return
      }
      speechRecognition.start();
    }} className={cn("absolute bottom-10 right-10 rounded-[50%] h-12 w-12", {
      'bg-blue-500 hover:bg-blue-400': isActive
    })} variant="outline" size="icon">
      <Mic className={cn("h-8 w-8 ", {
        'text-white': isActive
      })} />
    </Button>
  )
}