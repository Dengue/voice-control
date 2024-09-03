import { speechRecognition, SpeechRecognitionService } from "./SpeechRecognition";

export class VoiceControl {
  private speechRecognitionService: SpeechRecognitionService;
  private commandListeners: ((answer: { 
    command: string,
    field: string,
    userInput: string,
    aiAnswer: string,
    recognizedText: string
  }) => void)[];
  private initialized: boolean = false;

  constructor(speechRecognition: SpeechRecognitionService) {
    this.speechRecognitionService = speechRecognition;
    this.commandListeners = [];
  }

  init() {
    if (this.initialized) {
      return
    }
    this.speechRecognitionService.init();
    this.speechRecognitionService.onResult(this.analyzeSpeechResult);
    this.initialized = true;
  }

  analyzeSpeechResult = async (text: string) => {
    try {
      const response = await fetch('/api/askAI', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      const answer = await response.json();
      this.commandListeners.forEach(listener => {
        listener({
          ...answer,
          recognizedText: text
        });
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  start() {
    this.speechRecognitionService.start()
  }

  stop() {
    this.speechRecognitionService.stop()
  }

  listen = (listener: (answer: {
    command: string,
    field: string,
    userInput: string,
    aiAnswer: string,
    recognizedText: string
  }) => void) => {
    this.commandListeners.push(listener);
    return () => {
      this.commandListeners = this.commandListeners.filter(l => l !== listener);
    }
  }

  get speechRecognition() {
    return this.speechRecognitionService;
  }

}

export const voiceControl = new VoiceControl(speechRecognition);