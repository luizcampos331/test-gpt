import { Configuration, OpenAIApi } from "openai";
import IGptProvider from "../models/IGptProvider";

class ChatGptProvider implements IGptProvider {
  private client: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.client = new OpenAIApi(configuration);
  }

  public async generate(text: string): Promise<string> {
    const completion = await this.client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'user',
          content: text,
        }
      ],
      temperature: 0.6
    });

    return completion.data.choices[0].message.content
  }
}

export default ChatGptProvider;
