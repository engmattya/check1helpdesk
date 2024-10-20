import axios from 'axios';

const AZURE_OPENAI_ENDPOINT = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_KEY = import.meta.env.VITE_AZURE_OPENAI_KEY;

export const callAzureOpenAI = async (input: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${AZURE_OPENAI_ENDPOINT}/openai/deployments/YOUR_DEPLOYMENT_NAME/chat/completions?api-version=2023-05-15`,
      {
        messages: [{ role: 'user', content: input }],
        max_tokens: 800,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_KEY,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error);
    throw error;
  }
};