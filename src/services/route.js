import axios from 'axios';

const createOpenAICompletion = async (prompt) => {
  try {
    const response = await axios.post('/.netlify/functions/openai', { prompt });
    return response.data;
  } catch (error) {
    console.error("Error while making request to OpenAI:", error);
    throw error; // rethrow the error so it can be caught in the calling function
  }
};

export default createOpenAICompletion;
