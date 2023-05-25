import { Configuration, OpenAIApi } from "openai";

const createOpenAICompletion = async (prompt) => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 7,
    temperature: 0,
  });
  return response;
};

export default createOpenAICompletion;
