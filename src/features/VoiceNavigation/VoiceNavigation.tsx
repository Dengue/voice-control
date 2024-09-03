'use client'
 
import { usePathname, useRouter } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'
import { BROWSER_HISTORY_COMMANDS, NAVIGATION_COMMANDS } from '@/common/voice-commands';
import { voiceControl } from '@/features/VoiceControl/VoiceControl';
 
export const VoiceNavigation: FC<{
  children: ReactNode
}> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = voiceControl.listen(({ command }) => {
      const navigationCommand = command as keyof typeof NAVIGATION_COMMANDS;
      if(NAVIGATION_COMMANDS[navigationCommand] && !pathname.endsWith(navigationCommand)) {
        router.push(`/${navigationCommand}`);
      }
      const browserCommands = command as keyof typeof BROWSER_HISTORY_COMMANDS;
      if(BROWSER_HISTORY_COMMANDS[browserCommands]) {
        router[browserCommands]?.();
      }
    });

    return () => {
      unsubscribe()
    }
  }, [])

  return children;
}