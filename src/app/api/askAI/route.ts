import { NextRequest, NextResponse } from "next/server";
import edenAi from '@api/eden-ai';

import { COMMANDS, FIELDS, INTERACTIVE_COMMANDS, NO_MATCH } from "@/common/voice-commands";
import { analyzeAIResponse, analyzeAIResponseInteractive } from "./_analyzeAIResponse";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { text } = body;

  edenAi.auth(process.env.AI_API_KEY!);
  try {
    let answer = await edenAi.text_chat_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_base_64: true,
      show_original_response: false,
      temperature: 0,
      max_tokens: 100,
      tool_choice: 'auto',
      providers: ['openai'],
      text: `${text}`,
      chatbot_global_action: `
        There are known commands, which are listed next: ${Object.values(COMMANDS).join(',')}.
        You should select which command is the most similar to the given text and return this command
        with additional number between 1 and 10 where 10 is very similar and 1 is completely different.
        answer please in next format: command, number in case of found command otherwise just answer ${NO_MATCH}
      `
    });

    const command = analyzeAIResponse(answer.data.openai?.generated_text);
    console.log(command);
    let aiAnswer = answer.data.openai?.generated_text;
    if(command !== NO_MATCH) {
      return NextResponse.json({
        command,
        aiAnswer
      });
    }

    answer = await edenAi.text_chat_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_base_64: true,
      show_original_response: false,
      temperature: 0,
      max_tokens: 100,
      tool_choice: 'auto',
      providers: ['openai'],
      text: `${text}`,
      chatbot_global_action: `
        Lets imaging that there is a web site with ability for the user to fill some data in inputs using voice
        There are known commands, which are listed next: ${Object.values(INTERACTIVE_COMMANDS).join(',')}.
        This commands describe that the user want to enter some data in some input field. Basically this commands
        will contain field name and user data that he want to fill in. For example: Username is Jango Fett.
        Here username is field name and Jango Fett is data that user want to fill in. Available fields names are: ${Object.values(FIELDS)},
        You should select which command is the most similar to the given text and return this field name and
        user data from this command with additional number between 1 and 10 where 10 is very similar and 1 is completely different.
        answer please in next format: just value of field name ,just value of user data, number in case of found command otherwise just answer ${NO_MATCH}
      `
    });
    const result = analyzeAIResponseInteractive(answer.data.openai?.generated_text);
    aiAnswer = answer.data.openai?.generated_text;
    if(result === NO_MATCH) {
      return NextResponse.json({
        command: result,
        aiAnswer
      });
    }
    const [field, userInput] = result;
    return NextResponse.json({
      field, userInput, aiAnswer
    });

  }
  catch (err) {
    const error = err as { message: string };
    return NextResponse.json({}, { status: 500, statusText: error.message });
  }

}