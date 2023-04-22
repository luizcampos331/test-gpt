import { container } from "tsyringe";
import IGptProvider from "./GtpProvider/models/IGptProvider";
import ChatGptProvider from "./GtpProvider/implementations/ChatGptProvider";

container.registerSingleton<IGptProvider>(
  'GptProvider',
  ChatGptProvider,
);