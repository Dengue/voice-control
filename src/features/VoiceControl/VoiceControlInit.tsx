"use client"
import { FC, ReactNode, useEffect } from 'react';

import { voiceControl } from './VoiceControl';

export const VoiceControlInit: FC<{
  children: ReactNode
}> = ({
  children
}) => {
  useEffect(() => {
    voiceControl.init();
  }, [])
  return children;
}