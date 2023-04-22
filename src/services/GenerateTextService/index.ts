import { inject, injectable } from 'tsyringe';
import IGptProvider from '@providers/GtpProvider/models/IGptProvider'
import OpenAiError from '@errors/OpenAiError';

interface IRequest {
  text: string;
}

interface IResponse{
  result: string;
}

@injectable()
class GenerateTextService {
  constructor(
    @inject('GptProvider')
    private gptProvider: IGptProvider,
  ) {
    //
  }

  public async execute({ text }: IRequest): Promise<IResponse> {
    try {
      const result = await this.gptProvider.generate(text);

      return { result };
    } catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error instanceof OpenAiError) {
        console.error(error.response.status, error.response.data);

        throw new OpenAiError(error.response.data.error.message)
      } else {
        console.error(error.response.data);

        throw new Error('An error ocurred during your request.')
      }
    }
  }
}

export default GenerateTextService;
