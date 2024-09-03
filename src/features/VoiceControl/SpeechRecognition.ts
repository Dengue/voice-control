"use client"

import { ExternalStorage } from "@/common/ExternalStorage";

const CONFINDENCE_THRESHOLD = 0.85;

let state: {
  isActive: boolean,
  initialized: boolean;
} = {
  isActive: false,
  initialized: false,
}

export class SpeechRecognitionService extends ExternalStorage {
  private speechRecognition?: SpeechRecognition;
  private config = {
    continuous: true,
    lang: 'en-US',
    interimResults: false,
  }

  constructor() {
    super();
  }

  init = () => {
    if(state.initialized) {
      return;
    }
    this.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    this.speechRecognition.continuous = this.config.continuous;
    this.speechRecognition.lang = this.config.lang;
    this.speechRecognition.interimResults = this.config.interimResults;
    this.speechRecognition.onstart = () => {
      state = {
        ...state,
        isActive: true,
      }
      this.emitChange();
    }
    this.speechRecognition.onend = () => {
      state = {
        ...state,
        isActive: false
      }
      this.emitChange();
    }
    state = {
      ...state,
      initialized: true
    }
  }

  start() {
    this.speechRecognition?.start()
  }

  stop() {
    this.speechRecognition?.stop()
  }
  onResult(callback: (text: string) => void) {
    if(!this.speechRecognition) {
      return;
    }
    this.speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex];
      const alternative = result[0];
      if(result.isFinal && alternative.confidence > CONFINDENCE_THRESHOLD) {
        callback(alternative.transcript);
      }
    };
  }

  getSnapshot = () => {
    return state;
  }
}


export const speechRecognition = new SpeechRecognitionService();