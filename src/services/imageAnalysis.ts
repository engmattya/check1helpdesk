import axios from 'axios';

const AZURE_COMPUTER_VISION_ENDPOINT = import.meta.env.VITE_AZURE_COMPUTER_VISION_ENDPOINT;
const AZURE_COMPUTER_VISION_KEY = import.meta.env.VITE_AZURE_COMPUTER_VISION_KEY;

export const analyzeImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(
      `${AZURE_COMPUTER_VISION_ENDPOINT}/vision/v3.2/analyze?visualFeatures=Description,Objects,Tags`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Ocp-Apim-Subscription-Key': AZURE_COMPUTER_VISION_KEY,
        },
      }
    );

    const { description, objects, tags } = response.data;
    
    return `
      Description: ${description.captions[0].text}
      
      Objects detected: ${objects.map((obj: any) => obj.object).join(', ')}
      
      Tags: ${tags.map((tag: any) => tag.name).join(', ')}
    `;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};