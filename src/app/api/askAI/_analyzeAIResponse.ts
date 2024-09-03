import { COMMANDS, NO_MATCH } from "@/common/voice-commands";

const SIMILARITY_THRESHOLD = 7;

export const analyzeAIResponse = (answer: string | undefined) => {
  if(!answer || answer === NO_MATCH) {
    return NO_MATCH
  }
  let [command, similarity] = answer.split(',');
  command = command.trim();
  similarity = similarity.trim();
  if(+similarity < SIMILARITY_THRESHOLD) {
    return NO_MATCH;
  }
  const foundCommand = Object.keys(COMMANDS).find((key: unknown) => {
    const commandKey = key as keyof typeof COMMANDS;
    if(COMMANDS[commandKey].includes(command)) {
      return commandKey;
    }
  });
  if(!foundCommand) {
    return NO_MATCH;
  }
  return foundCommand;
}

export const analyzeAIResponseInteractive = (answer: string | undefined) => {
  console.log(answer);
  if(!answer || answer.toLowerCase().includes(NO_MATCH)) {
    return NO_MATCH;
  }
  let [field, userInput, similarity] = answer.split(',');
  field = field.trim();
  userInput = userInput.trim();
  similarity = similarity.trim();
  if(+similarity < SIMILARITY_THRESHOLD) {
    return NO_MATCH;
  }
  return [field, userInput];
}