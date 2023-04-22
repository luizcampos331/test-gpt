import { Request, Response } from 'express';
import GenerateTextService from '@services/GenerateTextService'
import { container } from 'tsyringe';

export default class TextController {
  public async generate(request: Request, response: Response): Promise<Response> {
    const { text } = request.body;

    const generateText = container.resolve(
      GenerateTextService,
    );

    const { result } = await generateText.execute({
      text,
    });

    return response.status(200).json({ result })
  }
}
