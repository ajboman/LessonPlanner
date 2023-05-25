import { Configuration, OpenAIApi } from "openai";

const createOpenAICompletion = async (prompt) => {
  try {
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
  } catch (error) {
    console.error("Error while making request to OpenAI:", error);
    throw error; // rethrow the error so it can be caught in the calling function
  }
};


export default createOpenAICompletion;
