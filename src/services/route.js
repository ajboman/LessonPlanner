import axios from 'axios';

const createOpenAICompletion = async (prompt, max_tokens) => {
  try {
    const response = await axios.post('/.netlify/functions/openai', { prompt, max_tokens });
    return response.data;
  } catch (error) {
    console.error("Error while making request to OpenAI:", error);
    throw error; 
  }
};

export default createOpenAICompletion;
