'use client'
 
import { FC, ReactNode, useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { voiceControl } from '@/features/VoiceControl/VoiceControl';
import { NO_MATCH } from '@/common/voice-commands';
 
export const VoiceLogger: FC<{
  children: ReactNode
}> = ({ children }) => {
  const {toast} = useToast();

  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command, field, userInput, aiAnswer, recognizedText }) => {
      toast({
        title: 'Command log',
        description: (
          <div className='flex flex-col gap-2 items-start'>
            <div className='flex gap-2 items-start justify-start'>
              <span>Recognized text:</span>
              <span>{recognizedText}</span>
            </div>
            <div className='flex gap-2 items-start justify-start'>
              <span> AI answer:</span>
              <span>{aiAnswer}</span>
            </div>
            <div className='flex gap-2 items-start justify-start'>
              <span>Command:</span>
              <span>{command}</span>
            </div>
            <div className='flex gap-2 items-start justify-start'>
              <span>Field:</span>
              <span>{field}</span>
            </div>
            <div className='flex gap-2 items-start justify-start'>
              <span>UserInput:</span>
              <span>{userInput}</span>
            </div>
          </div>
        ),
        variant: (command === NO_MATCH || field === NO_MATCH) ? 'destructive' : 'default'
      })
    });

    return () => {
      unsubscribe()
    }
  }, [])

  return children;
}