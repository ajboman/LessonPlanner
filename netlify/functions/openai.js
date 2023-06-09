const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);
  const { prompt, max_tokens } = body;

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: max_tokens,
      temperature: 0,
    });

    // Return the data as the serverless function response
    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0]),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
